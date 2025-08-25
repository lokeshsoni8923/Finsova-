// MUI Imports
'use client'
import Grid from '@mui/material/Grid2'

// Type Imports

// Component Imports
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'
import { SupportTicket } from '@/app/[lang]/(dashboard)/(private)/apps/finsova/support-tickt/page'



const SupportCrad = () => {
  return (
    <Grid container spacing={6}>
      {/* {data.map((item, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
          <HorizontalWithSubtitle {...item} />
        </Grid>
      ))} */}
    </Grid>
  )
}

export default SupportCrad
