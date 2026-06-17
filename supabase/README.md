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

### Stage 6 RLS and grants

```sql
profiles_select_own: using (auth.uid() = user_id)
profiles_update_own: using (auth.uid() = user_id) with check (auth.uid() = user_id)
```

```sql
revoke all on public.profiles from anon;
revoke all on public.profiles from authenticated;
grant select on public.profiles to authenticated;
grant update (full_name, company_name) on public.profiles to authenticated;
```

The frontend can update only `full_name` and `company_name`.
The frontend cannot update `role`, `user_id`, or `email`.

## Stage 7 migration

Migration file:

```text
supabase/migrations/20260617000200_create_projects.sql
```

Creates:

- enum `public.project_status` with values `active`, `archived`;
- table `public.projects`;
- `projects.user_id` foreign key to `auth.users(id)` with `on delete cascade`;
- required fields for B2B service project setup;
- check constraints that reject blank required text fields;
- RLS on `public.projects`;
- trigger that updates `updated_at`;
- trigger that prevents authenticated frontend clients from changing `user_id`.

### Stage 7 RLS and grants

Policies:

```sql
projects_select_own: using (auth.uid() = user_id)
projects_insert_own: with check (auth.uid() = user_id)
projects_update_own: using (auth.uid() = user_id) with check (auth.uid() = user_id)
```

Grants:

```sql
revoke all on public.projects from anon;
revoke all on public.projects from authenticated;
grant select on public.projects to authenticated;
grant insert (user_id, name, service_description, target_audience, offer, region, niches, tone, status) on public.projects to authenticated;
grant update (name, service_description, target_audience, offer, region, niches, tone, status) on public.projects to authenticated;
```

Physical delete is intentionally not granted in Stage 7. Projects are archived through `status = 'archived'`.

## Required manual checks

- apply migrations in Supabase;
- confirm `public.profiles` has RLS enabled;
- confirm `public.projects` has RLS enabled;
- confirm project `user_id` references `auth.users(id)`;
- register user A and create/edit/archive one project;
- register user B and confirm user B cannot read or update user A project;
- direct frontend/client update attempt for project `user_id` is rejected;
- direct delete attempt is rejected because no delete grant/policy is provided;
- no service role key is present in frontend env or code;
- no leads, imports, exports, AI, parsing, or payment tables are added in Stage 7.
