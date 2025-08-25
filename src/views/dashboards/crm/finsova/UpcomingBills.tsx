'use client'

import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid2'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

const bills = [
  { name: 'HDFC Credit Card', amount: '₹5,200', dueDate: '07 July 2025', icon: 'credit-card', bgColor: '#E3F2FD' },
  { name: 'Electricity Bill', amount: '₹1,350', dueDate: '09 July 2025', icon: 'electricity', bgColor: '#FFF3E0' },
  { name: 'DTH Recharge', amount: '₹599', dueDate: '11 July 2025', icon: 'dth', bgColor: '#F3E5F5' },
  { name: 'Water Bill', amount: '₹230', dueDate: '13 July 2025', icon: 'water', bgColor: '#E8F5E9' },
  { name: 'Mobile Recharge', amount: '₹399', dueDate: '15 July 2025', icon: 'mobile', bgColor: '#F1F8E9' },
  { name: 'Airtel Fiber', amount: '₹1,199', dueDate: '17 July 2025', icon: 'wifi', bgColor: '#FFFDE7' },
  { name: 'Netflix', amount: '₹649', dueDate: '18 July 2025', icon: 'netflix', bgColor: '#FCE4EC' }
]

const UpcomingBills = () => {
  return (
    <Grid size={{ xs: 12 }}>
      <Card sx={{ borderRadius: 4 }}>
        <CardHeader
          title='Upcoming Bills'
          sx={{ pb: 0, pt: 4, px: 4 }}
          titleTypographyProps={{ fontWeight: 600, fontSize: '1.1rem' }}
        />
        <CardContent sx={{ pt: 3, pb: 5 }}>
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              px: 1,
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' }
            }}
          >
            {bills.map((bill, i) => (
              <Card
                key={i}
                sx={{
                  minWidth: { xs: '85%', sm: 'calc(33.33% - 16px)' },
                  scrollSnapAlign: 'start',
                  p: 4,
                  flexShrink: 0,
                  borderRadius: 6,
                  backgroundColor: bill.bgColor,
                  color: '#1A1A1A',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 6px 18px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <Stack direction='row' alignItems='center' spacing={3} mb={3}>
                  <Avatar
                    src={`/images/icons/${bill.icon}.png`}
                    sx={{
                      width: 56,
                      height: 56,
                      bgcolor: '#fff',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                    variant='rounded'
                  />
                  <Box>
                    <Typography variant='subtitle1' fontWeight={600} noWrap>
                      {bill.name}
                    </Typography>
                    <Typography variant='body2' color='#555'>
                      Due by {bill.dueDate}
                    </Typography>
                  </Box>
                </Stack>

                <Box>
                  <Typography
                    variant='h4'
                    fontWeight={700}
                    sx={{ color: '#1A1A1A', letterSpacing: '-0.5px' }}
                  >
                    {bill.amount}
                  </Typography>
                  <Typography variant='caption' sx={{ color: '#888' }}>
                    Estimated auto-debit
                  </Typography>
                </Box>
              </Card>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default UpcomingBills
