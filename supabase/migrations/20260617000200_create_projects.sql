do $$
begin
  create type public.project_status as enum ('active', 'archived');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  service_description text not null,
  target_audience text not null,
  offer text not null,
  region text not null,
  niches text[] not null default '{}',
  tone text not null default 'professional',
  status public.project_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint projects_name_not_blank check (length(trim(name)) > 0),
  constraint projects_service_description_not_blank check (length(trim(service_description)) > 0),
  constraint projects_target_audience_not_blank check (length(trim(target_audience)) > 0),
  constraint projects_offer_not_blank check (length(trim(offer)) > 0),
  constraint projects_region_not_blank check (length(trim(region)) > 0)
);

create index if not exists projects_user_id_status_idx
on public.projects (user_id, status);

create index if not exists projects_updated_at_idx
on public.projects (updated_at desc);

alter table public.projects enable row level security;

revoke all on public.projects from anon;
revoke all on public.projects from authenticated;
grant select on public.projects to authenticated;
grant insert (user_id, name, service_description, target_audience, offer, region, niches, tone, status) on public.projects to authenticated;
grant update (name, service_description, target_audience, offer, region, niches, tone, status) on public.projects to authenticated;

create or replace function public.set_projects_updated_at()
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

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
before update on public.projects
for each row
execute function public.set_projects_updated_at();

create or replace function public.prevent_authenticated_project_owner_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.role() = 'authenticated'
     and old.user_id is distinct from new.user_id then
    raise exception 'project owner cannot be changed from the client';
  end if;

  return new;
end;
$$;

drop trigger if exists prevent_authenticated_project_owner_change on public.projects;
create trigger prevent_authenticated_project_owner_change
before update on public.projects
for each row
execute function public.prevent_authenticated_project_owner_change();

drop policy if exists projects_select_own on public.projects;
create policy projects_select_own
on public.projects
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists projects_insert_own on public.projects;
create policy projects_insert_own
on public.projects
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists projects_update_own on public.projects;
create policy projects_update_own
on public.projects
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
