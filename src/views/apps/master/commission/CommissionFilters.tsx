'use client'

import { useState, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import { CommissionType } from '.'

const CommissionFilters = ({
  setData,
  tableData
}: {
  setData: (data: CommissionType[]) => void
  tableData?: CommissionType[]
}) => {
  // States
  const [service, setService] = useState<CommissionType['service']>('')
  const [status, setStatus] = useState<'active' | 'inactive' | ''>('')

  useEffect(() => {
    const filteredData = tableData?.filter(item => {
      if (service && item.service !== service) return false
      return true
    })

    setData(filteredData || [])
  }, [service, status, tableData, setData])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomTextField
            select
            fullWidth
            id='select-service'
            value={service}
            onChange={e => setService(e.target.value as CommissionType['service'])}
            slotProps={{
              select: { displayEmpty: true }
            }}
          >
            <MenuItem value=''>Select Service</MenuItem>
            <MenuItem value='recharge'>Recharge</MenuItem>
            <MenuItem value='bill-payment'>Bill Payment</MenuItem>
            <MenuItem value='money-transfer'>Money Transfer</MenuItem>
            {/* You can extend these options dynamically from backend if needed */}
          </CustomTextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomTextField
            select
            fullWidth
            id='select-status'
            value={status}
            onChange={e => setStatus(e.target.value as '' | 'active' | 'inactive')}
            slotProps={{
              select: { displayEmpty: true }
            }}
          >
            <MenuItem value=''>Select Status</MenuItem>
            <MenuItem value='active'>Active</MenuItem>
            <MenuItem value='inactive'>Inactive</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default CommissionFilters
