# Verb — Modern Blogging Web App

**Verb** is a full-stack blogging platform where users can log in, write blogs in markdown, insert media in the blogs, save drafts, and publish posts with cover images and hashtags.

It’s built to feel like a minimal, distraction-free writing space with a clean reading experience.

---

## Features

- 🔐 User authentication
- ✍️ Create, edit, and delete blogs
- 💾 Save blogs as drafts
- 🌍 Publish blogs for others to read
- 🖼️ Cover image selection (Unsplash integration)
- 🏷️ Hashtag support
- 👤 Author profiles with avatar
- 👀 Blog preview before publishing
- 📱 Responsive UI

---

## 🧠 Tech Stack

### Frontend

- **React + TypeScript**
- **Material UI (MUI)**
- **React Hook Form**
- **Redux Toolkit**
- **Axios**
- **React Markdown**

### Other Integrations

- Unsplash API (cover images)
- Image upload service (for pasted images)

---

## ⚙️ Installation

### 1️⃣ Clone the repo

```bash
git clone [https://github.com/your-username/verb.git](https://github.com/richk21/verb)
cd verb
```

---

### 2️⃣ Frontend Setup

```bash
yarn install
yarn launch
```

Runs on: **[http://localhost:3000](http://localhost:3000)**

---

### 3️⃣ Backend Setup

navigate to backend repository: https://github.com/richk21/verb-backend repository

Runs on: **[http://localhost:5000](http://localhost:5000)**

---

## 🔑 Environment Variables

### Frontend `.env`

```
REACT_APP_DB_URL = your_mongodb_url
REACT_APP_BACKEND_URL = http://localhost:5000
REACT_APP_FRONTEND_URL = http://localhost:3000
REACT_APP_IMGBB_API_KEY = your_api_key
REACT_APP_GOOGLE_CLIENT_ID = your_google_client_id
REACT_APP_GOOGLE_CLIENT_SECRET = your_google_client_secret
```

---

## 🧩 How It Works

1. Users log in
2. They can write blogs using markdown
3. Images can be pasted directly into the editor
4. Blogs can be saved as drafts or published
5. Published blogs are available for reading

---

## 🎯 Upcoming Features

- Comments system
- Likes / claps
- Rich text editor
- Blog search & filters
- Single Sign On Integrations
  Stay tuned!

---

## 🤝 Contributing

Pull requests are welcome!
If you’d like to improve Verb, feel free to fork and submit changes.

---
