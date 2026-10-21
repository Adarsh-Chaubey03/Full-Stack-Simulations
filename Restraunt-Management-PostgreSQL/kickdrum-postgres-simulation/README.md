# Kickdrum Round 1 — PostgreSQL Full Stack Simulation

Existing restaurant dish-management app for hands-on interview practice.

## Stack
- React + Vite
- Node.js + Express
- PostgreSQL via `pg`

## Requirements
Node.js 18+ and PostgreSQL 14+.

## Setup
1. Create a database: `CREATE DATABASE kickdrum_sim;`
2. Configure backend:
   ```bash
   cd backend
   cp .env.example .env
   ```
   Edit `.env` and set `DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/kickdrum_sim`.
3. Initialize schema and seed data:
   ```bash
   npm install
   npm run db:init
   npm run dev
   ```
4. In another terminal:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
5. Open the Vite URL, usually http://localhost:5173.

## Existing functionality
- `GET /api/health` checks the database connection.
- `GET /api/dishes` lists dishes, with optional `?search=`.
- PostgreSQL schema and seed script are included.

## Interview task (leave incomplete until practice starts)
Implement **Add a New Dish** end-to-end:
1. Inspect the repository and explain the request flow.
2. Write `Decisions.md` with Backend, Frontend, and Database sections.
3. Add `POST /api/dishes` with validation and duplicate handling.
4. Add the frontend form and update React state without reloading.
5. Test success, invalid input, duplicates, and database/network errors.

The POST route/controller and frontend form are intentionally incomplete. Use parameterized SQL. The table has required fields, a positive-price constraint, and a case-insensitive unique index on dish name.
