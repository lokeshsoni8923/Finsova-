'use client'

import { useState } from 'react'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { IconCurrencyRupee, IconUserCircle } from '@tabler/icons-react'

const RequestMoney = () => {
  const [amount, setAmount] = useState('')
  const [upi, setUpi] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = () => {
    // Ideally, you'd validate and send API request here
    if (amount && upi) {
      setSuccess(true)
      setAmount('')
      setUpi('')
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Card sx={{ borderRadius: 4 }}>
          <CardContent>
            <Typography variant='h6' mb={2}>
              Request Money
            </Typography>

            <Stack spacing={4}>
              <TextField
                fullWidth
                label='Enter UPI ID or Mobile Number'
                placeholder='e.g., 98765xxxxx or someone@upi'
                value={upi}
                onChange={e => setUpi(e.target.value)}
                InputProps={{ startAdornment: <IconUserCircle size={20} style={{ marginRight: 8 }} /> }}
              />

              <TextField
                fullWidth
                type='number'
                label='Amount'
                placeholder='e.g., 1000'
                value={amount}
                onChange={e => setAmount(e.target.value)}
                InputProps={{ startAdornment: <IconCurrencyRupee size={20} style={{ marginRight: 8 }} /> }}
              />

              <Button variant='contained' onClick={handleSubmit} size='large'>
                Request Now
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Snackbar Notification */}
      <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity='success' sx={{ width: '100%' }}>
          Request sent successfully!
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default RequestMoney
