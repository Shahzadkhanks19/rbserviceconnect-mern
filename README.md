# RB Service Connect — MERN Rebuild

A complete rebuild of the original RB Service Connect recruitment platform as a modern MERN application.

## Stack
- React 19 + Vite 8
- JavaScript / JSX
- Tailwind CSS via `@tailwindcss/vite`
- React Router
- Express 5
- MongoDB + Mongoose
- JWT authentication with HTTP-only cookies

## Applications
- `client/` — public job portal + Candidate, Recruiter, and Admin dashboards
- `server/` — REST API, authentication, role authorization, and MongoDB models

## Development
```bash
npm run install:all
npm run dev
```

Client defaults to `http://localhost:5173` and API to `http://localhost:5000`.
