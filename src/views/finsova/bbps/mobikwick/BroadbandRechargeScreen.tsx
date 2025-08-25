'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@core/components/mui/TextField'

import { fetchOperators, fetchCircles } from '../../../../app/api/bbps/mobikwick/recharge' // adjust import path if needed

type Operator = {
  operatorName: string
  opId: string | number
  id: number
  name?: string
}

type Circle = {
  circleId: number
  circleName: string
}

type BroadbandRechargeData = {
  customerId: string
  operatorId: number | null
  circleId: number | null
  amount: string
}

const initialData: BroadbandRechargeData = {
  customerId: '',
  operatorId: null,
  circleId: null,
  amount: '',
}

const BroadbandRechargeScreen = () => {
  const [formData, setFormData] = useState<BroadbandRechargeData>(initialData)
  const [operators, setOperators] = useState<Operator[]>([])
  const [circles, setCircles] = useState<Circle[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loadingOperators, setLoadingOperators] = useState(false)
  const [loadingCircles, setLoadingCircles] = useState(false)

  const handleFormChange = (field: keyof BroadbandRechargeData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoadingOperators(true)
      const opRes = await fetchOperators('Broadband') // Assuming your API supports 'Broadband' or similar category
      setLoadingOperators(false)
      if (opRes.success && opRes.data) setOperators(opRes.data)
      else setError('Failed to fetch operators')

      setLoadingCircles(true)
      const cirRes = await fetchCircles()
      setLoadingCircles(false)
      if (cirRes.success && cirRes.data) setCircles(cirRes.data)
      else setError('Failed to fetch circles')
    }
    fetchInitialData()
  }, [])

  const validateCustomerId = (id: string) => id.trim().length > 0
  const validateAmount = (amt: string) => /^\d+(\.\d{1,2})?$/.test(amt) && Number(amt) > 0

  const handleRecharge = () => {
    if (!validateCustomerId(formData.customerId)) {
      alert('Please enter a valid Customer ID / Account Number')
      return
    }
    if (!formData.operatorId) {
      alert('Please select your ISP Operator')
      return
    }
    if (!formData.circleId) {
      alert('Please select your Circle / Region')
      return
    }
    if (!validateAmount(formData.amount)) {
      alert('Please enter a valid amount')
      return
    }

    alert(
      `Recharging broadband account ${formData.customerId} with ₹${formData.amount} on operator ID ${formData.operatorId} in circle ID ${formData.circleId}`
    )
    // TODO: Connect recharge API here
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" mb={3} textAlign="left" fontWeight="bold">
          Broadband Recharge
        </Typography>

        {(loadingOperators || loadingCircles) && <Typography>Loading operators and circles...</Typography>}
        {error && <Typography color="error">{error}</Typography>}

        <form
          onSubmit={e => {
            e.preventDefault()
            handleRecharge()
          }}
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomTextField
                label="Customer ID / Account Number"
                value={formData.customerId}
                placeholder="Enter your customer ID"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('customerId', e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomTextField
                select
                label="ISP Operator"
                value={formData.operatorId ?? ''}
                onChange={e => handleFormChange('operatorId', Number(e.target.value))}
                fullWidth
              >
                <MenuItem value="">Select ISP Operator</MenuItem>
                {operators.map(op => (
                  <MenuItem key={op.id} value={op.opId}>
                    <img
                      src={`https://static.mobikwik.com/appdata/operator_icons/op${op.opId}.png`}
                      alt={op.operatorName}
                      style={{ width: 20, marginRight: 8, verticalAlign: 'middle' }}
                    />
                    {op.operatorName}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomTextField
                select
                label="Circle / Region"
                value={formData.circleId ?? ''}
                onChange={e => handleFormChange('circleId', Number(e.target.value))}
                fullWidth
              >
                <MenuItem value="">Select Circle / Region</MenuItem>
                {circles.map(c => (
                  <MenuItem key={c.circleId} value={c.circleId}>
                    {c.circleName}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomTextField
                label="Amount (₹)"
                value={formData.amount}
                placeholder="Enter amount"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('amount', e.target.value)}
                fullWidth
                type="number"
                inputProps={{ min: 1 }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }} className="flex justify-center mt-4">
              <Button variant="contained" color="primary" type="submit" size="large" disabled={loadingOperators || loadingCircles}>
                Recharge Now
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default BroadbandRechargeScreen
