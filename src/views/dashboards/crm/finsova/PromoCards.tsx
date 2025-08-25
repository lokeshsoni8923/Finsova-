'use client'

import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { IconBolt } from '@tabler/icons-react'

const PromoCards = () => {
  return (
    <Grid container spacing={4}>
      {/* Promo 1: Apply for Instant Loan */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card
          sx={{
            borderRadius: 4,
            height: '100%',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Typography variant='h6' fontWeight={500}>
              Apply for Instant Loan
            </Typography>
            <Button
              variant='contained'
              size='medium'
              sx={{ mt: 3, textTransform: 'none' }}
            >
              Apply Now
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* Promo 2: Electricity Cashback */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card
          sx={{
            backgroundColor: '#E0F7FA',
            borderRadius: 4,
            height: '100%',
            p: 3
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Box display='flex' alignItems='center' gap={2}>
              <IconBolt size={32} stroke={1.5} />
              <Box>
                <Typography variant='body1' fontWeight={500}>
                  Get 5% Cashback
                </Typography>
                <Typography variant='body2'>on Electricity Bills</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PromoCards
