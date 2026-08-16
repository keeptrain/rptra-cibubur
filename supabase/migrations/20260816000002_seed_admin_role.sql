-- Set app_metadata role: admin for cgilang02@gmail.com in auth.users
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
where lower(email) = 'cgilang02@gmail.com';
