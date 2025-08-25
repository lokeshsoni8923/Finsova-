'use client'

import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import { IconArrowRight } from '@tabler/icons-react'
import { useState } from 'react'

const AddMoneyPage = () => {
  const [amount, setAmount] = useState('')

  const handleAddMoney = () => {
    if (!amount || isNaN(Number(amount))) {
      alert('Please enter a valid amount')
      return
    }

    // Simulate API call
    console.log('Adding money:', amount)
    alert(`₹${amount} added to your wallet!`)
    setAmount('')
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Card
          sx={{
            borderRadius: 4,
            p: 4,
            boxShadow: 3
          }}
        >
          <CardContent>
            <Typography variant='h6' mb={4}>
              Add Money to Wallet
            </Typography>

            <Stack spacing={4}>
              <TextField
                fullWidth
                label='Enter Amount (₹)'
                variant='outlined'
                type='number'
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />

              <Button
                variant='contained'
                endIcon={<IconArrowRight size={20} />}
                onClick={handleAddMoney}
              >
                Proceed to Add Money
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AddMoneyPage
