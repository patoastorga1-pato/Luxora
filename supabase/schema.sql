create extension if not exists "pgcrypto";

create type public.user_role as enum ('admin', 'owner', 'client', 'concierge');
create type public.asset_status as enum ('draft', 'pending_verification', 'verified', 'suspended');
create type public.booking_status as enum ('quote_requested', 'reserved', 'deposit_paid', 'paid', 'completed', 'cancelled');
create type public.payment_stage as enum ('deposit', 'remaining_balance', 'full_payment', 'commission');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'client',
  full_name text,
  phone text,
  company_name text,
  identity_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  is_active boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.assets (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  category_id uuid not null references public.categories(id),
  title text not null,
  brand text,
  model text,
  manufacture_year integer,
  base_location text,
  base_airport_code text,
  latitude numeric(10, 7),
  longitude numeric(10, 7),
  capacity integer,
  price_per_hour numeric(12, 2),
  currency text not null default 'USD',
  description text,
  included_services text[] not null default '{}',
  verification_status public.asset_status not null default 'draft',
  category_attributes jsonb not null default '{}',
  search_vector tsvector generated always as (
    to_tsvector(
      'simple',
      coalesce(title, '') || ' ' ||
      coalesce(brand, '') || ' ' ||
      coalesce(model, '') || ' ' ||
      coalesce(base_location, '')
    )
  ) stored,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.asset_media (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references public.assets(id) on delete cascade,
  storage_path text not null,
  media_type text not null default 'image',
  alt_text text,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.asset_availability (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references public.assets(id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  is_available boolean not null default true,
  note text,
  constraint availability_range_valid check (ends_at > starts_at)
);

create table public.favorites (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  asset_id uuid not null references public.assets(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (profile_id, asset_id)
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references public.assets(id),
  client_id uuid not null references public.profiles(id),
  owner_id uuid not null references public.profiles(id),
  origin text,
  destination text,
  passengers integer,
  starts_at timestamptz not null,
  ends_at timestamptz,
  status public.booking_status not null default 'quote_requested',
  quoted_amount numeric(12, 2),
  deposit_amount numeric(12, 2),
  remaining_amount numeric(12, 2),
  commission_rate numeric(5, 2) not null default 12.00,
  stripe_checkout_session_id text,
  created_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  stage public.payment_stage not null,
  amount numeric(12, 2) not null,
  currency text not null default 'USD',
  stripe_payment_intent_id text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references public.bookings(id) on delete cascade,
  asset_id uuid references public.assets(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.conversation_participants (
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  primary key (conversation_id, profile_id)
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id),
  body text,
  attachment_path text,
  attachment_type text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.verification_documents (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  asset_id uuid references public.assets(id) on delete cascade,
  document_type text not null,
  storage_path text not null,
  status text not null default 'pending',
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index assets_category_idx on public.assets(category_id);
create index assets_owner_idx on public.assets(owner_id);
create index assets_search_idx on public.assets using gin(search_vector);
create index assets_attributes_idx on public.assets using gin(category_attributes);
create index bookings_client_idx on public.bookings(client_id);
create index bookings_owner_idx on public.bookings(owner_id);
create index messages_conversation_idx on public.messages(conversation_id, created_at);

insert into public.categories (slug, name, is_active, display_order) values
  ('aviation', 'Aviation', true, 1),
  ('yacht', 'Yacht', false, 2),
  ('villa', 'Villa', false, 3),
  ('luxury-car', 'Luxury Car', false, 4),
  ('helicopter', 'Helicopter', false, 5),
  ('boat', 'Boat', false, 6),
  ('private-island', 'Private Island', false, 7)
on conflict (slug) do nothing;

alter table public.profiles enable row level security;
alter table public.assets enable row level security;
alter table public.asset_media enable row level security;
alter table public.bookings enable row level security;
alter table public.messages enable row level security;
alter table public.verification_documents enable row level security;
