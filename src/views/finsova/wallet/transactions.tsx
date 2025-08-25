'use client'

import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import { IconArrowDownRight, IconArrowUpRight } from '@tabler/icons-react'

const transactions = [
  { type: 'credit', label: 'Wallet Top-up', amount: 2000, date: '06 Jul 2025, 2:45 PM' },
  { type: 'debit', label: 'Sent to UPI: 999xxxx999@ybl', amount: 500, date: '06 Jul 2025, 11:00 AM' },
  { type: 'debit', label: 'Scan & Pay at Store', amount: 220, date: '05 Jul 2025, 6:30 PM' },
  { type: 'credit', label: 'Cashback from Airtel Recharge', amount: 50, date: '04 Jul 2025, 1:15 PM' },
  { type: 'debit', label: 'Paid to Netflix', amount: 649, date: '03 Jul 2025, 9:00 PM' },
  { type: 'debit', label: 'Paid to Amazon', amount: 1800, date: '02 Jul 2025, 7:45 PM' }
]

const WalletTransactions = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Card sx={{ borderRadius: 4 }}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Wallet Transactions
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Stack spacing={3}>
              {transactions.map((txn, index) => (
                <Stack
                  key={index}
                  direction='row'
                  alignItems='center'
                  justifyContent='space-between'
                  spacing={2}
                  sx={{
                    p: 2,
                    border: '1px solid #eee',
                    borderRadius: 2,
                    backgroundColor: txn.type === 'credit' ? '#E8F5E9' : '#FFF3E0'
                  }}
                >
                  <Stack spacing={0.5}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                      {txn.type === 'credit' ? (
                        <IconArrowDownRight size={20} color='green' />
                      ) : (
                        <IconArrowUpRight size={20} color='red' />
                      )}
                      <Typography variant='subtitle2'>{txn.label}</Typography>
                    </Stack>
                    <Typography variant='caption' color='text.secondary'>
                      {txn.date}
                    </Typography>
                  </Stack>
                  <Typography
                    variant='subtitle1'
                    fontWeight={600}
                    color={txn.type === 'credit' ? 'green' : 'error'}
                  >
                    {txn.type === 'credit' ? '+' : '-'}₹{txn.amount}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default WalletTransactions
