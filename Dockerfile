# ---- Stage 1: build ----
FROM node:20-alpine AS builder
WORKDIR /app

# Activates modern Yarn version via Corepack
RUN corepack enable

# Copy ALL project files first to protect Yarn 4's internal state mapping
COPY . .

# Install all dependencies required for the compilation process
RUN yarn install --immutable

# Build-time env vars must be passed as build args — CRA/Vite inlines
# variables into the static bundle at build time, not at container start.
ARG REACT_APP_BACKEND_URL
ARG REACT_APP_GOOGLE_CLIENT_ID
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
ENV REACT_APP_GOOGLE_CLIENT_ID=$REACT_APP_GOOGLE_CLIENT_ID

# Run compilation script to spit out raw HTML/CSS/JS files inside /build or /dist
RUN yarn build

# ---- Stage 2: serve ----
FROM nginx:1.27-alpine AS production

# Pull only the raw static files out of Stage 1 and put them into Nginx's public directory
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Internal health probe checking if the web server homepage responds
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost:80/ || exit 1

# Fire up Nginx in the foreground to keep the container running
CMD ["nginx", "-g", "daemon off;"]
