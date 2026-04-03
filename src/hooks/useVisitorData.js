import { useState, useMemo } from 'react'
import { VISITOR_DATA_2025, VISITOR_DATA_2024, VISITOR_KPI, VISITOR_COMPARISON } from '../data/visitors'

/**
 * useVisitorData — Custom hook cho Module 1: Theo dõi lượt khách
 * Cung cấp dữ liệu + bộ lọc (năm, loại khách)
 */
export function useVisitorData() {
  const [selectedYear, setSelectedYear] = useState(2025)
  const [viewType, setViewType] = useState('monthly') // 'monthly' | 'comparison'

  // Chọn dataset theo năm
  const rawData = useMemo(() => {
    return selectedYear === 2025 ? VISITOR_DATA_2025 : VISITOR_DATA_2024
  }, [selectedYear])

  return {
    data: rawData,
    comparisonData: VISITOR_COMPARISON,
    kpi: VISITOR_KPI,
    selectedYear,
    setSelectedYear,
    viewType,
    setViewType,
  }
}
