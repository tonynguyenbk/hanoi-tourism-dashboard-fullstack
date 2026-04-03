import { useState, useMemo } from 'react'

/**
 * useFilteredData — Hook lọc dữ liệu theo khoảng thời gian và điều kiện
 * @param {Array} data     — Mảng dữ liệu gốc
 * @param {string} dateKey — Tên field ngày trong data (mặc định 'date')
 */
export function useFilteredData(data = [], dateKey = 'date') {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate]     = useState('')
  const [filterField, setFilterField] = useState('')
  const [filterValue, setFilterValue] = useState('')

  const filteredData = useMemo(() => {
    let result = [...data]

    // Lọc theo khoảng thời gian
    if (startDate) {
      result = result.filter((item) => item[dateKey] >= startDate)
    }
    if (endDate) {
      result = result.filter((item) => item[dateKey] <= endDate)
    }

    // Lọc theo field cụ thể
    if (filterField && filterValue) {
      result = result.filter((item) =>
        String(item[filterField]).toLowerCase().includes(filterValue.toLowerCase())
      )
    }

    return result
  }, [data, dateKey, startDate, endDate, filterField, filterValue])

  return {
    filteredData,
    startDate, setStartDate,
    endDate,   setEndDate,
    filterField, setFilterField,
    filterValue, setFilterValue,
  }
}
