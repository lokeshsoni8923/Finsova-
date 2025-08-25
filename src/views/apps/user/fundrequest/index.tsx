'use client'

import Grid from '@mui/material/Grid2'
import FundRequestListTable from './FundRequestTable'
import { FundRequest } from '@/types/globalTypes'
import { useState } from 'react'



const FundRequestList = () => {
  const [fundRequestData, setFundRequestData] = useState<FundRequest[]>([])

  return (
    <Grid container spacing={6}>
     
      <Grid size={{ xs: 12 }}>
        <FundRequestListTable tableData={fundRequestData} />
      </Grid>
    </Grid>
  )
}

export default FundRequestList
