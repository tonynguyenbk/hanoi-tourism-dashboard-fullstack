-- ============================================================
-- seed.sql — Tạo bảng profiles + 4 tài khoản demo
-- Chạy file này trong Supabase Dashboard > SQL Editor
-- ============================================================

-- 1. Xoá bảng cũ nếu có (để chạy lại sạch)
drop table if exists public.profiles cascade;

-- 2. Tạo bảng profiles
create table public.profiles (
  id       uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  name     text not null,
  title    text,
  role     text not null default 'viewer' check (role in ('admin', 'staff', 'viewer')),
  avatar   text
);

-- 3. Bật Row Level Security
alter table public.profiles enable row level security;

-- 4. Policy: user chỉ đọc được profile của chính mình
create policy "Đọc profile của chính mình"
  on public.profiles for select
  using (auth.uid() = id);

-- ============================================================
-- 5. Xoá users demo cũ nếu có
-- ============================================================
delete from auth.users where email in (
  'admin@hanoidulich.vn',
  'giamdoc@hanoidulich.vn',
  'canbo@hanoidulich.vn',
  'viewer@hanoidulich.vn'
);

-- ============================================================
-- 6. Tạo 4 tài khoản demo trong auth.users
-- ============================================================
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at, confirmation_token,
  email_change, email_change_token_new, recovery_token
) values
(
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(), 'authenticated', 'authenticated',
  'admin@hanoidulich.vn',
  crypt('admin123', gen_salt('bf')),
  now(), '{"provider":"email","providers":["email"]}', '{}',
  now(), now(), '', '', '', ''
),
(
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(), 'authenticated', 'authenticated',
  'giamdoc@hanoidulich.vn',
  crypt('giamdoc123', gen_salt('bf')),
  now(), '{"provider":"email","providers":["email"]}', '{}',
  now(), now(), '', '', '', ''
),
(
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(), 'authenticated', 'authenticated',
  'canbo@hanoidulich.vn',
  crypt('canbo123', gen_salt('bf')),
  now(), '{"provider":"email","providers":["email"]}', '{}',
  now(), now(), '', '', '', ''
),
(
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(), 'authenticated', 'authenticated',
  'viewer@hanoidulich.vn',
  crypt('viewer123', gen_salt('bf')),
  now(), '{"provider":"email","providers":["email"]}', '{}',
  now(), now(), '', '', '', ''
);

-- ============================================================
-- 7. Insert profiles
-- ============================================================
insert into public.profiles (id, username, name, title, role, avatar)
select id, 'admin', 'Nguyễn Văn A', 'Quản trị hệ thống', 'admin', 'QT'
from auth.users where email = 'admin@hanoidulich.vn';

insert into public.profiles (id, username, name, title, role, avatar)
select id, 'giamdoc', 'Trần Thị B', 'Giám đốc Sở Du lịch', 'admin', 'GĐ'
from auth.users where email = 'giamdoc@hanoidulich.vn';

insert into public.profiles (id, username, name, title, role, avatar)
select id, 'canbo', 'Lê Văn C', 'Cán bộ chuyên môn', 'staff', 'CB'
from auth.users where email = 'canbo@hanoidulich.vn';

insert into public.profiles (id, username, name, title, role, avatar)
select id, 'viewer', 'Phạm Thị D', 'Khách xem', 'viewer', 'KX'
from auth.users where email = 'viewer@hanoidulich.vn';

-- ============================================================
-- Kiểm tra kết quả — phải thấy 4 dòng
-- ============================================================
select u.email, p.username, p.name, p.role
from auth.users u
join public.profiles p on p.id = u.id
order by p.role;
