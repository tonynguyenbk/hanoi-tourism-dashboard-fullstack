# GHI CHÚ THUYẾT TRÌNH
## Dashboard Điều hành Du lịch Hà Nội

> Đây là ghi chú chi tiết cho từng slide — dùng để luyện thuyết trình.
> Mỗi phần tương ứng với một slide trong file slide-content.md

---

### Slide 1 — Trang bìa
*[Chào hội đồng, giới thiệu bản thân và đề tài]*

"Kính chào Hội đồng, em xin trình bày dự án KHKT: Dashboard Điều hành Du lịch Hà Nội — một hệ thống phần mềm hỗ trợ cơ quan quản lý du lịch giám sát, phân tích và ra quyết định dựa trên dữ liệu."

---

### Slide 2 — Vấn đề đặt ra
*[Giải thích tại sao dự án cần thiết]*

"Hà Nội đón khoảng 29 triệu lượt khách mỗi năm — con số rất lớn, nhưng việc quản lý hiện nay còn rất thủ công. Cán bộ Sở phải tổng hợp báo cáo từ nhiều nguồn Excel khác nhau, mất nhiều giờ mỗi tuần. Khi một điểm đến như Phố đi bộ Hồ Gươm quá tải, thông tin thường chỉ được biết sau khi sự việc đã xảy ra. Dự án này nhằm giải quyết đúng bài toán đó."

---

### Slide 3 — Mục tiêu
*[Đọc rõ từng mục tiêu, nhấn mạnh tính toàn diện]*

"Dự án có 6 mục tiêu cụ thể, bao phủ toàn bộ vòng đời quản lý du lịch: từ theo dõi lượt khách, giám sát lưu trú, đến phân tích phản ánh và xuất báo cáo tự động. Điểm đặc biệt là tất cả 6 mục tiêu này đều được tích hợp vào một giao diện duy nhất."

---

### Slide 4 — Giải pháp tổng quan
*[Giải thích kiến trúc theo luồng từ trên xuống]*

"Kiến trúc hệ thống gồm 3 lớp chính. Lớp dữ liệu: dùng Data Simulation với hệ số mùa vụ thực tế. Lớp ứng dụng: React với 7 module. Lớp hạ tầng: Supabase cho database và xác thực, Vercel cho hosting. Người dùng có thể truy cập từ máy tính hoặc điện thoại."

---

### Slide 5 — Công nghệ
*[Giải thích lý do chọn từng công nghệ]*

"Em chọn React vì đây là framework phổ biến nhất hiện nay, phù hợp xây dựng ứng dụng đơn trang phức tạp. Recharts và Leaflet là các thư viện biểu đồ và bản đồ chuyên biệt cho React. Supabase là lựa chọn thực tế vì cung cấp database PostgreSQL và xác thực JWT mà không cần tự xây dựng backend — tiết kiệm thời gian và bảo mật cao hơn."

---

### Slide 6 — 7 Module
*[Demo nhanh từng module nếu có máy tính]*

"Dashboard có 7 module chính. Em sẽ demo trực tiếp trên sản phẩm thật để hội đồng thấy rõ hơn."
*[Mở trình duyệt, vào https://hanoi-tourism-dashboard.vercel.app]*

---

### Slide 7 — Dữ liệu & Mô hình thời gian
*[Giải thích cách xử lý dữ liệu]*

"Một điểm quan trọng trong dự án là mô hình dữ liệu thời gian. Thay vì dùng số liệu cũ từ 2024 hay 2025, hệ thống mô phỏng theo mô hình thực tế: 2025 là năm trước để so sánh, 2026 là năm hiện tại với Q1 đã có số liệu thực tế và T4 đến T12 là dự báo. Đây chính xác là cách các hệ thống điều hành thực tế vận hành."

---

### Slide 8 — Công thức tính lượt khách
*[Giải thích cơ sở khoa học — quan trọng khi hội đồng hỏi]*

"Công thức tính lượt khách sử dụng mô hình Multiplicative Decomposition — phương pháp chuẩn của WTO trong thống kê du lịch. Công thức gồm 3 thành phần nhân với nhau: baseline tháng (lấy từ số liệu VNAT), hệ số mùa vụ, và jitter tạo dao động tự nhiên.

Hệ số mùa vụ được thiết kế dựa trên quy luật thực tế của Hà Nội: tháng 2 Tết là cao nhất với hệ số 1.4, tháng 8 nóng nhất và ít khách nhất với hệ số 0.6. Quan trọng là tổng 12 hệ số chia cho 12 bằng 1.017 ≈ 1.0 — đúng theo chuẩn Seasonal Index, đảm bảo tổng năm không bị lệch."

---

### Slide 9 — Ngưỡng cảnh báo
*[Giải thích logic cảnh báo 2 màu]*

"Hệ thống dùng 2 ngưỡng cảnh báo cho mỗi loại chỉ số, tương tự như đèn giao thông: vàng là cảnh báo sớm, đỏ là nguy hiểm cần xử lý ngay. Ngưỡng 85%/95% cho lưu trú và 80%/95% cho điểm đến được thiết kế dựa trên thực tế quản lý — khi công suất đạt 85%, cần bắt đầu chuẩn bị; đến 95% thì phải hành động ngay."

---

### Slide 10 — Hệ thống gợi ý
*[Đây là điểm sáng tạo nhất — nhấn mạnh]*

"Đây là tính năng em tâm đắc nhất. Thay vì chỉ hiển thị số liệu, hệ thống tự động phân tích và đưa ra GỢI Ý HÀNH ĐỘNG cụ thể. Ví dụ: khi Phố đi bộ Hồ Gươm đạt 97% sức chứa, hệ thống không chỉ cảnh báo đỏ mà còn gợi ý điều hướng khách sang Hồ Hoàn Kiếm đang ở 78% — đây chính là điểm khác biệt so với các dashboard thông thường."

---

### Slide 11 — Phân tích phản ánh
*[Giải thích Sentiment Analysis]*

"Module phản ánh dùng kỹ thuật Sentiment Analysis — phân loại tự động phản ánh thành tích cực, trung lập, tiêu cực. Điều thú vị là hệ thống phát hiện được spike: khi tỷ lệ tiêu cực vượt 25% trong 2 ngày liên tiếp, sẽ tự động kích hoạt cảnh báo. Từ dữ liệu cũng thấy rõ Giá cả và Vệ sinh là 2 điểm yếu nhất cần cải thiện."

---

### Slide 12 — Xác thực & Phân quyền
*[Giải thích 2 cấp độ auth]*

"Hệ thống xác thực được thiết kế 2 cấp độ. Level 1 dùng localStorage — đủ để demo và thuyết trình. Level 2 dùng Supabase với JWT thật và PostgreSQL — đây là kiến trúc production-ready, tương đương các ứng dụng thương mại. Phân quyền 3 vai trò đảm bảo: giám đốc có thể xuất báo cáo, cán bộ có thể gửi phản ánh, còn viewer chỉ được xem."

---

### Slide 13 — Kết quả
*[Liệt kê nhanh, tự tin]*

"Dự án hoàn thành 100% 9 tính năng chính và vượt kỳ vọng ở 3 điểm: dùng Supabase thay vì SQLite đơn giản ban đầu, có auth production-grade thay vì chỉ demo, và có git branching strategy chuyên nghiệp với 3 branch rõ ràng."

---

### Slide 14 — Trước/Sau
*[So sánh tác động thực tế]*

"Bảng so sánh này cho thấy tác động cụ thể: báo cáo từ vài giờ xuống còn 1 click, phát hiện quá tải từ sau khi xảy ra thành cảnh báo sớm, thông tin từ rời rạc thành tập trung một màn hình."

---

### Slide 15 — Demo Live
*[Demo trực tiếp — quan trọng nhất]*

"Giờ em xin demo trực tiếp sản phẩm đang chạy thật."

*Thứ tự demo:*
1. Mở URL, đăng nhập bằng `admin/admin123`
2. Trang Tổng quan — chỉ vào KPI và cảnh báo
3. Trang Lượt khách — đổi filter tuần/tháng
4. Trang Bản đồ — kéo, zoom, click vào điểm
5. Trang Gợi ý — chỉ vào gợi ý điều hướng
6. Xuất thử báo cáo PDF
7. Đăng xuất, đăng nhập viewer → thấy nút xuất bị khóa

---

### Slide 16 — Hướng phát triển
*[Thể hiện tầm nhìn]*

"Hệ thống được thiết kế mở — sẵn sàng kết nối dữ liệu thật từ Sở Du lịch khi có API. Về dài hạn có thể tích hợp Machine Learning để dự báo, hoặc realtime WebSocket. Đây là nền tảng để phát triển thành sản phẩm thực tế."

---

### Slide 17 — Kết luận
*[Nhấn mạnh 3 điểm chính]*

"Dự án đạt được 3 điều quan trọng: Thứ nhất, giải quyết bài toán thực tế của ngành du lịch. Thứ hai, áp dụng công nghệ hiện đại ở mức độ production-ready. Thứ ba, kiến trúc mở — có thể triển khai thực tế ngay khi có dữ liệu thật."

---

### Slide 18 — Hỏi đáp
*[Chuẩn bị câu hỏi thường gặp]*

**Câu hỏi dự kiến:**

**H: Dữ liệu lấy từ đâu?**
→ "Dữ liệu mô phỏng dựa trên báo cáo VNAT và Sở Du lịch Hà Nội. Hệ số mùa vụ được thiết kế theo quy luật thực tế. Kiến trúc được thiết kế sẵn để kết nối dữ liệu thật khi có API."

**H: Hệ thống có dùng AI không?**
→ "Dự án dùng Rule-based AI — hệ thống chuyên gia dựa trên luật logic. Đây là mô hình phù hợp khi dữ liệu huấn luyện chưa đủ cho Machine Learning, nhưng kiến trúc sẵn sàng tích hợp ML về sau."

**H: Có thể triển khai thực tế không?**
→ "Hoàn toàn có thể. Sản phẩm đã deploy trên Vercel với auth JWT production-grade. Bước tiếp theo là kết nối API dữ liệu thật từ Sở Du lịch và bổ sung thêm nghiệp vụ theo yêu cầu thực tế."

**H: Tại sao chọn Supabase thay vì tự viết backend?**
→ "Supabase cung cấp PostgreSQL và JWT authentication production-ready, bảo mật cao hơn backend tự viết của học sinh. Đây là quyết định kỹ thuật đúng đắn: tập trung nguồn lực vào tính năng thay vì tái tạo cơ sở hạ tầng đã có."

---

*Chúc thuyết trình thành công!*
