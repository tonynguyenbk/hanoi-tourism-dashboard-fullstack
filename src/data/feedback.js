import { seededRandom } from './generators'

/**
 * Dữ liệu phản ánh du khách
 * Tỷ lệ: 60% tích cực, 25% trung lập, 15% tiêu cực
 * Chủ đề: dịch vụ 30%, giá cả 20%, vệ sinh 15%, giao thông 15%, an ninh 10%, khác 10%
 */

export const TOPICS = ['Dịch vụ', 'Giá cả', 'Vệ sinh', 'Giao thông', 'An ninh', 'Khác']
export const SENTIMENTS = ['positive', 'neutral', 'negative']

// Phân phối sentiment
export const SENTIMENT_DISTRIBUTION = [
  { name: 'Tích cực', value: 60, color: '#27AE60' },
  { name: 'Trung lập', value: 25, color: '#F39C12' },
  { name: 'Tiêu cực',  value: 15, color: '#E74C3C' },
]

// Phân phối theo chủ đề
export const TOPIC_DISTRIBUTION = [
  { name: 'Dịch vụ',    value: 30, color: '#2E86C1' },
  { name: 'Giá cả',     value: 20, color: '#27AE60' },
  { name: 'Vệ sinh',    value: 15, color: '#F39C12' },
  { name: 'Giao thông', value: 15, color: '#E67E22' },
  { name: 'An ninh',    value: 10, color: '#9B59B6' },
  { name: 'Khác',       value: 10, color: '#95A5A6' },
]

// Dữ liệu xu hướng 30 ngày — có spike tiêu cực ngày 22-24 để demo cảnh báo
export const FEEDBACK_TREND = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1
  const r1 = seededRandom(day * 3)
  const r2 = seededRandom(day * 7)
  const total = Math.round(40 + r1 * 30)

  // Spike tiêu cực ngày 22-24 (mô phỏng sự cố)
  const isSpike = day >= 22 && day <= 24
  const negRate = isSpike ? 0.32 : (0.12 + r2 * 0.06)
  const negative = Math.round(total * negRate)
  const positive = Math.round(total * (isSpike ? 0.45 : 0.60))
  const neutral  = total - positive - negative

  return {
    ngay:        `${day}/3`,
    'Tích cực':  positive,
    'Trung lập': neutral < 0 ? 0 : neutral,
    'Tiêu cực':  negative,
    total,
    negPct: Math.round(negRate * 100),
  }
})

// Dữ liệu theo chủ đề × sentiment (dùng cho stacked bar)
export const TOPIC_SENTIMENT_DATA = [
  { topic: 'Dịch vụ',    'Tích cực': 210, 'Trung lập': 65,  'Tiêu cực': 25  },
  { topic: 'Giá cả',     'Tích cực': 90,  'Trung lập': 75,  'Tiêu cực': 95  },
  { topic: 'Vệ sinh',    'Tích cực': 55,  'Trung lập': 60,  'Tiêu cực': 80  },
  { topic: 'Giao thông', 'Tích cực': 70,  'Trung lập': 80,  'Tiêu cực': 55  },
  { topic: 'An ninh',    'Tích cực': 110, 'Trung lập': 45,  'Tiêu cực': 15  },
  { topic: 'Khác',       'Tích cực': 85,  'Trung lập': 40,  'Tiêu cực': 15  },
]

// Mẫu các phản ánh gần đây
export const RECENT_FEEDBACKS = [
  { id: 1,  time: '08:32', date: '03/04', topic: 'Dịch vụ',    sentiment: 'positive', location: 'Hồ Hoàn Kiếm',    content: 'Hướng dẫn viên rất nhiệt tình, cung cấp thông tin phong phú và thân thiện.' },
  { id: 2,  time: '09:15', date: '03/04', topic: 'Giá cả',     sentiment: 'negative', location: 'Phố Cổ',           content: 'Giá hàng ăn trong phố cổ quá cao so với chất lượng, đặc biệt vào cuối tuần.' },
  { id: 3,  time: '10:02', date: '03/04', topic: 'Vệ sinh',    sentiment: 'negative', location: 'Văn Miếu',         content: 'Nhà vệ sinh công cộng cần được dọn dẹp thường xuyên hơn, mùi không tốt.' },
  { id: 4,  time: '11:20', date: '03/04', topic: 'Giao thông', sentiment: 'neutral',  location: 'Ba Đình',          content: 'Bãi đỗ xe khá chật vào cuối tuần, cần thêm điểm gửi xe gần khu di tích.' },
  { id: 5,  time: '13:45', date: '03/04', topic: 'Dịch vụ',    sentiment: 'positive', location: 'Chùa Trấn Quốc',   content: 'Không gian yên tĩnh và đẹp, nhân viên phục vụ chu đáo, sẽ quay lại.' },
  { id: 6,  time: '14:30', date: '03/04', topic: 'An ninh',    sentiment: 'neutral',  location: 'Phố đi bộ',        content: 'Cần thêm nhân viên an ninh vào buổi tối cuối tuần để đảm bảo trật tự.' },
  { id: 7,  time: '15:10', date: '02/04', topic: 'Giá cả',     sentiment: 'negative', location: 'Bát Tràng',        content: 'Giá đồ gốm tại một số gian hàng cao hơn nhiều so với giá niêm yết, cần kiểm tra.' },
  { id: 8,  time: '16:45', date: '02/04', topic: 'Dịch vụ',    sentiment: 'positive', location: 'Hoàng thành',      content: 'App hướng dẫn tham quan rất hữu ích, thuyết minh tự động rõ ràng và đầy đủ.' },
  { id: 9,  time: '09:00', date: '02/04', topic: 'Vệ sinh',    sentiment: 'positive', location: 'Hồ Tây',           content: 'Khu vực xung quanh hồ sạch sẽ, nhiều thùng rác đặt hợp lý.' },
  { id: 10, time: '11:30', date: '01/04', topic: 'Giao thông', sentiment: 'negative', location: 'Hoàn Kiếm',       content: 'Tắc đường nghiêm trọng vào giờ cao điểm, xe khách dừng đỗ lộn xộn.' },
]

// Thống kê tổng hợp
export const FEEDBACK_STATS = {
  total:      1240,
  positive:   744,   // 60%
  neutral:    310,   // 25%
  negative:   186,   // 15%
  todayTotal: 68,
  todayNegPct: 17.6,
  avgPerDay:  41,
}
