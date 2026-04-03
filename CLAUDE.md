# CLAUDE.md — Hướng dẫn cho Claude Code

## Dự án
Dashboard Điều hành Du lịch Hà Nội — sản phẩm KHKT cấp thành phố.
Đọc `PROJECT_BRIEF.md` để nắm đầy đủ yêu cầu, tính năng, dữ liệu, và cấu trúc dự án.

## Tech stack
- React (Vite) + Tailwind CSS
- Recharts (biểu đồ) + React-Leaflet (bản đồ)
- Lucide React (icons)
- jsPDF (xuất báo cáo)
- react-router-dom (routing)

## Quy tắc code
- Tất cả text giao diện bằng **tiếng Việt**
- Comment code bằng tiếng Việt để dễ hiểu cho học sinh
- Component dùng functional component + hooks
- Đặt file đúng cấu trúc thư mục trong PROJECT_BRIEF.md (mục 4)
- Mỗi component một file, export default

## Quy trình làm việc
1. Đọc PROJECT_BRIEF.md trước khi bắt đầu bất kỳ task nào
2. Hoàn thành từng module, test chạy được rồi mới sang module tiếp
3. Dữ liệu mô phỏng phải realistic theo hệ số mùa vụ trong PROJECT_BRIEF.md
4. Khi tạo file mới, thông báo đường dẫn rõ ràng

## Lệnh thường dùng
```bash
npm run dev      # Chạy dev server
npm run build    # Build production
```
