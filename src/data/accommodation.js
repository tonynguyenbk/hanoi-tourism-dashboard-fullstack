/**
 * Dữ liệu công suất lưu trú theo khu vực Hà Nội
 * Tham chiếu: ~3,800 cơ sở, ~70,000 phòng, công suất TB 65-72%
 */
export const ACCOMMODATION_DATA = [
  {
    district: 'Hoàn Kiếm',
    capacity: 92,   // % lấp đầy — CẢnh báo đỏ
    hotels3to5star: 45,
    homestay: 120,
    guesthouse: 80,
    totalRooms: 8500,
  },
  {
    district: 'Ba Đình',
    capacity: 76,
    hotels3to5star: 30,
    homestay: 60,
    guesthouse: 45,
    totalRooms: 5200,
  },
  {
    district: 'Tây Hồ',
    capacity: 88,   // Cảnh báo vàng
    hotels3to5star: 25,
    homestay: 200,
    guesthouse: 90,
    totalRooms: 6800,
  },
  {
    district: 'Đống Đa',
    capacity: 65,
    hotels3to5star: 20,
    homestay: 80,
    guesthouse: 110,
    totalRooms: 4200,
  },
  {
    district: 'Cầu Giấy',
    capacity: 58,
    hotels3to5star: 15,
    homestay: 50,
    guesthouse: 70,
    totalRooms: 3800,
  },
  {
    district: 'Long Biên',
    capacity: 45,
    hotels3to5star: 8,
    homestay: 40,
    guesthouse: 55,
    totalRooms: 2800,
  },
]

// Dữ liệu xu hướng công suất theo tháng (dùng cho line chart)
export const CAPACITY_TREND = [
  { month: 'T1', 'Toàn thành phố': 78 },
  { month: 'T2', 'Toàn thành phố': 82 },
  { month: 'T3', 'Toàn thành phố': 68 },
  { month: 'T4', 'Toàn thành phố': 75 },
  { month: 'T5', 'Toàn thành phố': 55 },
  { month: 'T6', 'Toàn thành phố': 50 },
  { month: 'T7', 'Toàn thành phố': 52 },
  { month: 'T8', 'Toàn thành phố': 48 },
  { month: 'T9', 'Toàn thành phố': 63 },
  { month: 'T10', 'Toàn thành phố': 80 },
  { month: 'T11', 'Toàn thành phố': 85 },
  { month: 'T12', 'Toàn thành phố': 90 },
]
