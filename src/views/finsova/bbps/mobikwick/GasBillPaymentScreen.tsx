'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@core/components/mui/TextField'

import { fetchOperators, fetchCircles } from '../../../../app/api/bbps/mobikwick/recharge'

type GasBillData = {
  consumerNumber: string
  operatorId: number | null
  circleId: number | null
  amount: string
}

type Operator = {
  opId: number
  operatorName: string
}

type Circle = {
  circleId: number
  circleName: string
}

const initialData: GasBillData = {
  consumerNumber: '',
  operatorId: null,
  circleId: null,
  amount: ''
}

const GasBillPaymentScreen = () => {
  const [formData, setFormData] = useState<GasBillData>(initialData)
  const [operators, setOperators] = useState<Operator[]>([])
  const [circles, setCircles] = useState<Circle[]>([])

  const handleFormChange = (field: keyof GasBillData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Fetch operators on mount
  useEffect(() => {
    const fetchInitialOperators = async () => {
      const res = await fetchOperators('Gas') // or appropriate category for gas
      if (res.success && res.data) {
        setOperators(res.data)
      }
    }
    fetchInitialOperators()
  }, [])

  // Fetch circles when operator changes
  useEffect(() => {
    const fetchCirclesForOperator = async () => {

        const res = await fetchCircles()
        if (res.success && res.data) {
          setCircles(res.data)
        } else {
          setCircles([])
        }

      // Reset circle selection if operator changes
      setFormData(prev => ({ ...prev, circleId: null }))
    }
    fetchCirclesForOperator()
  }, [formData.operatorId])

  // Simple validations
  const validate = () => {
    if (!formData.consumerNumber.trim()) {
      alert('Please enter your consumer number')
      return false
    }
    if (!formData.operatorId) {
      alert('Please select a gas provider')
      return false
    }
    if (!formData.circleId) {
      alert('Please select your state/circle')
      return false
    }
    if (!formData.amount.trim() || Number(formData.amount) <= 0) {
      alert('Please enter a valid amount greater than zero')
      return false
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    alert(`Paying ₹${formData.amount} to operator ${formData.operatorId} for consumer ${formData.consumerNumber} in circle ${formData.circleId}`)
    // TODO: API call for gas bill payment
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" mb={3} fontWeight="bold">
          Gas Bill Payment
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>

            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                label="Consumer Number"
                value={formData.consumerNumber}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('consumerNumber', e.target.value)}
                fullWidth
                placeholder="Enter consumer number"
                inputProps={{ maxLength: 15 }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                select
                label="Gas Provider"
                value={formData.operatorId || ''}
                onChange={e => handleFormChange('operatorId', Number(e.target.value))}
                fullWidth
              >
                <MenuItem value="">Select Gas Provider</MenuItem>
                {operators.map(op => (
                  <MenuItem key={op.opId} value={op.opId}>
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

            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                select
                label="State / Circle"
                value={formData.circleId || ''}
                onChange={e => handleFormChange('circleId', Number(e.target.value))}
                fullWidth
                disabled={!formData.operatorId || circles.length === 0}
              >
                <MenuItem value="">Select State / Circle</MenuItem>
                {circles.map(c => (
                  <MenuItem key={c.circleId} value={c.circleId}>
                    {c.circleName}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                label="Amount (₹)"
                value={formData.amount}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('amount', e.target.value)}
                fullWidth
                placeholder="Enter amount"
                type="number"
                inputProps={{ min: 0.01, step: 0.01 }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }} className="flex justify-center mt-4">
              <Button variant="contained" color="primary" size="large" type="submit">
                Pay Now
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default GasBillPaymentScreen
