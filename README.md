# B2B Lead Finder AI

MVP frontend shell for B2B Lead Finder AI.

Implemented through Stage 7.

## Included

- React TypeScript Vite shell.
- MVP routes and placeholder screens.
- Supabase public frontend config.
- Supabase Auth UI and session guard.
- Profiles migration with row level security.
- Profile service and profile panel in settings.
- Projects migration with row level security.
- Projects CRUD UI: list, create, edit, archive.

## Profile table

Migration file: `supabase/migrations/20260617000100_create_profiles.sql`.

Table: `public.profiles`.

Fields: `id`, `user_id`, `email`, `full_name`, `company_name`, `role`, `created_at`, `updated_at`.

Security:

- RLS is enabled on `public.profiles`;
- `id` is a non-null primary key;
- `user_id` is non-null, unique, and references `auth.users(id)` with `on delete cascade`;
- `email` is non-null;
- users can read only their own profile by `auth.uid() = user_id`;
- authenticated frontend clients cannot update `role`, `user_id`, or `email`.

## Projects table

Migration file: `supabase/migrations/20260617000200_create_projects.sql`.

Table: `public.projects`.

Fields: `id`, `user_id`, `name`, `service_description`, `target_audience`, `offer`, `region`, `niches`, `tone`, `status`, `created_at`, `updated_at`.

Status values: `active`, `archived`.

Security:

- RLS is enabled on `public.projects`;
- `user_id` references `auth.users(id)` with `on delete cascade`;
- users can read, create, and update only their own projects by `auth.uid() = user_id`;
- authenticated frontend clients cannot update `user_id`;
- physical delete is not used in Stage 7; projects are archived through `status = archived`;
- required project fields are validated in the UI and by database check constraints.

## Env

Use only public frontend values in `.env.local`:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

Never put service role keys, JWT secrets, database passwords, AI keys, payment secrets, or webhook secrets into frontend env.

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

`lint` and `test` are not configured yet.
