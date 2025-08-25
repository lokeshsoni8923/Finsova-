'use client'

import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { IconSend } from '@tabler/icons-react'
import { useState } from 'react'

const SendMoneyPage = () => {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')

  const handleSendMoney = () => {
    if (!recipient || !amount || isNaN(Number(amount))) {
      alert('Please enter valid recipient and amount')
      return
    }

    // Simulate send
    console.log('Sending ₹' + amount + ' to ' + recipient)
    alert(`₹${amount} sent to ${recipient}`)
    setRecipient('')
    setAmount('')
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Card sx={{ borderRadius: 4, p: 4, boxShadow: 3 }}>
          <CardContent>
            <Typography variant='h6' mb={4}>
              Send Money
            </Typography>

            <Stack spacing={4}>
              <TextField
                label='Recipient Phone or UPI ID'
                variant='outlined'
                fullWidth
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
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
                endIcon={<IconSend size={20} />}
                onClick={handleSendMoney}
              >
                Send Money
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SendMoneyPage
