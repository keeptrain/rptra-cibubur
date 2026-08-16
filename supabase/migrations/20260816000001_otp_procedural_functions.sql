-- 1. Stored function to request & generate 8-digit OTP (SECURITY DEFINER)
create or replace function public.request_otp_code(p_email text)
returns text
language plpgsql
security definer set search_path = public
as $$
declare
  v_otp text;
  v_expires timestamp with time zone;
begin
  -- Generate 8-digit numeric OTP string
  v_otp := floor(10000000 + random() * 90000000)::text;
  v_expires := timezone('utc'::text, now()) + interval '10 minutes';

  -- Invalidate previous active OTPs for this email
  update public.auth_otp_codes
  set is_used = true
  where email = lower(trim(p_email)) and is_used = false;

  -- Insert new OTP
  insert into public.auth_otp_codes (email, otp_code, expires_at, is_used, attempts_count)
  values (lower(trim(p_email)), v_otp, v_expires, false, 0);

  return v_otp;
end;
$$;

-- 2. Stored function to verify 8-digit OTP code (SECURITY DEFINER)
create or replace function public.verify_otp_code(p_email text, p_otp text)
returns jsonb
language plpgsql
security definer set search_path = public
as $$
declare
  v_record record;
  v_new_attempts integer;
begin
  -- Fetch active OTP record
  select * into v_record
  from public.auth_otp_codes
  where email = lower(trim(p_email))
    and is_used = false
    and expires_at > timezone('utc'::text, now())
  order by created_at desc
  limit 1;

  if not found then
    return jsonb_build_object('success', false, 'error', 'Kode OTP kedaluwarsa atau tidak ditemukan. Silakan minta kode baru.');
  end if;

  if v_record.attempts_count >= 3 then
    update public.auth_otp_codes set is_used = true where id = v_record.id;
    return jsonb_build_object('success', false, 'error', 'Batas percobaan salah telah tercapai (3 kali). Silakan minta kode baru.');
  end if;

  if v_record.otp_code <> trim(p_otp) then
    v_new_attempts := v_record.attempts_count + 1;
    update public.auth_otp_codes
    set attempts_count = v_new_attempts,
        is_used = (v_new_attempts >= 3)
    where id = v_record.id;

    if v_new_attempts >= 3 then
      return jsonb_build_object('success', false, 'error', 'Kode OTP salah. Batas percobaan habis, silakan minta kode baru.');
    else
      return jsonb_build_object('success', false, 'error', format('Kode OTP salah. Sisa percobaan: %s kali.', 3 - v_new_attempts));
    end if;
  end if;

  -- OTP Valid: mark used
  update public.auth_otp_codes set is_used = true where id = v_record.id;
  return jsonb_build_object('success', true);
end;
$$;

-- Grant EXECUTE privileges to anon and authenticated roles
grant execute on function public.request_otp_code(text) to anon, authenticated;
grant execute on function public.verify_otp_code(text, text) to anon, authenticated;
