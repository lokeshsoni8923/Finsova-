import { ReactElement } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FundRequestList from '@/views/apps/user/fundrequest'


const FundRequestPage = (): ReactElement => {

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' component='h1' sx={{ fontWeight: 'bold', mb: 3 }}>
        Financial / Wallet Request
      </Typography>
      <FundRequestList />
    </Box>
  )
}

export default FundRequestPage
