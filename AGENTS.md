# HosplixAI — dev environment notes

Cloned from https://hosplixai.base44.app (landing + auth + AI chat app).

## Stack
- `client/` — Vite + React 18 + Tailwind CSS v4 + react-router + lucide-react
- `server/` — Express + PostgreSQL (pg) + bcryptjs + openai SDK
- Single-origin wiring: Vite dev server (host port 3000) proxies `/api` → `api:8000`, so session cookies stay same-origin.

## Run
`docker compose -f docker-compose.base44.yml up -d` — web on port 3000, healthchecks on all services.
Dependencies install into named volumes (`client-node-modules`, `server-node-modules`) on first boot; backend uses `node --watch`, frontend is Vite dev with HMR.

## Database
Postgres service `db` (user/pass/db: hosplix/hosplix_dev/hosplix). Tables are auto-created by `server/src/db.js initDb()` on API boot — no separate migration step.

## Secrets
- `OPENAI_API_KEY` (via `/run/base44/app.env`, platform-managed) — powers the chat endpoint `/api/*`. Optional `OPENAI_BASE_URL` / `OPENAI_MODEL` env overrides. Without a key the app boots fine; chat replies fail with a clear 503.

## Verify
- `curl localhost:3000/` → landing page HTML
- `curl localhost:3000/api/health` (proxied) → `{ok:true}`
- Register a user in the UI → redirected to `/chat`; sending a message requires the OpenAI key.
