# Mô tả các nhánh (Branches)

Dự án KHKT: Dashboard Điều hành Du lịch Hà Nội — 2026

---

## `main`
**Trạng thái:** Ổn định — source gốc hoàn chỉnh Sprint 1–5

**Nội dung:**
- Toàn bộ giao diện dashboard (7 trang)
- Dữ liệu mô phỏng (mock data) — không có auth
- Đã deploy lên Vercel

**Các tính năng:**
- Trang Tổng quan: KPI cards, biểu đồ lượt khách, cảnh báo công suất
- Trang Lượt khách: biểu đồ theo tháng/tuần/ngày, so sánh năm, top nguồn khách
- Trang Lưu trú: GaugeChart công suất 6 quận, bảng cảnh báo
- Trang Phản ánh: phân tích sentiment, biểu đồ chủ đề, danh sách phản ánh
- Trang Bản đồ: Heatmap Leaflet 10 điểm đến Hà Nội, mật độ theo giờ
- Trang Gợi ý: rule-based AI 4 loại cảnh báo tự động
- Trang Báo cáo: xuất PDF tuần/tháng (jsPDF)
- UI: animations, sidebar thu gọn, mobile responsive, page transitions

---

## `feature/auth-level1`
**Trạng thái:** Hoàn thành — Auth frontend-only (không cần backend)

**Xây dựng trên:** `main`

**Nội dung:**
Thêm hệ thống đăng nhập cấp 1 — toàn bộ xử lý ở phía client, session lưu trong `localStorage`.

**Các file thêm mới:**
| File | Mô tả |
|------|-------|
| `src/context/AuthContext.jsx` | Context quản lý auth: login/logout/can(), 4 tài khoản hardcode, PERMISSIONS theo role |
| `src/pages/LoginPage.jsx` | Trang đăng nhập: split layout, demo accounts grid, redirect sau login |
| `src/components/common/ProtectedRoute.jsx` | Route guard: chặn truy cập nếu chưa đăng nhập |

**Các file cập nhật:**
| File | Thay đổi |
|------|---------|
| `src/App.jsx` | Bọc AuthProvider, route /login public, dashboard protected |
| `src/components/Layout/Header.jsx` | Avatar user, dropdown thông tin + quyền hạn, nút đăng xuất |
| `src/pages/Reports.jsx` | Ẩn nút xuất PDF với role viewer/staff |

**4 tài khoản demo:**
| Username | Password | Role | Quyền |
|----------|----------|------|-------|
| admin | admin123 | Admin | Toàn quyền |
| giamdoc | giamdoc123 | Admin | Toàn quyền |
| canbo | canbo123 | Staff | Xem + Phản ánh |
| viewer | viewer123 | Viewer | Chỉ xem |

**Hạn chế:** Mật khẩu hardcode trong source code — không dùng cho production thật.

---

## `feature/supabase-auth`
**Trạng thái:** Hoàn thành — Auth thật với Supabase (JWT, PostgreSQL)

**Xây dựng trên:** `feature/auth-level1`

**Nội dung:**
Nâng cấp hệ thống auth lên Supabase — JWT được quản lý tự động, users lưu trong PostgreSQL thật.

**Các file thêm mới:**
| File | Mô tả |
|------|-------|
| `src/lib/supabase.js` | Supabase client singleton (đọc URL/key từ .env) |
| `supabase/seed.sql` | SQL tạo bảng profiles + 4 tài khoản demo trong Supabase |
| `.env.example` | Template biến môi trường |

**Các file cập nhật:**
| File | Thay đổi |
|------|---------|
| `src/context/AuthContext.jsx` | Dùng supabase.auth (signInWithPassword, signOut, onAuthStateChange, getSession) |
| `src/pages/LoginPage.jsx` | login() là async, gọi Supabase thật |
| `src/components/common/ProtectedRoute.jsx` | Thêm loading state tránh flash redirect khi reload |
| `src/data/generators.js` | Thêm CURRENT_YEAR=2026, CURRENT_MONTH_INDEX |
| `src/data/visitors.js` | 2026 = năm hiện tại (Q1 thực tế + T4–T12 dự báo), 2025 = năm trước |
| `src/pages/Overview.jsx` | Labels cập nhật theo năm hiện tại |
| `src/pages/Visitors.jsx` | Biểu đồ và bảng dùng dữ liệu 2026 |
| `src/pages/Reports.jsx` | Xuất báo cáo dùng dữ liệu 2026 |

**Kiến trúc auth:**
```
LoginPage (username) → map → email → supabase.auth.signInWithPassword()
                                              ↓
                                     Supabase trả JWT
                                              ↓
                              onAuthStateChange() → fetchProfile()
                                              ↓
                              query bảng public.profiles → user state
```

**Mô hình dữ liệu thời gian:**
- `2025` — Năm trước, dữ liệu đầy đủ 12 tháng, dùng để so sánh
- `2026` — Năm hiện tại: T1–T3 thực tế, T4–T12 dự báo theo hệ số mùa vụ

**Đã deploy:** https://hanoi-tourism-dashboard.vercel.app

---

## Sơ đồ nhánh

```
main
 │
 ├── feat: khởi tạo project (Sprint 1–5)
 └── chore: vercel.json
      │
      └── feature/auth-level1
           │
           ├── feat(auth): Level 1 frontend auth
           └──────────────────────────────────────
                │
                └── feature/supabase-auth
                     ├── feat(auth): Supabase Auth + JWT
                     ├── feat(data): align data to 2026
                     └── fix(visitors): bugfix crash
```
