# Eventura Creations

Full-stack event platform and marketing site for **Eventura Creations**, a full-service event management agency. The app is a **MERN-style** monorepo: **MongoDB**, **Express**, **React (Vite)**, and **Node**, managed with **pnpm** workspaces.

Visitors see services, portfolio case studies, and a public **events** directory. Signed-in users can **book** events; **organizers** and **admins** manage events from the dashboard. **JWT** secures the API; the browser uses the **Fetch API** (no Axios).

---

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **pnpm** 9 (`packageManager` is pinned in `package.json`)
- **MongoDB** running locally or reachable via URI (Atlas, Docker, etc.)

---

## Quick start

1. **Install dependencies** (from the repository root):

   ```bash
   pnpm install
   ```

2. **Environment** — copy the example file and edit values:

   ```bash
   cp .env.example .env
   ```

   The server loads **`.env` from the repository root** (not inside `server/`). Required variables:

   | Variable | Purpose |
   |----------|---------|
   | `MONGODB_URI` | MongoDB connection string |
   | `JWT_SECRET` | Required in production; dev falls back if unset |
   | `JWT_EXPIRES_IN` | Optional JWT lifetime (default `7d`) |
   | `PORT` | API port (default `5000`) |
   | `CLIENT_ORIGIN` | Vite dev origin for CORS (default `http://localhost:5173`) |

3. **Seed the database** (demo users, sample events, portfolio projects):

   ```bash
   pnpm seed
   ```

   Seeded accounts (local dev only; change after first run if you expose the DB):

   - `admin@example.com` / `Admin123!`
   - `organizer@example.com` / `Organize123!`
   - `user@example.com` / `User12345!`

4. **Run API + client** in development:

   ```bash
   pnpm dev
   ```

   - **Client:** http://localhost:5173 (Vite proxies `/api` to the server)
   - **API:** http://localhost:5000

---

## Root scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Runs Express (`--watch`) and Vite together |
| `pnpm build` | Production build of the React client into `client/dist` |
| `pnpm start` | Serves `client/dist` and the API with `NODE_ENV=production` |
| `pnpm seed` | Resets MVP collections + portfolio and inserts demo data |

---

## Repository layout

```
eventura-creations/
├── .env.example          # Template for root `.env`
├── package.json          # Workspace root + dev scripts
├── pnpm-workspace.yaml
├── client/                 # Vite + React SPA
│   ├── public/assets/      # Static images & logos
│   ├── src/
│   │   ├── api/http.js     # JSON helpers (fetch + JWT header)
│   │   ├── context/        # AuthContext (session + login/register/logout)
│   │   ├── components/     # Layout, nav, home events, protected routes
│   │   ├── pages/          # Home, services, projects, auth, events, dashboard
│   │   └── styles/         # Legacy design system (CSS modules by import)
│   └── vite.config.js      # `/api` → http://localhost:5000 in dev
└── server/                 # Express API (MVC)
    └── src/
        ├── index.js        # Boot: env, DB connect, listen
        ├── app.js          # Middleware + routes + prod static
        ├── config/         # env loader, database
        ├── models/         # User, Event, Booking, Project, Contact
        ├── controllers/    # Route handlers
        ├── routes/         # Routers mounted under `/api/...`
        ├── middleware/     # JWT auth, roles, errors
        ├── utils/          # AppError, asyncHandler
        └── seed.js         # Demo data entrypoint
```

---

## Backend (MVC)

- **Auth:** `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` (Bearer JWT).
- **Roles:** `user`, `organizer`, `admin`. Public registration always creates a **user**; seed creates organizer/admin.
- **Events:** `GET /api/events`, `GET /api/events/:id` (public). Create/update/delete require **organizer** (own events) or **admin** (admin create needs `organizerId`).
- **Bookings:** `POST /api/bookings`, `GET /api/bookings/me` (JWT). Duplicate **user + event** pairs are blocked at the schema level.
- **Marketing:** `GET /api/projects`, `GET /api/projects/:slug`, `POST /api/contact`.

Errors return JSON `{ "message": "..." }` with appropriate status codes.

---

## Frontend

- **Vite 6** + **React 19** + **React Router 7**
- **Mantine 9** for forms, tables, loaders, and notifications
- **Auth:** `AuthProvider` + `useAuth()`; JWT stored in `localStorage` under `eventura_token`
- **HTTP:** `client/src/api/http.js` uses **`fetch`** only (no Axios)

Key routes: home (events + marketing), services, projects/case studies, about, contact, login/register, event details, protected dashboard.

---

## Design system

Visual design tokens and layout live under `client/src/styles/` (imported from `client/src/styles/index.css`). Brand palette centers on deep purple (`#150A35`), lavender accent (`#DAA3FF`), and ghost white text (`#F5F7FC`), with **Archivo** and **Bacasime Antique** (Google Fonts in `client/index.html`).

---

## Production

1. Set `NODE_ENV=production`, a strong `JWT_SECRET`, and `MONGODB_URI` on your host.
2. Run `pnpm build` then `pnpm start`. The Express app serves the built SPA from `client/dist` and still exposes `/api/*`.

Ensure `CLIENT_ORIGIN` matches your real browser origin if the SPA is hosted on a different domain than the API (CORS).

---

## Troubleshooting

- **`MONGODB_URI is not set`** — Ensure `.env` exists at the **repo root** and contains `MONGODB_URI=...`. The server resolves it from `server/src/config/env.js` (three levels up to the root).
- **`ECONNREFUSED` on `/api/...` in the browser** — The API is not listening (often Mongo connection failed or wrong `PORT`). Check the server terminal output.
- **`pnpm seed` fails** — Mongo must be running and the URI must be correct; seed wipes `User`, `Event`, `Booking`, and `Project` for that database name.

---

## License

© Eventura Creations. All rights reserved.
