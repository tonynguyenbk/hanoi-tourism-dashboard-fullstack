# Dashboard Điều hành Du lịch Hà Nội

> **Dự án Khoa học Kỹ thuật** — Lĩnh vực: Khoa học máy tính & Công nghệ phần mềm

Hệ thống Dashboard trực quan giúp cơ quan quản lý du lịch Hà Nội **giám sát toàn diện** hoạt động du lịch và **đưa ra quyết định điều hành dựa trên dữ liệu** (data-driven decision making).

## Giao diện

| Trang | Mô tả |
|---|---|
| Tổng quan | KPI tổng hợp, cảnh báo nổi bật, biểu đồ nhanh |
| Lượt khách | Biểu đồ theo ngày/tuần/tháng, so sánh năm trước |
| Công suất lưu trú | Gauge chart 6 khu vực, cảnh báo ngưỡng |
| Phản ánh du khách | Phân tích sentiment, bảng lọc, form tiếp nhận |
| Bản đồ điểm đến | Heatmap Leaflet, mật độ theo giờ |
| Gợi ý điều tiết | Rule-based engine, lịch sự kiện |
| Xuất báo cáo | PDF tuần/tháng chuyên nghiệp |

## Tech Stack

```
Frontend:   React 18 + Vite 5
UI:         Tailwind CSS 3
Biểu đồ:   Recharts
Bản đồ:    Leaflet.js + React-Leaflet + OpenStreetMap
Icons:      Lucide React
Báo cáo:   jsPDF + jsPDF-AutoTable
Routing:    React Router DOM v6
Language:   JavaScript (ES2022)
```

## Cài đặt & Chạy

```bash
# Clone repository
git clone <repo-url>
cd hanoi-tourism-dashboard

# Cài dependencies
npm install

# Chạy dev server (http://localhost:3000)
npm run dev

# Build production
npm run build

# Preview build
npm run preview
```

## Cấu trúc dự án

```
src/
├── components/
│   ├── Layout/       # Sidebar, Header, DashboardLayout
│   ├── Charts/       # LineChart, BarChart, PieChart, GaugeChart
│   ├── Map/          # HanoiHeatmap (Leaflet)
│   ├── Cards/        # KPICard, AlertCard
│   └── common/       # Button, Select, DateRangePicker, LoadingSpinner
├── pages/            # 7 trang = 7 modules
├── data/             # Dữ liệu mô phỏng (visitors, accommodation, feedback...)
├── utils/            # formatters, thresholds, recommendations, reportGenerator
└── hooks/            # useVisitorData, useFilteredData
```

## Tính năng nổi bật

- **6 modules** quản lý đầy đủ vòng đời du lịch
- **Dữ liệu realistic** theo hệ số mùa vụ thực tế Hà Nội
- **Rule-based AI** gợi ý điều tiết tự động theo 4 loại quy tắc
- **Xuất PDF** báo cáo tuần/tháng có đầu trang, bảng màu, nhận xét tự động
- **Responsive** desktop (1280px+) và tablet (768px+)
- **Sidebar collapsible** với badge cảnh báo realtime
- **Page transitions** và hover animations

## Ngưỡng cảnh báo

| Loại | Cảnh báo (Vàng) | Nguy hiểm (Đỏ) |
|---|---|---|
| Công suất lưu trú | > 85% | > 95% |
| Mật độ điểm đến | > 80% | > 95% |
| Feedback tiêu cực | > 25%/ngày | — |

## Dữ liệu mô phỏng

Dữ liệu tuân theo hệ số mùa vụ du lịch Hà Nội:
- **Cao điểm:** Tháng 1–2 (Tết), Tháng 10–12 (Thu đông)
- **Thấp điểm:** Tháng 5–8 (Nóng, mưa)
- Tổng ~28–30 triệu lượt khách/năm

---

*Sản phẩm KHKT cấp thành phố — Sở Du lịch Hà Nội · 2026*
