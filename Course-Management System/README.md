# Kickdrum Course Rating Simulation

## Task
Build a page showing all courses rated by a selected student. Complete `Decisions.md` with Backend, Frontend, and Database sections. Debug any API failures.

## Stack
React + Vite, Express, PostgreSQL (`pg`).

## Setup
1. Copy `backend/.env.example` to `backend/.env` and set `DATABASE_URL` to your Neon/PostgreSQL connection string.
2. In `backend/`: `npm install`, `npm run db:init`, `npm run dev`.
3. In `frontend/`: `npm install`, `npm run dev`.

The Vite dev server proxies `/api` to `http://localhost:3000`.

The schema and seed script are provided. The ratings endpoint and frontend display are intentionally incomplete. Complete `Decisions.md` too.
