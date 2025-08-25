// React Imports
'use client'
import { useState, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

// Type Imports
// Using a lightweight local row type to avoid tight coupling with table implementation
type WalletRow = {
  date?: string
  mobile?: string
  company?: string
  [key: string]: any
}

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const ProductFilters = ({ setData, tableData }: { setData: (data: WalletRow[]) => void; tableData?: WalletRow[] }) => {
  // States
  const [duration, setDuration] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (tableData) setData(tableData)
  }, [tableData, setData])

  const getStartDateForDuration = (value: string): Date | null => {
    const now = new Date()
    // Normalize to midnight for comparisons
    now.setHours(0, 0, 0, 0)
    const start = new Date(now)
    switch (value) {
      case 'today':
        return start
      case 'last7':
        start.setDate(start.getDate() - 6)
        return start
      case 'last30':
        start.setDate(start.getDate() - 29)
        return start
      default:
        return null
    }
  }

  const handleSearch = () => {
    if (!tableData) return
    const startDate = getStartDateForDuration(duration)

    const filtered = tableData.filter(row => {
      // Duration filter
      if (startDate) {
        const rowDate = row.date ? new Date(row.date) : null
        if (!rowDate || isNaN(rowDate.getTime())) return false
        const normalized = new Date(rowDate)
        normalized.setHours(0, 0, 0, 0)
        if (normalized < startDate) return false
      }

      // Query filter (mobile or company contains)
      if (query) {
        const lower = query.toLowerCase()
        const mobileHit = (row.mobile || '').toString().toLowerCase().includes(lower)
        const companyHit = (row.company || '').toString().toLowerCase().includes(lower)
        if (!mobileHit && !companyHit) return false
      }

      return true
    })

    setData(filtered)
  }

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 3 }}>
          <CustomTextField
            select
            fullWidth
            id='select-duration'
            value={duration}
            onChange={e => setDuration(e.target.value)}
            slotProps={{ select: { displayEmpty: true } }}
          >
            <MenuItem value=''>Duration</MenuItem>
            <MenuItem value='today'>Today</MenuItem>
            <MenuItem value='last7'>Last 7 Days</MenuItem>
            <MenuItem value='last30'>Last 30 Days</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <CustomTextField
            fullWidth
            id='search-mobile-company'
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='Order Id'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <CustomTextField
            select
            fullWidth
            id='select-status'
            value={duration}
            onChange={e => setDuration(e.target.value)}
            slotProps={{ select: { displayEmpty: true } }}
          >
            <MenuItem value=''>Status</MenuItem>
            <MenuItem value='today'>Today</MenuItem>
            <MenuItem value='last7'>Last 7 Days</MenuItem>
            <MenuItem value='last30'>Last 30 Days</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 2 }} className='flex items-center'>
          <Button fullWidth variant='contained' onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default ProductFilters
