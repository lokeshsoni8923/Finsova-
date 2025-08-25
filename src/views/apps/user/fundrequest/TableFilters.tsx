// React Imports
'use client'
import { useState, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import MenuItem from '@mui/material/MenuItem'

// Type Imports
import type { UsersType } from '@/types/apps/userTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const TableFilters = ({ setData, tableData }: { setData: (data: UsersType[]) => void; tableData?: UsersType[] }) => {
  // States
  const [role, setRole] = useState<UsersType['role']>('')
  const [plan, setPlan] = useState<UsersType['currentPlan']>('')
  const [status, setStatus] = useState<UsersType['status']>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    const filteredData = tableData?.filter(user => {
      if (role && user.role !== role) return false
      if (plan && user.currentPlan !== plan) return false
      if (status && user.status !== status) return false
      if (searchTerm && !user.name?.toLowerCase().includes(searchTerm.toLowerCase())) return false

      return true
    })

    setData(filteredData || [])
  }, [role, plan, status, searchTerm, tableData, setData])

  return (
    <CardContent>
      <Grid container spacing={6}>
        
        <Grid size={{ xs: 12 }}>
          <CustomTextField
            fullWidth
            id='search-field'
            label='Search'
            placeholder='Search...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            sx={{ maxWidth: '400px' }}
          />
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
