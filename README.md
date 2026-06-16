# B2B Lead Finder AI

MVP frontend shell for **B2B Lead Finder AI — Поиск клиентов для B2B**.

## Current scope

Implemented through Stage 5:

- React + TypeScript + Vite + Tailwind CSS app shell.
- MVP routes and placeholder screens.
- Basic layout and adaptive navigation.
- Minimal reusable UI components.
- Feedback states: loading, error, empty.
- Basic UI status constants.
- Supabase public frontend env validation and config files.
- Supabase Auth client setup.
- Login, registration, password recovery, session provider, protected routes and logout UI.

Not implemented yet by design:

- profiles;
- business database tables;
- RLS policies;
- AI/API integrations;
- import/export;
- scraping/parsing;
- payments;
- real business data;
- project or lead business logic.

## Routes

Public routes:

- `/`
- `/login`
- `/register`
- `/forgot-password`

Private routes guarded by session check:

- `/dashboard`
- `/projects`
- `/leads`
- `/imports`
- `/search-jobs`
- `/exports`
- `/ai-agent`
- `/settings`
- `/admin`

## Components

UI components are exported from `src/components/ui`:

- `Button`
- `Input`
- `Textarea`
- `Select`
- `Card`
- `Badge`
- `Table`

Feedback components are exported from `src/components/feedback`:

- `LoadingState`
- `ErrorState`
- `EmptyState`

## Supabase public frontend config

Create `.env.local` from `.env.example` and fill only public frontend variables:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

Allowed in frontend env:

- `VITE_SUPABASE_URL` — public Supabase project URL.
- `VITE_SUPABASE_ANON_KEY` — public anonymous key intended for browser clients.

Never put these values in frontend env or frontend code:

- Supabase service role key.
- JWT secret.
- Database password or connection string.
- AI API keys.
- Payment provider secrets.
- Webhook secrets.

The app checks the public config before creating the Supabase browser client. If required env variables are missing, auth forms show an error and no private screen is displayed.

## Run

```bash
npm install
npm run dev
```

## Checks

```bash
npm run typecheck
npm run build
npm audit --audit-level=high
```

`lint` and `test` are not configured yet and should be added in a separate safe stage.
