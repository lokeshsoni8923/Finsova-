'use client'
import { useState, useEffect } from 'react'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@core/components/mui/TextField'
import { ServiceProviderType } from '.'

const ServiceProviderTableFilters = ({
  setData,
  tableData
}: {
  setData: (data: ServiceProviderType[]) => void
  tableData?: ServiceProviderType[]
}) => {
  // States
  const [serviceType, setServiceType] = useState<string>('')
  const [operatorCode, setOperatorCode] = useState<string>('')
  const [status, setStatus] = useState<ServiceProviderType['status']>('Active')

  // Filter data when any filter changes
  useEffect(() => {
    const filteredData = tableData?.filter(provider => {
      if (serviceType && !provider.serviceType.toLowerCase().includes(serviceType.toLowerCase())) return false
      if (operatorCode && provider.operatorCode !== operatorCode) return false
      if (status && provider.status !== status) return false

      return true
    })

    setData(filteredData || [])
  }, [serviceType, operatorCode, status, tableData, setData])

  // Get unique operator codes for dropdown
  const uniqueOperatorCodes = Array.from(new Set(tableData?.map(provider => provider.operatorCode) || []))

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            fullWidth
            id='filter-service-type'
            value={serviceType}
            onChange={e => setServiceType(e.target.value)}
            placeholder='Filter by Service Type'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            select
            fullWidth
            id='select-operator-code'
            value={operatorCode}
            onChange={e => setOperatorCode(e.target.value)}
            slotProps={{
              select: { displayEmpty: true }
            }}
          >
            <MenuItem value=''>All Operator Codes</MenuItem>
            {uniqueOperatorCodes.map(code => (
              <MenuItem key={code} value={code}>
                {code}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            select
            fullWidth
            id='select-status'
            value={status}
            onChange={e => setStatus(e.target.value as ServiceProviderType['status'])}
            slotProps={{
              select: { displayEmpty: true }
            }}
          >
            <MenuItem value=''>All Statuses</MenuItem>
            <MenuItem value='Active'>Active</MenuItem>
            <MenuItem value='Inactive'>Inactive</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default ServiceProviderTableFilters
