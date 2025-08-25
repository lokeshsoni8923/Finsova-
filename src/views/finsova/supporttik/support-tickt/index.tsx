// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import UserListTable from './SupportTicktTable'
import SupportCrad from './SupportTicktCards'
import { SupportTicket } from '@/app/[lang]/(dashboard)/(private)/apps/finsova/support-tickt/page'
 

const SupportTickt = ({ supprtTicketData }: { supprtTicketData?: SupportTicket[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
      <SupportCrad />  
      </Grid>
      <Grid size={{ xs: 12 }}>
        <UserListTable tableData={supprtTicketData} />
      </Grid>
    </Grid>
  )
}

export default SupportTickt
