// MUI Imports
import Grid from '@mui/material/Grid2'

// Type Imports
import type { UsersType } from '@/types/apps/userTypes'

// Component Imports
import UserListTable from './walletListTable'
import UserListCards from './walletListCards'

const WalletList = ({ userData }: { userData?: UsersType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <UserListCards />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <UserListTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default WalletList
