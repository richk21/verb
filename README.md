# Verb — Frontend

React/TypeScript frontend for Verb, an internal engineering incident
reporting and review platform. Handles auth (including org selection at
signup), the report authoring/editing flow, the review workflow UI, and
role-aware navigation.

Backend repo: `<link to your backend repo>`

---

## Tech stack

React, TypeScript, Redux Toolkit + Redux-Saga, Material UI (MUI), React
Router, react-hook-form.

---

## Getting started

```bash
yarn install
cp .env.example .env   # fill in the values below
yarn start
```

### Environment variables

| Variable                                                        | Purpose                          |
| --------------------------------------------------------------- | -------------------------------- |
| `REACT_APP_BACKEND_URL`                                         | Base URL of the Verb API         |
| `REACT_APP_FRONTEND_URL`                                        | Used for OAuth redirect handling |
| `REACT_APP_GOOGLE_CLIENT_ID` / `REACT_APP_GOOGLE_CLIENT_SECRET` | Google sign-in                   |
| `REACT_APP_IMGBB_API_KEY`                                       | Fallback image hosting           |

---

## Project structure

```
src/
├── app/            # routing, theme, shared interfaces, enums, axios instance
├── components/     # shared/reusable UI (Navbar, ReportTile, AuthLayout, ...)
├── pages/          # route-level views (Home, ReportView, CreateReport, ...)
└── redux/          # feature-sliced Redux Toolkit + Saga (user/, report/)
```

Redux is organized per-feature, each with the same five files:
`*Actions.ts`, `*Slice.ts`, `*Saga.ts`, `*Service.ts` (API calls),
`*Selectors.ts`.

---

## Signing up

Every account belongs to an organization, chosen at signup. If the
organization name entered doesn't exist yet, the account becomes its
first **Admin**; if it already exists, the account joins as a
**Contributor**. There's currently no in-app way to change a member's
role after signup — see [Known gaps](#known-gaps--next-steps).

---

## Roles (read from `user.role` in Redux state)

| Role          | UI behavior                                                              |
| ------------- | ------------------------------------------------------------------------ |
| `contributor` | Can create/edit their own reports and submit for review                  |
| `reviewer`    | Sees Approve / Request Changes / Publish actions on reports under review |
| `auditor`     | Read-only throughout; no write actions render for this role              |
| `admin`       | Same as reviewer, plus (planned) role management                         |

Role checks in the UI are for **experience only** — hiding buttons a user
isn't allowed to use. The backend independently enforces every
permission via `requireRole` middleware; the frontend check is never the
actual security boundary.

---

## Known gaps / next steps

- **Review workflow UI** — the Redux actions/service/saga for submit /
  approve / request-changes / publish / comment exist, but nothing in
  `ReportView` renders the buttons, a status stepper, or a comment thread
  yet.
- **`IReport` type still carries the legacy `isDraft: boolean`** rather
  than the backend's `status` enum (`draft` / `under_review` / `approved`
  / `published`), plus `reviewerId`, `reviewerComments`, and `timeline`,
  none of which are typed on the frontend yet.
- **Known bug**: the review-workflow sagas (`submitForReview`,
  `approveReport`, `requestChanges`, `publishReportFinal`,
  `addReviewComment`) dispatch `setCurrentReport`, but `ReportView`
  (the page that will host these actions) reads from `selectReport`
  (populated by `setReport`). These need to dispatch `setReport` instead,
  or the on-screen report won't update after a review action succeeds.
- **Known bug**: the "create report" nav icon in `Navbar.tsx` still
  navigates to `/blog-post`; the actual route is `/report-post`.
- **Admin role management UI** — no screen yet lets an Admin change
  another member's role.
- **Test coverage** — no frontend tests yet.
- **Auth hardening** — the app currently expects the JWT in the response
  body / client-side storage rather than an HTTP-only cookie; will need
  an `axios` + CORS update if the backend moves to cookie-based auth.

---

## Design notes

- Theme, palette, and typography are centralized in `app/theme.ts` —
  avoid hardcoding colors in components; pull from
  `theme.palette.*`/`theme.shape.*` so future palette changes cascade
  everywhere automatically.
- `AuthLayout` is the single shared layout for Login/Signup — don't
  build a one-off layout inside either page again.
