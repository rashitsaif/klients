# B2B Lead Finder AI

MVP frontend shell for **B2B Lead Finder AI — Поиск клиентов для B2B**.

## Current scope

Implemented through Stage 3:

- React + TypeScript + Vite + Tailwind CSS app shell.
- MVP routes and placeholder screens.
- Basic layout and adaptive navigation.
- Minimal reusable UI components.
- Feedback states: loading, error, empty.
- Basic UI status constants.

Not implemented yet by design:

- auth;
- Supabase/database;
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
