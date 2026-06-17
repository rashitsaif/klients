# B2B Lead Finder AI

MVP frontend shell for B2B Lead Finder AI.

Implemented through Stage 6.

## Included

- React TypeScript Vite shell.
- MVP routes and placeholder screens.
- Supabase public frontend config.
- Supabase Auth UI and session guard.
- Profiles migration with row level security.
- Profile service and profile panel in settings.

## Profile table

Migration file: `supabase/migrations/20260617000100_create_profiles.sql`.

Table: `public.profiles`.

Fields: `id`, `user_id`, `email`, `full_name`, `company_name`, `role`, `created_at`, `updated_at`.

Role values: `user`, `admin`.

Security:

- users can read only their own profile;
- users can update only their own profile;
- frontend can update only `full_name` and `company_name`;
- frontend does not send role updates;
- profile is created after auth signup by a database trigger.

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
