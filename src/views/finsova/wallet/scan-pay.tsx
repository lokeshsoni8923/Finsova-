'use client'

import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { IconScan, IconCash } from '@tabler/icons-react'
import { useState } from 'react'

const ScanPayPage = () => {
  const [upiId, setUpiId] = useState('')
  const [amount, setAmount] = useState('')

  const handlePay = () => {
    if (!upiId || !amount || isNaN(Number(amount))) {
      alert('Please enter valid UPI ID and amount')
      return
    }

    alert(`₹${amount} paid to ${upiId}`)
    setUpiId('')
    setAmount('')
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Card sx={{ borderRadius: 4, p: 4, boxShadow: 3 }}>
          <CardContent>
            <Typography variant='h6' mb={4}>
              Scan & Pay
            </Typography>

            {/* Mock QR Scanner Area */}
            <Card
              sx={{
                height: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed #ccc',
                borderRadius: 2,
                mb: 4,
                backgroundColor: '#fafafa'
              }}
            >
              <Stack alignItems='center'>
                <IconScan size={48} />
                <Typography variant='caption'>QR Code Scanner (Simulated)</Typography>
              </Stack>
            </Card>

            <Stack spacing={4}>
              <TextField
                label='Scanned UPI ID / Enter UPI ID'
                variant='outlined'
                fullWidth
                value={upiId}
                onChange={e => setUpiId(e.target.value)}
              />
              <TextField
                label='Amount (₹)'
                type='number'
                variant='outlined'
                fullWidth
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
              <Button
                variant='contained'
                endIcon={<IconCash size={20} />}
                onClick={handlePay}
              >
                Pay Now
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ScanPayPage
