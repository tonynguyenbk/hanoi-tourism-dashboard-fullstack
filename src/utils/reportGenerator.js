import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { formatDate, formatVisitors } from './formatters'

/**
 * reportGenerator.js — Xuất báo cáo PDF chuyên nghiệp
 * Dùng jsPDF + jsPDF-AutoTable
 */

// ─── Helpers vẽ PDF ──────────────────────────────────────────────────────────

/** Vẽ header trang nhất quán */
function drawHeader(doc, title, subtitle) {
  // Dải màu header
  doc.setFillColor(27, 79, 114)
  doc.rect(0, 0, 210, 28, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('SỞ DU LỊCH HÀ NỘI', 105, 10, { align: 'center' })

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text(title, 105, 18, { align: 'center' })

  doc.setFontSize(8)
  doc.setTextColor(180, 210, 240)
  doc.text(subtitle, 105, 24, { align: 'center' })

  // Reset màu chữ
  doc.setTextColor(30, 30, 30)
}

/** Vẽ tiêu đề section */
function drawSection(doc, text, y) {
  doc.setFillColor(230, 240, 250)
  doc.rect(14, y - 4, 182, 8, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(27, 79, 114)
  doc.text(text, 16, y + 0.5)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(30, 30, 30)
  return y + 8
}

/** Footer trang */
function drawFooter(doc, pageNum) {
  const totalPages = doc.getNumberOfPages()
  doc.setFontSize(7)
  doc.setTextColor(160)
  doc.text(
    `Tài liệu được tạo tự động bởi Hệ thống Dashboard Du lịch Hà Nội  |  Trang ${pageNum}/${totalPages}`,
    105, 290, { align: 'center' }
  )
  doc.setDrawColor(200)
  doc.line(14, 285, 196, 285)
}

// ─── Báo cáo tuần ────────────────────────────────────────────────────────────

/**
 * Xuất báo cáo tuần (tóm tắt 7 ngày)
 * @param {Object} data  — { totalVisitors, domesticVisitors, internationalVisitors,
 *                          avgOccupancy, totalFeedbacks, positivePct, negativePct,
 *                          weekLabel, alerts }
 */
export function exportWeeklyReport(data) {
  const doc   = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const today = formatDate(new Date())
  const week  = data.weekLabel || 'Tuần hiện tại'

  drawHeader(doc, 'BÁO CÁO HOẠT ĐỘNG DU LỊCH TUẦN', `Kỳ báo cáo: ${week}  |  Ngày xuất: ${today}`)

  let y = 35

  // I. KPI tổng hợp
  y = drawSection(doc, 'I. CHỈ SỐ TỔNG HỢP', y)
  autoTable(doc, {
    startY: y,
    head: [['Chỉ số', 'Giá trị', 'So tuần trước']],
    body: [
      ['Tổng lượt khách',       formatVisitors(data.totalVisitors || 0),         data.visitorChange ? `${data.visitorChange > 0 ? '+' : ''}${data.visitorChange}%` : '—'],
      ['Khách nội địa',         formatVisitors(data.domesticVisitors || 0),      '—'],
      ['Khách quốc tế',         formatVisitors(data.internationalVisitors || 0), '—'],
      ['Công suất lưu trú TB',  `${data.avgOccupancy || 0}%`,                    data.occupancyChange ? `${data.occupancyChange > 0 ? '+' : ''}${data.occupancyChange}%` : '—'],
      ['Phản ánh tiếp nhận',    String(data.totalFeedbacks || 0),                '—'],
      ['Tỷ lệ tích cực',        `${data.positivePct || 60}%`,                    '—'],
      ['Tỷ lệ tiêu cực',        `${data.negativePct || 15}%`,                    '—'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [27, 79, 114], textColor: 255, fontSize: 9, fontStyle: 'bold' },
    bodyStyles: { fontSize: 9 },
    alternateRowStyles: { fillColor: [245, 248, 255] },
    columnStyles: { 2: { halign: 'center' } },
    margin: { left: 14, right: 14 },
  })

  y = doc.lastAutoTable.finalY + 8

  // II. Cảnh báo trong tuần
  y = drawSection(doc, 'II. CẢNH BÁO & SỰ CỐ TRONG TUẦN', y)
  const alerts = data.alerts || [
    ['Phố đi bộ Hồ Gươm', '97%', 'Quá tải — Đã bố trí thêm nhân lực'],
    ['Nhà thờ Lớn HN',    '88%', 'Cảnh báo — Theo dõi sát'],
    ['Hoàn Kiếm (lưu trú)', '92%', 'Cảnh báo — Điều phối phòng khu lân cận'],
  ]
  autoTable(doc, {
    startY: y,
    head: [['Địa điểm / Khu vực', 'Mức độ', 'Biện pháp xử lý']],
    body: alerts,
    theme: 'striped',
    headStyles: { fillColor: [27, 79, 114], textColor: 255, fontSize: 9 },
    bodyStyles: { fontSize: 9 },
    columnStyles: { 1: { halign: 'center', fontStyle: 'bold' } },
    margin: { left: 14, right: 14 },
  })

  y = doc.lastAutoTable.finalY + 8

  // III. Nhận xét tự động
  if (y < 250) {
    y = drawSection(doc, 'III. NHẬN XÉT & KIẾN NGHỊ', y)
    doc.setFontSize(9)
    doc.setTextColor(50)
    const comments = [
      `• Lượt khách ${week} ước tính ${formatVisitors(data.totalVisitors || 0)}, tập trung tại khu vực Hoàn Kiếm và Ba Đình.`,
      `• Công suất lưu trú trung bình ${data.avgOccupancy || 0}% — ${(data.avgOccupancy || 0) >= 85 ? 'cần theo dõi sát, nguy cơ thiếu phòng dịp cuối tuần.' : 'ở mức kiểm soát tốt.'}`,
      `• Tỷ lệ phản ánh tiêu cực ${data.negativePct || 15}% — ${(data.negativePct || 15) > 20 ? 'vượt mức bình thường, đề nghị kiểm tra chất lượng dịch vụ.' : 'trong ngưỡng cho phép.'}`,
      `• Kiến nghị: Tăng cường tần suất kiểm tra vệ sinh tại các điểm đến đông khách.`,
    ]
    comments.forEach((line, i) => {
      doc.text(line, 16, y + i * 6, { maxWidth: 178 })
    })
  }

  drawFooter(doc, 1)
  doc.save(`bao-cao-tuan-${today.replace(/\//g, '-')}.pdf`)
}

// ─── Báo cáo tháng ───────────────────────────────────────────────────────────

/**
 * Xuất báo cáo tháng (chi tiết)
 * @param {Object} data        — Dữ liệu KPI tháng
 * @param {Array}  districtRows — Bảng công suất theo khu vực
 * @param {Array}  visitorRows  — Bảng lượt khách theo tuần
 * @param {Array}  feedbackRows — Bảng phân tích phản ánh
 */
export function exportMonthlyReport(data, districtRows = [], visitorRows = [], feedbackRows = []) {
  const doc   = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const today = formatDate(new Date())
  const month = data.monthLabel || 'Tháng hiện tại'

  drawHeader(doc, 'BÁO CÁO HOẠT ĐỘNG DU LỊCH THÁNG', `Kỳ báo cáo: ${month}  |  Ngày xuất: ${today}`)

  let y = 35

  // I. KPI tháng so với tháng trước
  y = drawSection(doc, 'I. CHỈ SỐ TỔNG HỢP THÁNG', y)
  autoTable(doc, {
    startY: y,
    head: [['Chỉ số', 'Tháng này', 'Tháng trước', 'Thay đổi']],
    body: [
      ['Tổng lượt khách',       formatVisitors(Math.round(data.totalVisitors || 0)),    formatVisitors(Math.round(data.prevTotalVisitors || 0)),    data.growthRate || '—'],
      ['Khách nội địa',         formatVisitors(Math.round((data.totalVisitors||0)*0.89)), formatVisitors(Math.round((data.prevTotalVisitors||0)*0.89)), '—'],
      ['Khách quốc tế',         formatVisitors(Math.round((data.totalVisitors||0)*0.11)), formatVisitors(Math.round((data.prevTotalVisitors||0)*0.11)), '—'],
      ['Công suất lưu trú TB',  `${data.avgOccupancy || 0}%`,                           `${data.prevOccupancy || 0}%`,                              `${(data.avgOccupancy||0) - (data.prevOccupancy||0) > 0 ? '+' : ''}${(data.avgOccupancy||0) - (data.prevOccupancy||0)}%`],
      ['Tổng phản ánh',         String(data.totalFeedbacks || 0),                       String(data.prevFeedbacks || 0),                            '—'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [27, 79, 114], textColor: 255, fontSize: 9, fontStyle: 'bold' },
    bodyStyles: { fontSize: 9 },
    alternateRowStyles: { fillColor: [245, 248, 255] },
    columnStyles: { 1: { halign: 'right' }, 2: { halign: 'right' }, 3: { halign: 'center', fontStyle: 'bold' } },
    margin: { left: 14, right: 14 },
  })

  y = doc.lastAutoTable.finalY + 8

  // II. Công suất lưu trú theo khu vực
  y = drawSection(doc, 'II. CÔNG SUẤT LƯU TRÚ THEO KHU VỰC', y)
  const dRows = districtRows.length > 0 ? districtRows : [
    ['Hoàn Kiếm', '92%', '8.500', 'Nguy hiểm'],
    ['Tây Hồ',    '88%', '6.800', 'Cảnh báo'],
    ['Ba Đình',   '76%', '5.200', 'Bình thường'],
    ['Đống Đa',   '65%', '4.200', 'Bình thường'],
    ['Cầu Giấy',  '58%', '3.800', 'Bình thường'],
    ['Long Biên', '45%', '2.800', 'Bình thường'],
  ]
  autoTable(doc, {
    startY: y,
    head: [['Khu vực', 'Công suất', 'Tổng phòng', 'Mức độ']],
    body: dRows,
    theme: 'striped',
    headStyles: { fillColor: [27, 79, 114], textColor: 255, fontSize: 9 },
    bodyStyles: { fontSize: 9 },
    columnStyles: {
      1: { halign: 'center', fontStyle: 'bold' },
      2: { halign: 'right' },
      3: { halign: 'center' },
    },
    didParseCell: (hookData) => {
      // Tô màu cột mức độ
      if (hookData.column.index === 3 && hookData.section === 'body') {
        const val = hookData.cell.text[0]
        if (val === 'Nguy hiểm') hookData.cell.styles.textColor = [192, 57, 43]
        else if (val === 'Cảnh báo') hookData.cell.styles.textColor = [175, 96, 26]
        else hookData.cell.styles.textColor = [39, 174, 96]
        hookData.cell.styles.fontStyle = 'bold'
      }
    },
    margin: { left: 14, right: 14 },
  })

  y = doc.lastAutoTable.finalY + 8

  // III. Phân tích phản ánh
  y = drawSection(doc, 'III. PHÂN TÍCH PHẢN ÁNH DU KHÁCH', y)
  const fbRows = feedbackRows.length > 0 ? feedbackRows : [
    ['Dịch vụ',    '300', '210 (70%)', '25 (8%)'],
    ['Giá cả',     '260', '90 (35%)',  '95 (37%)'],
    ['Vệ sinh',    '195', '55 (28%)',  '80 (41%)'],
    ['Giao thông', '205', '70 (34%)',  '55 (27%)'],
    ['An ninh',    '170', '110 (65%)', '15 (9%)'],
    ['Khác',       '110', '85 (77%)',  '15 (14%)'],
  ]
  autoTable(doc, {
    startY: y,
    head: [['Chủ đề', 'Tổng', 'Tích cực', 'Tiêu cực']],
    body: fbRows,
    theme: 'grid',
    headStyles: { fillColor: [27, 79, 114], textColor: 255, fontSize: 9 },
    bodyStyles: { fontSize: 9 },
    columnStyles: { 1: { halign: 'center' }, 2: { halign: 'center' }, 3: { halign: 'center' } },
    margin: { left: 14, right: 14 },
  })

  y = doc.lastAutoTable.finalY + 8

  // IV. Kiến nghị (nếu còn đủ chỗ)
  if (y < 260) {
    y = drawSection(doc, 'IV. KIẾN NGHỊ THÁNG TỚI', y)
    doc.setFontSize(9)
    doc.setTextColor(50)
    const kienghi = [
      `• Tập trung cải thiện chỉ số Giá cả và Vệ sinh — 2 chủ đề có tỷ lệ tiêu cực cao nhất.`,
      `• Xây dựng phương án điều tiết lưu trú tại Hoàn Kiếm và Tây Hồ trước mùa hè.`,
      `• Tăng cường quảng bá các điểm đến ít đông như Bát Tràng, Hồ Tây để phân tán lượng khách.`,
      `• Chuẩn bị kế hoạch nhân lực cho các sự kiện lớn dự kiến trong tháng tới.`,
    ]
    kienghi.forEach((line, i) => {
      doc.text(line, 16, y + i * 6, { maxWidth: 178 })
    })
  }

  // Thêm số trang cho tất cả các trang
  const totalPages = doc.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    drawFooter(doc, i)
  }

  doc.save(`bao-cao-thang-${today.replace(/\//g, '-')}.pdf`)
}
