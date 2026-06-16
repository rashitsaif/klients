# B2B Lead Finder AI

MVP frontend shell for **B2B Lead Finder AI — Поиск клиентов для B2B**.

## Current scope

Implemented through Stage 4:

- React + TypeScript + Vite + Tailwind CSS app shell.
- MVP routes and placeholder screens.
- Basic layout and adaptive navigation.
- Minimal reusable UI components.
- Feedback states: loading, error, empty.
- Basic UI status constants.
- Supabase public frontend env validation and config files.

Not implemented yet by design:

- auth;
- database tables;
- RLS policies;
- AI/API integrations;
- import/export;
- scraping/parsing;
- payments;
- real user data;
- business logic.

## Routes

- `/`
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

Stage 4 adds configuration only. Registration, login, profiles, tables, RLS and data queries are not implemented yet.

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

The app validates that required public variables exist before exposing Supabase config. If they are missing, `supabaseClientConfig` is `null` and no network request is made.

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
