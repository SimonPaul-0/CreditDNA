-- Run this file once in the Supabase SQL Editor before enabling live auth.
create type public.app_role as enum ('user', 'bank', 'admin');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null default 'user',
  display_name text not null default 'CreditDNA member',
  phone text,
  upi_id text,
  institution_id text unique,
  country_code text not null default 'IN',
  language_code text not null default 'en',
  score integer check (score between 300 and 900),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.rate_tables (
  id bigint generated always as identity primary key,
  country_code text not null,
  borrower_tier text not null,
  min_rate numeric(5,2) not null,
  max_rate numeric(5,2) not null,
  nri_product text,
  is_demo boolean not null default true,
  updated_at timestamptz not null default now(),
  unique(country_code, borrower_tier, nri_product)
);

create table public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.rate_tables enable row level security;
alter table public.audit_logs enable row level security;

create or replace function public.has_role(expected_role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role = expected_role) $$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1), 'CreditDNA member'));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create policy "profiles: users read own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles: users update own profile" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "profiles: banks read applicants" on public.profiles
  for select using (public.has_role('bank'));
create policy "profiles: admins manage all" on public.profiles
  for all using (public.has_role('admin')) with check (public.has_role('admin'));
create policy "rates: authenticated users read rates" on public.rate_tables
  for select to authenticated using (true);
create policy "rates: admins manage" on public.rate_tables
  for all using (public.has_role('admin')) with check (public.has_role('admin'));
create policy "audit: users read own logs" on public.audit_logs
  for select using (auth.uid() = actor_id);
create policy "audit: admins read all logs" on public.audit_logs
  for select using (public.has_role('admin'));

-- Roles are deliberately assigned by an administrator in the Supabase dashboard
-- or through a server-side admin API; never accept a role from browser signup data.
insert into public.rate_tables (country_code, borrower_tier, min_rate, max_rate, nri_product)
values
  ('IN', 'Excellent', 8.50, 9.75, null),
  ('IN', 'Good', 9.50, 11.25, null),
  ('IN', 'Fair', 11.50, 14.00, null),
  ('IN', 'NRE / NRO', 8.75, 10.50, 'NRE / NRO'),
  ('US', 'Excellent', 6.50, 8.25, null),
  ('GB', 'Excellent', 5.25, 7.00, null)
on conflict (country_code, borrower_tier, nri_product) do update
set min_rate = excluded.min_rate, max_rate = excluded.max_rate, updated_at = now();
