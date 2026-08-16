-- Create UNLOGGED table for passwordless 8-digit OTP codes (High I/O efficiency)
create unlogged table if not exists public.auth_otp_codes (
  id bigint primary key generated always as identity,
  email text not null,
  otp_code text not null check (length(otp_code) = 8),
  expires_at timestamp with time zone default (timezone('utc'::text, now()) + interval '10 minutes') not null,
  is_used boolean default false not null,
  attempts_count integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for fast lookup & cleanup by email & expiration date
create index if not exists idx_auth_otp_codes_email_exp on public.auth_otp_codes(email, expires_at);

-- Enable RLS on OTP codes (NO grants to anon/authenticated - access restricted to server execution / service role)
alter table public.auth_otp_codes enable row level security;
