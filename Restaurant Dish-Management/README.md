# Full Stack Simulation 1

A small existing restaurant dish-management application for timed interview practice.

## Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Data: in-memory array (resets when the backend restarts)

## Run locally
Requirements: Node.js 18+ and npm.

Terminal 1:
```bash
cd backend
npm install
npm run dev
```

Terminal 2:
```bash
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173). The backend runs on http://localhost:3000.

## Existing functionality
- List all dishes
- Search dishes by name
- View the API health endpoint

## Interview task (do not implement before the simulation starts)-Solved
Implement **Add a New Dish** end-to-end. Before coding:
1. Explain the current application structure and request flow.
2. Identify the exact frontend and backend files that need changes.
3. Write `Decisions.md` with `Backend`, `Frontend`, and `Database` sections.
4. Discuss validation, duplicate handling, loading/error states, and success feedback.
5. Only then implement and test the feature.

## API currently available
- `GET /api/dishes` — returns all dishes
- `GET /api/health` — basic health check

The create-dish endpoint is intentionally not implemented.

## Interview constraints
- Think aloud and explain evidence before conclusions.
- Use AI only for targeted help; understand every generated change.
- Do not paste the entire codebase into an AI assistant.
- Use the browser Network tab and backend terminal when debugging.
