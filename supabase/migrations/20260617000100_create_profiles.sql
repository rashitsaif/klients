create extension if not exists pgcrypto;

do $$
begin
  create type public.profile_role as enum ('user', 'admin');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  company_name text,
  role public.profile_role not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists id uuid default gen_random_uuid();
alter table public.profiles add column if not exists user_id uuid;
alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists full_name text;
alter table public.profiles add column if not exists company_name text;
alter table public.profiles add column if not exists role public.profile_role not null default 'user';
alter table public.profiles add column if not exists created_at timestamptz not null default now();
alter table public.profiles add column if not exists updated_at timestamptz not null default now();

update public.profiles
set id = gen_random_uuid()
where id is null;

update public.profiles
set role = 'user'
where role is null;

update public.profiles
set email = ''
where email is null;

-- Invalid orphan profile rows cannot be protected by auth.uid() and must not survive
-- a strict profiles security migration.
delete from public.profiles
where user_id is null;

alter table public.profiles alter column id set default gen_random_uuid();
alter table public.profiles alter column id set not null;
alter table public.profiles alter column user_id set not null;
alter table public.profiles alter column email set not null;
alter table public.profiles alter column role set default 'user';
alter table public.profiles alter column role set not null;
alter table public.profiles alter column created_at set default now();
alter table public.profiles alter column created_at set not null;
alter table public.profiles alter column updated_at set default now();
alter table public.profiles alter column updated_at set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_pkey'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
    add constraint profiles_pkey primary key (id);
  end if;
end $$;

drop index if exists profiles_user_id_unique_idx;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_user_id_key'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
    add constraint profiles_user_id_key unique (user_id);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_user_id_fkey'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
    add constraint profiles_user_id_fkey
    foreign key (user_id)
    references auth.users(id)
    on delete cascade;
  end if;
end $$;

alter table public.profiles enable row level security;

revoke all on public.profiles from anon;
revoke all on public.profiles from authenticated;
grant select on public.profiles to authenticated;
grant update (full_name, company_name) on public.profiles to authenticated;

create or replace function public.set_profiles_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_profiles_updated_at();

create or replace function public.prevent_authenticated_profile_protected_fields_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.role() = 'authenticated'
     and (
       old.user_id is distinct from new.user_id
       or old.email is distinct from new.email
       or old.role is distinct from new.role
     ) then
    raise exception 'profile protected fields cannot be changed from the client';
  end if;

  return new;
end;
$$;

drop trigger if exists prevent_profile_role_change on public.profiles;
drop trigger if exists prevent_authenticated_profile_protected_fields_change on public.profiles;
create trigger prevent_authenticated_profile_protected_fields_change
before update on public.profiles
for each row
execute function public.prevent_authenticated_profile_protected_fields_change();

create or replace function public.handle_new_auth_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, email, full_name)
  values (
    new.id,
    coalesce(new.email, ''),
    nullif(trim(coalesce(new.raw_user_meta_data ->> 'full_name', '')), '')
  )
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_create_profile on auth.users;
create trigger on_auth_user_created_create_profile
after insert on auth.users
for each row
execute function public.handle_new_auth_user_profile();

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own
on public.profiles
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own
on public.profiles
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
