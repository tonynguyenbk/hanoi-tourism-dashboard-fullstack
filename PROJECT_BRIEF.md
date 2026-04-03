# DASHBOARD ĐIỀU HÀNH DU LỊCH HÀ NỘI

> Dự án Khoa học Kỹ thuật — Lĩnh vực: Khoa học máy tính & Công nghệ phần mềm

---

## 1. Tổng quan dự án

Hệ thống Dashboard trực quan, tập trung, giúp cơ quan quản lý du lịch Hà Nội giám sát toàn diện hoạt động du lịch, đưa ra quyết định điều hành dựa trên dữ liệu (data-driven decision making).

### Đối tượng sử dụng
- Lãnh đạo Sở Du lịch Hà Nội
- Cán bộ chuyên môn (theo dõi, xử lý phản ánh, điều tiết)
- Bộ phận truyền thông du lịch

---

## 2. Tính năng chính (6 modules)

### Module 1: Theo dõi lượt khách
- Biểu đồ lượt khách theo ngày/tuần/tháng/năm
- Phân loại: nội địa vs quốc tế
- So sánh cùng kỳ năm trước
- KPI cards: tổng lượt, tăng trưởng %, top nguồn khách

### Module 2: Công suất lưu trú
- Gauge/Donut chart tỷ lệ lấp đầy theo khu vực (Hoàn Kiếm, Ba Đình, Tây Hồ, Đống Đa, Cầu Giấy, Long Biên)
- Cảnh báo khi công suất > 85% (vàng) hoặc > 95% (đỏ)
- Phân loại: khách sạn 3-5 sao, homestay, nhà nghỉ

### Module 3: Phản ánh du khách
- Tiếp nhận feedback (form mô phỏng)
- Phân loại theo chủ đề: vệ sinh, an ninh, giá cả, giao thông, dịch vụ, khác
- Phân loại theo sentiment: tích cực / trung lập / tiêu cực
- Biểu đồ thống kê phản ánh theo thời gian và chủ đề

### Module 4: Bản đồ điểm đến đông (Heatmap)
- Bản đồ Hà Nội (Leaflet + OpenStreetMap)
- Heatmap mật độ du khách tại các điểm nổi bật
- Cảnh báo khi vượt ngưỡng an toàn
- Các điểm đến chính:
  - Hồ Hoàn Kiếm & Phố Cổ (21.0285, 105.8542)
  - Văn Miếu – Quốc Tử Giám (21.0275, 105.8359)
  - Lăng Chủ tịch Hồ Chí Minh (21.0369, 105.8345)
  - Hoàng thành Thăng Long (21.0341, 105.8400)
  - Chùa Một Cột (21.0359, 105.8337)
  - Chùa Trấn Quốc (21.0479, 105.8363)
  - Phố đi bộ Hồ Gươm (21.0288, 105.8525)
  - Bát Tràng (21.0537, 105.9112)
  - Hồ Tây (21.0535, 105.8200)
  - Nhà thờ Lớn Hà Nội (21.0288, 105.8490)

### Module 5: Gợi ý điều tiết
- Rule-based recommendation system (threshold-based)
- Khi điểm A quá tải → gợi ý tăng nhân lực + điều hướng sang điểm B gần đó
- Gợi ý nội dung truyền thông theo mùa/sự kiện sắp tới
- Lịch sự kiện Hà Nội: Tết Nguyên Đán, Giỗ Tổ Hùng Vương, 30/4-1/5, 2/9, Lễ hội Đền Ngọc Sơn, Festival Áo dài, Noel, Countdown...

### Module 6: Xuất báo cáo tuần/tháng
- Tự động tổng hợp dữ liệu thành báo cáo PDF
- Bao gồm: biểu đồ, bảng số liệu, nhận xét tự động
- Nút "Xuất báo cáo" trên Dashboard
- 2 loại: Báo cáo tuần (tóm tắt) và Báo cáo tháng (chi tiết)

---

## 3. Tech Stack

```
Frontend:   React.js (Vite)
UI:         Tailwind CSS
Biểu đồ:   Recharts
Bản đồ:    Leaflet.js + React-Leaflet + OpenStreetMap
Icons:      Lucide React
Backend:    Node.js + Express (API server)
Database:   SQLite (better-sqlite3) hoặc JSON files
Báo cáo:   jsPDF + jsPDF-AutoTable
Language:   JavaScript/TypeScript
```

---

## 4. Cấu trúc thư mục đề xuất

```
hanoi-tourism-dashboard/
├── PROJECT_BRIEF.md              # File này
├── README.md
├── package.json
│
├── public/
│   └── favicon.ico
│
├── src/
│   ├── App.jsx                   # Main app + routing
│   ├── main.jsx                  # Entry point
│   ├── index.css                 # Global styles (Tailwind)
│   │
│   ├── components/               # Shared components
│   │   ├── Layout/
│   │   │   ├── Sidebar.jsx       # Navigation sidebar
│   │   │   ├── Header.jsx        # Top bar
│   │   │   └── DashboardLayout.jsx
│   │   ├── Charts/               # Reusable chart components
│   │   │   ├── LineChart.jsx
│   │   │   ├── BarChart.jsx
│   │   │   ├── GaugeChart.jsx
│   │   │   └── PieChart.jsx
│   │   ├── Map/
│   │   │   └── HanoiHeatmap.jsx
│   │   ├── Cards/
│   │   │   ├── KPICard.jsx
│   │   │   └── AlertCard.jsx
│   │   └── common/
│   │       ├── Button.jsx
│   │       ├── Select.jsx
│   │       └── DateRangePicker.jsx
│   │
│   ├── pages/                    # Mỗi page = 1 module
│   │   ├── Overview.jsx          # Tổng quan (trang chính)
│   │   ├── Visitors.jsx          # Module 1: Lượt khách
│   │   ├── Accommodation.jsx     # Module 2: Lưu trú
│   │   ├── Feedback.jsx          # Module 3: Phản ánh
│   │   ├── HeatmapPage.jsx       # Module 4: Bản đồ điểm đến
│   │   ├── Recommendations.jsx   # Module 5: Gợi ý điều tiết
│   │   └── Reports.jsx           # Module 6: Xuất báo cáo
│   │
│   ├── data/                     # Dữ liệu mô phỏng
│   │   ├── visitors.js           # Dữ liệu lượt khách 12 tháng
│   │   ├── accommodation.js      # Dữ liệu lưu trú theo khu vực
│   │   ├── feedback.js           # Dữ liệu phản ánh du khách
│   │   ├── destinations.js       # Tọa độ & dữ liệu điểm đến
│   │   ├── events.js             # Lịch sự kiện Hà Nội
│   │   └── generators.js         # Hàm sinh dữ liệu mô phỏng
│   │
│   ├── utils/                    # Tiện ích
│   │   ├── formatters.js         # Format số, ngày, tiền
│   │   ├── thresholds.js         # Ngưỡng cảnh báo
│   │   ├── recommendations.js    # Logic gợi ý điều tiết
│   │   └── reportGenerator.js    # Xuất PDF
│   │
│   └── hooks/                    # Custom React hooks
│       ├── useVisitorData.js
│       └── useFilteredData.js
│
├── server/                       # Backend (optional, có thể dùng JSON)
│   ├── index.js
│   ├── routes/
│   └── database/
│
└── docs/                         # Tài liệu dự án
    ├── bao-cao-khkt.docx
    └── screenshots/
```

---

## 5. Dữ liệu mô phỏng — Quy tắc sinh dữ liệu

Dữ liệu cần realistic, tuân theo quy luật thực tế du lịch Hà Nội:

### Mùa vụ du lịch
- **Cao điểm:** Tháng 10-12 (thu/đông, thời tiết đẹp), Tháng 1-2 (Tết Nguyên Đán), Tháng 4 (30/4-1/5)
- **Trung bình:** Tháng 3, Tháng 9
- **Thấp điểm:** Tháng 5-8 (nóng, mưa)

### Hệ số mùa vụ gợi ý
```
Tháng 1:  1.3  (Tết)
Tháng 2:  1.4  (Tết + lễ hội xuân)
Tháng 3:  1.0
Tháng 4:  1.2  (30/4-1/5)
Tháng 5:  0.7
Tháng 6:  0.6
Tháng 7:  0.65
Tháng 8:  0.6
Tháng 9:  0.85
Tháng 10: 1.25
Tháng 11: 1.3
Tháng 12: 1.35 (Noel + Countdown)
```

### Quy mô số liệu tham khảo (cả năm)
- Tổng lượt khách/năm: ~28-30 triệu (nội địa ~25 triệu, quốc tế ~3-5 triệu)
- Số cơ sở lưu trú: ~3,800
- Tổng số phòng: ~70,000
- Công suất phòng trung bình: 65-72%

### Feedback mô phỏng
- 60% tích cực, 25% trung lập, 15% tiêu cực
- Chủ đề phổ biến: dịch vụ (30%), giá cả (20%), vệ sinh (15%), giao thông (15%), an ninh (10%), khác (10%)

---

## 6. Giao diện — Yêu cầu thiết kế

### Phong cách
- Modern, clean, professional (phù hợp cơ quan nhà nước)
- Bảng màu chính: xanh dương đậm (#1B4F72), xanh nhạt (#2E86C1), trắng, xám nhạt
- Font: Inter hoặc system font
- Dark mode: không bắt buộc (nice-to-have)

### Layout
- Sidebar bên trái: navigation giữa các module
- Header: tên hệ thống, user info, nút xuất báo cáo
- Main content: responsive grid các widgets
- Trang Overview: tổng hợp KPI cards + mini charts từ tất cả modules

### Responsive
- Desktop first (1280px+)
- Tablet friendly (768px+)
- Mobile: nice-to-have

---

## 7. Lộ trình phát triển

### Sprint 1 (Tuần 1-2): Setup & Layout
- [x] Khởi tạo project (Vite + React + Tailwind)
- [ ] Tạo Layout components (Sidebar, Header)
- [ ] Routing giữa các pages
- [ ] Tạo bộ dữ liệu mô phỏng
- [ ] Trang Overview với KPI cards

### Sprint 2 (Tuần 3-4): Module 1 & 2
- [ ] Module Lượt khách (biểu đồ line/bar, filter)
- [ ] Module Lưu trú (gauge charts, bảng theo khu vực)
- [ ] So sánh cùng kỳ năm trước

### Sprint 3 (Tuần 5-6): Module 3 & 4
- [ ] Module Phản ánh (form, bảng, phân tích sentiment)
- [ ] Module Bản đồ Heatmap (Leaflet integration)

### Sprint 4 (Tuần 7-8): Module 5 & 6
- [ ] Module Gợi ý điều tiết (rule engine, alerts)
- [ ] Module Truyền thông theo mùa/sự kiện
- [ ] Module Xuất báo cáo (jsPDF)

### Sprint 5 (Tuần 9-10): Polish & Demo
- [ ] UI polish, animations
- [ ] Testing toàn bộ
- [ ] Viết tài liệu, chuẩn bị demo

---

## 8. Ngưỡng cảnh báo (Thresholds)

```javascript
const THRESHOLDS = {
  accommodation: {
    warning: 0.85,    // Vàng: > 85% công suất
    critical: 0.95,   // Đỏ:  > 95% công suất
  },
  destination: {
    warning: 0.80,    // Vàng: > 80% sức chứa
    critical: 0.95,   // Đỏ:  > 95% sức chứa
  },
  feedback: {
    negativeSpike: 0.25, // Cảnh báo khi > 25% feedback tiêu cực trong ngày
  }
};
```

---

## 9. Logic gợi ý điều tiết (Rule-based)

```
IF điểm_đến.mật_độ > 90% THEN
  → Cảnh báo đỏ "Quá tải"
  → Gợi ý: "Tăng cường X nhân viên an ninh/vệ sinh"
  → Gợi ý: "Điều hướng du khách sang [điểm gần nhất còn thấp tải]"

IF lưu_trú.khu_vực.công_suất > 85% THEN
  → Cảnh báo vàng
  → Gợi ý: "Liên hệ cơ sở lưu trú khu vực [lân cận] để điều phối"

IF ngày_hiện_tại gần sự_kiện (< 14 ngày) THEN
  → Hiển thị gợi ý truyền thông phù hợp sự kiện
  → Gợi ý: "Chuẩn bị nhân lực cho [tên sự kiện] dự kiến [X] lượt khách"

IF feedback_tiêu_cực > 25% trong 3 ngày liên tiếp THEN
  → Cảnh báo: "Phát hiện xu hướng phản ánh tiêu cực tăng"
  → Gợi ý: "Kiểm tra chất lượng dịch vụ tại [khu vực/chủ đề nhiều phản ánh nhất]"
```

---

## 10. Ghi chú cho Claude Code

- Dự án này là sản phẩm KHKT dành cho học sinh, cần code rõ ràng, có comment giải thích
- Ưu tiên hoàn thành từng module trước khi sang module tiếp theo
- Dữ liệu mô phỏng cần realistic, không random hoàn toàn
- Mọi text hiển thị trên giao diện đều bằng tiếng Việt
- Khi tạo component mới, đặt đúng vào thư mục theo cấu trúc ở mục 4
- Mỗi lần hoàn thành module, chạy thử để đảm bảo không lỗi trước khi tiếp tục
