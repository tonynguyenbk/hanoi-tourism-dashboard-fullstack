# NỘI DUNG SLIDE THUYẾT TRÌNH
## Dashboard Điều hành Du lịch Hà Nội — KHKT 2025–2026

> Dùng file này để tạo slide PowerPoint/Google Slides/Canva.
> Mỗi `---` là một slide mới.

---

## SLIDE 1 — TRANG BÌA

**DASHBOARD ĐIỀU HÀNH DU LỊCH HÀ NỘI**
*Hệ thống giám sát, phân tích và hỗ trợ ra quyết định trong quản lý du lịch thành phố*

- Lĩnh vực: Khoa học máy tính – Công nghệ phần mềm
- Năm học: 2025 – 2026
- Hà Nội, 2026

---

## SLIDE 2 — VẤN ĐỀ ĐẶT RA

**Bài toán thực tế:**

- Sở Du lịch Hà Nội quản lý **~29 triệu lượt khách/năm**
- Thông tin phân tán: khách sạn, điểm đến, phản ánh... **không có một nơi tập trung**
- Báo cáo thủ công: cán bộ mất **nhiều giờ** tổng hợp Excel mỗi tuần
- Không có cảnh báo sớm khi điểm đến **quá tải**
- Quyết định điều hành dựa trên **kinh nghiệm**, chưa dựa trên dữ liệu

**→ Cần một hệ thống Dashboard tập trung, trực quan, tự động**

---

## SLIDE 3 — MỤC TIÊU DỰ ÁN

**6 mục tiêu cụ thể:**

1. 📊 Theo dõi lượt khách theo tháng/tuần/ngày, phân loại nội địa & quốc tế
2. 🏨 Giám sát công suất lưu trú 6 quận, cảnh báo khi quá tải
3. 💬 Phân tích phản ánh du khách theo chủ đề & cảm xúc
4. 🗺️ Bản đồ nhiệt mật độ 10 điểm đến trọng điểm Hà Nội
5. 🤖 Gợi ý điều tiết tự động dựa trên luật (Rule-based AI)
6. 📄 Xuất báo cáo PDF tuần/tháng chuyên nghiệp tự động

---

## SLIDE 4 — GIẢI PHÁP TỔNG QUAN

**Kiến trúc hệ thống:**

```
Dữ liệu mô phỏng
      ↓
   React App (7 module)
      ↓
Supabase (Auth + Database)
      ↓
  Vercel (Deploy)
      ↓
 Người dùng (Browser)
```

- **Frontend:** React 18 + Vite + Tailwind CSS
- **Database & Auth:** Supabase (PostgreSQL + JWT)
- **Deploy:** Vercel — truy cập mọi thiết bị

---

## SLIDE 5 — CÔNG NGHỆ SỬ DỤNG

| Thành phần | Công nghệ | Mục đích |
|---|---|---|
| Giao diện | React 18 + Tailwind | UI components |
| Biểu đồ | Recharts 2.13 | Line, Bar, Pie, Gauge |
| Bản đồ | Leaflet + OpenStreetMap | Heatmap điểm đến |
| Xuất báo cáo | jsPDF 2.5 | PDF tuần/tháng |
| Xác thực | Supabase Auth + JWT | Phân quyền người dùng |
| Database | PostgreSQL (Supabase) | Lưu trữ users, profiles |
| Deploy | Vercel | Hosting tự động |

---

## SLIDE 6 — CÁC MODULE CHÍNH (7 TRANG)

**Dashboard gồm 7 module:**

| # | Module | Tính năng nổi bật |
|---|---|---|
| 1 | Tổng quan | KPI cards, biểu đồ tổng hợp, cảnh báo |
| 2 | Lượt khách | Theo tháng/tuần/ngày, so sánh năm |
| 3 | Lưu trú | GaugeChart 6 quận, ngưỡng cảnh báo |
| 4 | Phản ánh | Sentiment analysis, xu hướng 30 ngày |
| 5 | Bản đồ | Heatmap 10 điểm đến, mật độ theo giờ |
| 6 | Gợi ý | Rule-based AI, 4 loại cảnh báo |
| 7 | Báo cáo | Xuất PDF, phân quyền theo role |

---

## SLIDE 7 — DỮ LIỆU & MÔ HÌNH THỜI GIAN

**Mô hình 2 năm:**

- **2025** = Năm trước → dùng để **so sánh cùng kỳ**
- **2026** = Năm hiện tại:
  - T1–T3: **Số liệu thực tế** (đã hoàn thành)
  - T4–T12: **Dự báo** theo mô hình mùa vụ

**Baseline dữ liệu (tham khảo VNAT 2024):**
- Khách nội địa: **25 triệu/năm**
- Khách quốc tế: **4 triệu/năm** (~13.8%)
- Tổng: **~29 triệu lượt/năm**

---

## SLIDE 8 — MÔ HÌNH TÍNH TOÁN LƯỢT KHÁCH

**Công thức (Multiplicative Decomposition — chuẩn WTO):**

```
Khách tháng i = Base_tháng × Hệ_số_mùa[i] × Jitter
```

**Hệ số mùa vụ 12 tháng:**

| T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 |
|-|-|-|-|-|-|-|-|-|-|-|-|
| 1.3 | **1.4** | 1.0 | 1.2 | 0.7 | 0.6 | 0.65 | **0.6** | 0.85 | 1.25 | 1.3 | 1.35 |

- **T2 cao nhất (1.4):** Tết Nguyên Đán
- **T8 thấp nhất (0.6):** Nóng nhất, mưa nhiều
- **Jitter ±5%:** Dao động tự nhiên, kết quả ổn định qua seeded random

> Kiểm tra: Σ hệ số / 12 = **1.017 ≈ 1.0** → Đúng chuẩn Seasonal Index

---

## SLIDE 9 — NGƯỠNG CẢNH BÁO

**3 loại ngưỡng, 2 mức độ:**

| Chỉ số | 🟡 Cảnh báo | 🔴 Nguy hiểm |
|---|---|---|
| Công suất lưu trú | > 85% | > 95% |
| Mật độ điểm đến | > 80% | > 95% |
| Phản ánh tiêu cực | > 25%/ngày (≥2 ngày liên tiếp) | — |

**Tình trạng hiện tại:**
- 🔴 Phố đi bộ Hồ Gươm: **97%** sức chứa (20,000 người)
- 🟡 Hoàn Kiếm: công suất lưu trú **92%** (8,500 phòng)
- 🟡 Tây Hồ: công suất lưu trú **88%** (6,800 phòng)

---

## SLIDE 10 — HỆ THỐNG GỢI Ý (RULE-BASED AI)

**4 Rule tự động:**

**Rule 1 — Điểm đến quá tải:**
- Mật độ ≥ 95% → Tăng nhân sự + **điều hướng sang điểm lân cận < 70%**
- Mật độ ≥ 80% → Bố trí thêm 3–5 nhân viên

**Rule 2 — Lưu trú:**
- Capacity ≥ 95% → Kích hoạt danh sách lưu trú dự phòng
- Capacity ≥ 85% → Cảnh báo đại lý du lịch

**Rule 3 — Phản ánh tiêu cực:**
- >25% tiêu cực trong ≥ 2 ngày → Họp khẩn đội dịch vụ

**Rule 4 — Sự kiện:**
- ≤ 7 ngày → Urgent · ≤ 14 ngày → Warning · ≤ 30 ngày → Info
- Nhân lực ước tính: `dự kiến khách ÷ 500`

---

## SLIDE 11 — PHÂN TÍCH PHẢN ÁNH

**Phân bố sentiment (tháng 3/2026):**

| Loại | Tỷ lệ | Số lượng |
|---|---|---|
| 🟢 Tích cực | 60% | 744 |
| 🟡 Trung lập | 25% | 310 |
| 🔴 Tiêu cực | 15% | 186 |

**Chủ đề tiêu cực nhiều nhất:**
- **Giá cả:** 95/260 phản ánh tiêu cực (36%)
- **Vệ sinh:** 80/195 phản ánh tiêu cực (41%)

**Phát hiện tự động:** Spike tiêu cực ngày 22–24 (32% vs 15% bình thường)
→ Hệ thống cảnh báo ngay trong vòng 24h

---

## SLIDE 12 — HỆ THỐNG XÁC THỰC & PHÂN QUYỀN

**2 cấp độ Auth:**

| | Level 1 | Level 2 (Supabase) |
|---|---|---|
| Lưu trữ | localStorage | PostgreSQL |
| Token | Không | JWT tự động |
| Bảo mật | Demo | Production-ready |
| Phù hợp | Thuyết trình | Triển khai thực tế |

**3 vai trò người dùng:**

| Role | Xuất báo cáo | Gửi phản ánh | Xem dữ liệu |
|---|---|---|---|
| Admin | ✅ | ✅ | ✅ |
| Cán bộ | ❌ | ✅ | ✅ |
| Viewer | ❌ | ❌ | ✅ |

---

## SLIDE 13 — KẾT QUẢ ĐẠT ĐƯỢC

**Hoàn thành 100% mục tiêu ban đầu + vượt kỳ vọng:**

✅ 7 module dashboard đầy đủ
✅ Dữ liệu mô phỏng thực tế (hệ số mùa vụ chuẩn WTO)
✅ Xuất báo cáo PDF chuyên nghiệp
✅ Bản đồ heatmap 10 điểm đến
✅ Rule-based AI 4 loại cảnh báo
✅ Hệ thống auth 2 cấp (localStorage + JWT Supabase)
✅ Phân quyền 3 vai trò
✅ Responsive mobile
✅ Deploy live trên Vercel

**Đã vượt kỳ vọng:**
- Backend: Supabase thay vì Flask/SQLite đơn giản
- Auth production-ready (JWT + PostgreSQL)
- Git branching strategy chuyên nghiệp

---

## SLIDE 14 — SO SÁNH TRƯỚC/SAU

| | Trước (thủ công) | Sau (Dashboard) |
|---|---|---|
| Tổng hợp báo cáo | Vài giờ/tuần | **1 click** |
| Phát hiện quá tải | Khi đã xảy ra | **Cảnh báo sớm** |
| Xem số liệu | File Excel rời rạc | **Tập trung 1 màn hình** |
| Phân tích phản ánh | Đọc thủ công | **Tự động phân loại** |
| Truy cập | Nội bộ | **Mọi thiết bị, mọi nơi** |

---

## SLIDE 15 — DEMO LIVE

**Truy cập sản phẩm thật:**

🔗 **https://hanoi-tourism-dashboard.vercel.app**

**Tài khoản demo:**

| Username | Password | Vai trò |
|---|---|---|
| admin | admin123 | Quản trị viên |
| giamdoc | giamdoc123 | Giám đốc |
| canbo | canbo123 | Cán bộ chuyên môn |
| viewer | viewer123 | Khách xem |

---

## SLIDE 16 — HƯỚNG PHÁT TRIỂN

**Có thể mở rộng tiếp:**

- 📡 Kết nối API thực từ Sở Du lịch / Booking.com
- 🤖 Machine Learning: dự báo lượt khách, phát hiện bất thường
- 📱 Tối ưu mobile (chart responsive)
- 🌐 Đa ngôn ngữ (tiếng Anh cho khách quốc tế)
- 📊 Xuất thêm Excel, không chỉ PDF
- 🔔 Thông báo realtime (WebSocket + Push notification)

---

## SLIDE 17 — KẾT LUẬN

**Dashboard Điều hành Du lịch Hà Nội:**

- ✅ Giải quyết bài toán thực tế của ngành du lịch
- ✅ Áp dụng công nghệ hiện đại (React, Supabase, JWT)
- ✅ Kiến trúc mở rộng được — sẵn sàng kết nối dữ liệu thật
- ✅ Có thể dùng ngay làm Proof-of-Concept cho Sở Du lịch Hà Nội

> *"Dữ liệu là nền tảng của quyết định thông minh.  
> Dashboard là cầu nối giữa dữ liệu và hành động."*

---

## SLIDE 18 — CẢM ƠN & HỎI ĐÁP

**Xin cảm ơn Hội đồng đã lắng nghe!**

📎 Source code: github.com/tonynguyenbk/hanoi-tourism-dashboard-fullstack
🔗 Demo live: https://hanoi-tourism-dashboard.vercel.app

*Rất mong nhận được câu hỏi và góp ý từ Hội đồng*
