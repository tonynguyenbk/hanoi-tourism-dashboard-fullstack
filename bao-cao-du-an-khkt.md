# BÁO CÁO DỰ ÁN KHOA HỌC KỸ THUẬT

## DASHBOARD ĐIỀU HÀNH DU LỊCH HÀ NỘI
### Hệ thống giám sát, phân tích và hỗ trợ điều hành hoạt động du lịch trên địa bàn thành phố Hà Nội

**Lĩnh vực:** Khoa học máy tính – Công nghệ phần mềm
**Năm học:** 2025 – 2026

**Hà Nội, 2026**

---

## 1. TÊN ĐỀ TÀI

**"DASHBOARD ĐIỀU HÀNH DU LỊCH HÀ NỘI – HỆ THỐNG GIÁM SÁT, PHÂN TÍCH VÀ HỖ TRỢ RA QUYẾT ĐỊNH TRONG QUẢN LÝ DU LỊCH THÀNH PHỐ"**

**Tên tiếng Anh:** *"Hanoi Tourism Operations Dashboard – A Monitoring, Analytics & Decision-Support System for Urban Tourism Management"*

## 2. MỤC TIÊU DỰ ÁN

### 2.1. Mục tiêu tổng quát

Xây dựng một hệ thống Dashboard trực quan, tập trung, cho phép cơ quan quản lý du lịch Hà Nội giám sát toàn diện hoạt động du lịch, từ đó đưa ra quyết định điều hành nhanh chóng, chính xác và dựa trên dữ liệu (data-driven decision making).

### 2.2. Mục tiêu cụ thể

1. Theo dõi lượt khách du lịch theo thời gian thực (realtime), phân loại theo nguồn khách nội địa và quốc tế, theo tháng/quý/năm.
2. Giám sát công suất lưu trú của hệ thống khách sạn, homestay trên địa bàn theo khu vực, cảnh báo khi quá tải.
3. Tiếp nhận và phân loại phản ánh của du khách theo chủ đề và mức độ hài lòng.
4. Hiển thị bản đồ nhiệt (heatmap) mật độ du khách tại các điểm đến trọng điểm.
5. Đưa ra gợi ý điều tiết nhân lực, nguồn lực vào dịp cao điểm và hỗ trợ truyền thông theo mùa/sự kiện.
6. Tự động tổng hợp và xuất báo cáo tuần/tháng dưới dạng chuyên nghiệp phục vụ lãnh đạo.
7. **[Bổ sung]** Hệ thống xác thực người dùng (authentication) với phân quyền theo vai trò.

## 3. CƠ SỞ KHOA HỌC

### 3.1. Lý thuyết về Dashboard và Business Intelligence (BI)

Dashboard là công cụ trực quan hóa dữ liệu, giúp người ra quyết định nắm bắt thông tin nhanh chóng thông qua biểu đồ, bảng, bản đồ thay vì đọc báo cáo dài. Theo Stephen Few (2006) trong *Information Dashboard Design*, một dashboard hiệu quả cần đảm bảo: hiển thị thông tin quan trọng nhất trên một màn hình, sử dụng biểu đồ phù hợp với loại dữ liệu, và cho phép tương tác (drill-down, lọc, so sánh).

### 3.2. Khoa học dữ liệu trong quản lý du lịch

Du lịch thông minh (Smart Tourism) là xu hướng toàn cầu, sử dụng công nghệ thông tin và dữ liệu lớn để nâng cao trải nghiệm du khách và hiệu quả quản lý. Các thành phố như Barcelona, Singapore, Đà Nẵng đã áp dụng dashboard du lịch để điều phối nguồn lực hiệu quả.

### 3.3. Phân tích cảm xúc (Sentiment Analysis)

Kỹ thuật phân tích cảm xúc (Sentiment Analysis) thuộc lĩnh vực Xử lý ngôn ngữ tự nhiên (NLP), cho phép phân loại văn bản phản hồi của du khách thành các nhóm: tích cực, trung lập, tiêu cực. Đây là cơ sở để tự động đánh giá chất lượng dịch vụ và phát hiện vấn đề sớm.

### 3.4. Bản đồ nhiệt và phân tích không gian

Heatmap là kỹ thuật trực quan hóa mật độ dữ liệu theo vị trí địa lý, được sử dụng rộng rãi trong quản lý đô thị và du lịch để xác định các điểm nóng, từ đó phân bổ nguồn lực hợp lý.

### 3.5. Hệ thống gợi ý dựa trên luật (Rule-based Recommendation)

Hệ thống sử dụng các ngưỡng (threshold) và luật logic để tự động đưa ra gợi ý: khi công suất lưu trú vượt 85%, hệ thống cảnh báo và gợi ý điều hướng sang khu vực lân cận. Đây là mô hình Expert System đơn giản nhưng hiệu quả, phù hợp với mục đích dự án KHKT.

### 3.6. Hệ thống xác thực và phân quyền (Authentication & Authorization)

Hệ thống xác thực dùng JWT (JSON Web Tokens) và cơ sở dữ liệu để quản lý người dùng thực, thay vì dữ liệu hardcode. Kiến trúc này cho phép mở rộng từ demo thành sản phẩm production-ready.

## 4. Ý NGHĨA THỰC TIỄN

### 4.1. Đối với cơ quan quản lý du lịch

1. Cung cấp bức tranh toàn cảnh, cập nhật về tình hình du lịch Hà Nội, thay thế các báo cáo thủ công rời rạc.
2. Hỗ trợ ra quyết định nhanh trong các dịp cao điểm (Tết Nguyên Đán, 30/4, 2/9, sự kiện quốc tế).
3. Tiết kiệm thời gian lập báo cáo tuần/tháng nhờ tính năng xuất báo cáo tự động.
4. Quản lý truy cập thông tin dựa trên vai trò người dùng (admin, cán bộ chuyên môn, bộ phận khác).

### 4.2. Đối với ngành du lịch Hà Nội

1. Phát hiện sớm các điểm đến quá tải, giảm rủi ro về an toàn và chất lượng dịch vụ.
2. Nâng cao khả năng truyền thông chủ động theo mùa và sự kiện, thu hút du khách hiệu quả hơn.
3. Định hướng phân bổ nguồn lực hợp lý, tránh lãng phí và quá tải cục bộ.

### 4.3. Đối với du khách

1. Phản ánh được tiếp nhận và xử lý nhanh hơn, nâng cao sự hài lòng.
2. Trải nghiệm du lịch được cải thiện nhờ việc điều tiết mật độ tại các điểm đến.

## 5. ĐIỂM MỚI CỦA DỰ ÁN

1. **Tích hợp đa chiều:** Khác với các hệ thống thống kê đơn lẻ, dự án tập hợp dữ liệu lượt khách, lưu trú, phản hồi, bản đồ và gợi ý điều tiết vào **một** giao diện duy nhất.
2. **Gợi ý thông minh:** Không chỉ hiển thị số liệu mà còn đưa ra cảnh báo và đề xuất hành động cụ thể (ví dụ: điều hướng du khách, tăng cường nhân lực, gợi ý nội dung truyền thông).
3. **Chuyên biệt cho Hà Nội:** Dữ liệu và điểm đến được thiết kế riêng cho địa bàn Hà Nội, phù hợp với đặc thù du lịch thủ đô (phố cổ, di tích lịch sử, làng nghề, ẩm thực).
4. **Xuất báo cáo tự động:** Tính năng chưa có ở nhiều hệ thống hiện tại – tự động tổng hợp dữ liệu thành báo cáo chuyên nghiệp, giảm tải cho cán bộ.
5. **Truyền thông theo mùa:** Module gợi ý nội dung truyền thông phù hợp với từng mùa và sự kiện, giúp quảng bá du lịch chủ động và hiệu quả.
6. **Hệ thống xác thực linh hoạt:** Hỗ trợ 2 cấp độ auth — từ demo đơn giản (localStorage) đến production-grade (JWT + PostgreSQL qua Supabase).

## 6. PHƯƠNG PHÁP NGHIÊN CỨU

### 6.1. Phương pháp thu thập dữ liệu

1. **Nghiên cứu tài liệu:** Khảo sát số liệu thống kê du lịch Hà Nội từ Tổng cục Du lịch, Sở Du lịch Hà Nội, báo cáo ngành.
2. **Mô phỏng dữ liệu (Data Simulation):** Xây dựng bộ dữ liệu giả lập dựa trên quy luật thực tế (mùa cao điểm, mùa thấp điểm, sự kiện đặc biệt):
   - Base: 25 triệu khách nội địa + 4 triệu quốc tế = 29 triệu/năm
   - Hệ số mùa vụ: T2 + T10–T12 cao (1.3–1.4), T6–T8 thấp (0.6–0.65)
   - Weekend bonus: +35% so với ngày thường
3. **Khảo sát nhu cầu:** Tham khảo ý kiến giáo viên hướng dẫn và chuyên gia về các tính năng cần thiết.

### 6.2. Phương pháp thiết kế và phát triển

1. **Phát triển Agile:** Chia dự án thành các sprint ngắn, mỗi sprint hoàn thành một nhóm tính năng.
2. **Thiết kế UI/UX:** Áp dụng nguyên tắc trực quan hóa dữ liệu — đơn giản, rõ ràng, tập trung vào dữ liệu.
3. **Kiến trúc phân lớp:** Tách biệt Data Layer, Logic Layer, Presentation Layer để dễ bảo trì và mở rộng.
4. **Version Control:** Sử dụng Git branching strategy — `main` cho source gốc, `feature/*` cho từng tính năng.

### 6.3. Phương pháp kiểm thử và đánh giá

1. **Kiểm thử chức năng:** Test từng module riêng lẻ và tích hợp.
2. **Hot Module Replacement (HMR):** Dùng Vite HMR để test realtime khi phát triển.
3. **Đánh giá định tính:** Lấy phản hồi từ giáo viên hướng dẫn.

## 7. QUY TRÌNH THỰC HIỆN

Dự án được triển khai qua 5 giai đoạn chính:

| TT | Giai đoạn | Nội dung thực hiện |
|---|---|---|
| 1 | Khảo sát và phân tích (Tuần 1–2) | Nghiên cứu thực trạng; xác định yêu cầu; khảo sát dữ liệu; vẽ wireframe. |
| 2 | Thiết kế hệ thống (Tuần 3–4) | Thiết kế kiến trúc (Frontend+Backend); mockup UI/UX; bộ dữ liệu mô phỏng; lựa chọn công nghệ. |
| 3 | Lập trình các module (Tuần 5–8) | Module lượt khách, công suất lưu trú, bản đồ heatmap, phản ánh du khách, gợi ý điều tiết, xác thực người dùng. |
| 4 | Tích hợp và xuất báo cáo (Tuần 9–10) | Tích hợp modules; chức năng xuất PDF; kiểm thử; sửa lỗi. |
| 5 | Hoàn thiện và báo cáo (Tuần 11–12) | Cải thiện UI/UX; viết báo cáo; tài liệu kỹ thuật; chuẩn bị thuyết trình. |

## 8. SẢN PHẨM

### 8.1. Sản phẩm phần mềm

**Dashboard Web hoàn chỉnh với 7 trang chính:**

1. **Trang Tổng quan (Overview):** KPI cards (6 chỉ số), biểu đồ lượt khách, công suất theo khu vực, so sánh cùng kỳ, sự kiện sắp tới, phản ánh gần đây.
2. **Trang Lượt khách (Visitors):** Biểu đồ theo tháng/tuần/30 ngày, so sánh năm trước, top 6 quốc gia nguồn khách, bảng chi tiết.
3. **Trang Lưu trú (Accommodation):** GaugeChart công suất 6 quận (Hoàn Kiếm, Ba Đình, Tây Hồ, Đống Đa, Cầu Giấy, Long Biên), bảng cảnh báo, khuyến nghị.
4. **Trang Phản ánh (Feedback):** Phân tích sentiment (tích cực/trung lập/tiêu cực), biểu đồ theo chủ đề, danh sách phản ánh với filter, trend 30 ngày.
5. **Trang Bản đồ (Heatmap):** Viz Leaflet 10 điểm đến Hà Nội, mật độ thay đổi theo giờ, popup thông tin, tooltip.
6. **Trang Gợi ý (Recommendations):** Rule-based AI 4 loại cảnh báo (quá tải điểm đến, công suất lưu trú, phản ánh tiêu cực spike, sự kiện sắp có).
7. **Trang Báo cáo (Reports):** Xuất PDF tuần/tháng, preview nội dung, lịch sử xuất, điều khiển xuất hạn chế theo role.

**Tính năng bổ trợ:**

- **Xác thực & Phân quyền:** 2 cấp độ auth — Level 1 (localStorage), Level 2 (Supabase JWT + PostgreSQL).
- **Hệ thống xác thực Level 1:** 4 tài khoản demo (admin, giám đốc, cán bộ, viewer), phân quyền theo role.
- **Hệ thống xác thực Level 2:** JWT từ Supabase, bảng profiles PostgreSQL, auto-refresh token.
- **UI/UX:** Animations (fade-in, slide-left, scale-in), sidebar thu gọn, lazy loading, page transitions, responsive mobile.

### 8.2. Sản phẩm báo cáo & tài liệu

1. **Báo cáo khoa học** (tài liệu này).
2. **Tài liệu kỹ thuật:** BRANCHES.md (mô tả từng nhánh git), README.md.
3. **Hướng dẫn sử dụng:** Tài liệu deploy + config Supabase.
4. **Slide thuyết trình:** Keynote/PowerPoint.
5. **Video demo** (tùy chọn): 3–5 phút chạy qua các module.

### 8.3. Công nghệ sử dụng (Thực tế)

| Thành phần | Công nghệ | Phiên bản | Mục đích |
|---|---|---|---|
| **Frontend** | React.js | 18.3.1 | UI framework chính |
| | Vite | 5.4.10 | Bundler & dev server |
| | Tailwind CSS | 3.x | Styling |
| | Recharts | 2.13.0 | Biểu đồ (LineChart, BarChart, AreaChart, PieChart) |
| | React-Leaflet | 4.x | Map integration |
| | Leaflet | 1.9.4 | Open Street Map |
| | Lucide React | 0.x | Icons |
| | jsPDF | 2.5.2 | Xuất báo cáo PDF |
| | html2canvas | 1.x | Capture HTML → image (PDF) |
| | React Router | 6.x | Client-side routing |
| **Backend** | Supabase (BaaS) | v1 | Auth + Database host |
| | PostgreSQL | 15+ | Database (Supabase managed) |
| **Xác thực** | @supabase/supabase-js | 2.x | Client SDK |
| | JWT | - | Token management |
| **Deploy** | Vercel | - | Hosting |
| **VCS** | GitHub | - | Code repository |
| **Build Tools** | npm | 10+ | Package manager |

**Kiến trúc:**
- **Frontend-only (Level 1):** React + localStorage, không cần backend.
- **Frontend + BaaS (Level 2):** React + Supabase (PostgreSQL + JWT), sẵn sàng production.

### 8.4. Dữ liệu & Mô phỏng

**Tính toán dữ liệu:**
- **Năm hiện tại:** 2026 (Q1 thực tế: T1–T3, T4–T12 dự báo)
- **Năm trước:** 2025 (dùng để so sánh cùng kỳ)
- **Base khách:** 25M nội địa + 4M quốc tế = 29M/năm
- **Hệ số mùa:** [1.3, 1.4, 1.0, 1.2, 0.7, 0.6, 0.65, 0.6, 0.85, 1.25, 1.3, 1.35]
- **Điểm đến:** 10 địa điểm (Hồ Hoàn Kiếm, Văn Miếu, Lăng Chủ tịch, Thăng Long, Chùa Một Cột, Chùa Trấn Quốc, Phố đi bộ HG, Bát Tràng, Hồ Tây, Nhà thờ Lớn)
- **Quận/Huyện:** 6 khu vực lưu trú

---

## 9. KẾT QUẢ ĐẠT ĐƯỢC

### 9.1. Sản phẩm đã hoàn thành

✅ **Sprint 1–5: Xây dựng core dashboard**
- 7 trang module chính, đầy đủ biểu đồ & bảng dữ liệu
- Dữ liệu mô phỏng thực tế với hệ số mùa vụ
- UI/UX chuyên nghiệp, responsive, animations mượt
- Chức năng xuất báo cáo PDF tuần/tháng

✅ **Branch feature/auth-level1: Xác thực Level 1**
- 4 tài khoản demo (admin, giám đốc, cán bộ, viewer)
- 3 vai trò với quyền hạn rõ ràng (admin toàn quyền, staff xem + phản ánh, viewer chỉ xem)
- LoginPage, ProtectedRoute, Header with user dropdown
- Lưu session trong localStorage

✅ **Branch feature/supabase-auth: Xác thực Level 2**
- Supabase Auth + PostgreSQL (bảng profiles)
- JWT token tự động quản lý
- Seed 4 users vào database
- Row Level Security settings
- Đã deploy lên Vercel (https://hanoi-tourism-dashboard.vercel.app)

✅ **Dữ liệu & Mô hình thời gian**
- 2026 = năm hiện tại (Q1 thực tế + T4–T12 dự báo)
- 2025 = năm trước (so sánh cùng kỳ)
- Hệ số mùa vụ thực tế Hà Nội
- 30 ngày gần nhất: tính realtime theo ngày hiện tại

### 9.2. So sánh kế hoạch vs thực tế

| Mục tiêu ban đầu | Thực hiện | Ghi chú |
|---|---|---|
| Dashboard 7 trang | ✅ Hoàn thành | Vượt kỳ vọng về UI/UX |
| Biểu đồ Recharts | ✅ + GaugeChart custom | Thêm SVG gauge cho công suất |
| Bản đồ Leaflet | ✅ Heatmap động | Thêm tính năng circle overlay & popup |
| Phân tích sentiment | ✅ Rule-based | Dữ liệu mô phỏng phân bố tỷ lệ |
| Xuất báo cáo PDF | ✅ jsPDF | Với styling chuyên nghiệp, table color-coded |
| Backend | Supabase (thay vì Flask) | BaaS hiệu quả hơn, bảo mật cao hơn |
| Database | PostgreSQL via Supabase | Production-ready thay vì SQLite |
| Auth | 2 cấp độ (localStorage + JWT) | Vượt kỳ vọng, có thể sử dụng thực tế |
| Deploy | Vercel | CI/CD tự động |

### 9.3. Các tính năng bổ sung (không nằm trong kế hoạch gốc)

1. **Hệ thống xác thực 2 cấp:** Level 1 (demo) + Level 2 (production).
2. **Cấu trúc Branch rõ ràng:** main (stable), feature/auth-level1, feature/supabase-auth.
3. **Tài liệu BRANCHES.md:** Mô tả chi tiết từng nhánh công việc.
4. **Code splitting:** Vite manualChunks giảm bundle size.
5. **Hot Module Replacement:** Dev experience tốt.
6. **Responsive mobile:** Không trong scope ban đầu nhưng đã implement.
7. **Git workflow:** Semantic commits, follow conventional commits.

### 9.4. Độ hoàn thành

| Phần | Hoàn thành | Mô tả |
|---|---|---|
| Core Features | 100% | 7 module + auth + export |
| UI/UX | 95% | Responsive, chỉ mobile chart chưa tối ưu |
| Dữ liệu | 100% | Mô phỏng realistic |
| Deploy | 100% | Live trên Vercel |
| Tài liệu | 80% | Báo cáo + BRANCHES.md, thiếu user guide chi tiết |
| Testing | 70% | Manual tests, chưa có unit tests |

---

## 10. NHỮNG HẠNG MỤC CÓ THỂ PHÁT TRIỂN TIẾP

1. **Mobile Optimization:** Chart responsive, landscape mode.
2. **Real-time Data:** WebSocket từ backend API thực.
3. **Advanced Analytics:** Machine Learning predictions, anomaly detection.
4. **Multi-language:** I18n cho tiếng Anh.
5. **Dark Mode:** Theme toggle.
6. **Export Excel:** Ngoài PDF còn có Excel.
7. **Integration APIs:** Kết nối với các hệ thống thống kê chính thức.

---

## 11. KẾT LUẬN

Dự án **Dashboard Điều hành Du lịch Hà Nộ** đã hoàn thành các mục tiêu chính:
- Xây dựng giao diện trực quan tập hợp 7 module du lịch,
- Cung cấp dữ liệu mô phỏng realistic theo quy luật thực tế,
- Hỗ trợ xuất báo cáo tự động,
- Triển khai hệ thống xác thực linh hoạt (2 cấp độ),
- Deploy sẵn sàng trên production (Vercel).

Sản phẩm không chỉ đạt được scope KHKT mà còn vượt kỳ vọng về kiến trúc (auth production-grade), UI/UX (animations, responsive), và vận hành (deploy tự động).

Dự án này có thể phục vụ như:
- **Demo KHKT:** Thuyết trình hội đồng với sản phẩm chạy thật.
- **Proof-of-Concept:** Cho Sở Du lịch Hà Nội nếu quan tâm.
- **Learning material:** Cho sinh viên về React, Supabase, Tailwind, PDF generation.

---

**Hết**
