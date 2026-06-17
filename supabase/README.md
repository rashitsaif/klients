# Supabase migrations

Apply migrations from the project root with Supabase CLI after linking the project.

## Stage 6 migration

Migration file:

```text
supabase/migrations/20260617000100_create_profiles.sql
```

Creates/stabilizes:

- enum `public.profile_role` with values `user`, `admin`;
- table `public.profiles`;
- strict non-null ownership: `profiles.user_id` is `not null`;
- strict non-null email snapshot: `profiles.email` is `not null`;
- `profiles.id` is non-null primary key;
- unique `profiles.user_id` constraint;
- `user_id` foreign key to `auth.users(id)` with `on delete cascade`;
- RLS on `public.profiles`;
- trigger that creates a profile after new auth user registration;
- trigger that prevents authenticated frontend clients from changing protected fields.

Note: if an earlier unstable draft migration created orphan profile rows without `user_id`, this migration removes those orphan rows because they cannot be safely protected by `auth.uid()`.

## RLS and grants

Policies:

```sql
profiles_select_own: using (auth.uid() = user_id)
profiles_update_own: using (auth.uid() = user_id) with check (auth.uid() = user_id)
```

Grants:

```sql
revoke all on public.profiles from anon;
revoke all on public.profiles from authenticated;
grant select on public.profiles to authenticated;
grant update (full_name, company_name) on public.profiles to authenticated;
```

The frontend can update only `full_name` and `company_name`.
The frontend cannot update `role`, `user_id`, or `email`.

## Required manual checks for Stage 6

- apply migration in Supabase;
- confirm `public.profiles` has RLS enabled;
- confirm `id` is a primary key;
- confirm `user_id` is `not null`, unique, and references `auth.users(id)`;
- confirm `email` is `not null`;
- register user A and confirm one profile row is created;
- register user B and confirm one profile row is created;
- user A can read only user A profile;
- user B can read only user B profile;
- direct frontend/client update attempt for `role` is rejected;
- frontend profile form sends only `full_name` and `company_name`;
- no service role key is present in frontend env or code;
- no projects, leads, imports, exports, AI, parsing, or payment tables are added in this stage.
