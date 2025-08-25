'use client'

import { useEffect, useState, ChangeEvent } from 'react'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@core/components/mui/TextField'

import { fetchOperators, fetchCircles } from '../../../../app/api/bbps/mobikwick/recharge'

type Operator = {
  opId: number | string
  operatorName: string
}

type Circle = {
  circleId: number
  circleName: string
}

type WaterBillData = {
  consumerNumber: string
  waterProviderId: string
  circleId: string
  amount: string
}

const initialData: WaterBillData = {
  consumerNumber: '',
  waterProviderId: '',
  circleId: '',
  amount: '',
}

const WaterBillPaymentScreen = () => {
  const [formData, setFormData] = useState<WaterBillData>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [operators, setOperators] = useState<Operator[]>([])
  const [circles, setCircles] = useState<Circle[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const opRes = await fetchOperators('Water')
        if (opRes.success && opRes.data) {
          setOperators(opRes.data)
        }

        const cirRes = await fetchCircles()
        if (cirRes.success && cirRes.data) {
          setCircles(cirRes.data)
        }
      } catch (err) {
        console.error('Error loading data:', err)
      }
    }
    loadData()
  }, [])

  const handleFormChange = (field: keyof WaterBillData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.consumerNumber.trim()) {
      newErrors.consumerNumber = 'Consumer number is required'
    } else if (!/^\d{6,15}$/.test(formData.consumerNumber.trim())) {
      newErrors.consumerNumber = 'Consumer number must be 6-15 digits'
    }

    if (!formData.waterProviderId) {
      newErrors.waterProviderId = 'Please select a water provider'
    }

    if (!formData.circleId) {
      newErrors.circleId = 'Please select a circle'
    }

    if (!formData.amount.trim()) {
      newErrors.amount = 'Please enter the payment amount'
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.amount)) {
      newErrors.amount = 'Invalid amount format'
    } else if (Number(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than zero'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    alert(`Paying ₹${formData.amount} to ${formData.waterProviderId} for consumer ${formData.consumerNumber} in circle ${formData.circleId}`)
    // TODO: call your payment API here
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Water Bill Payment
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomTextField
                label="Consumer Number"
                value={formData.consumerNumber}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('consumerNumber', e.target.value)}
                error={Boolean(errors.consumerNumber)}
                helperText={errors.consumerNumber}
                fullWidth
                inputProps={{ maxLength: 15 }}
                placeholder="Enter your consumer number"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomTextField
                select
                label="Water Provider"
                value={formData.waterProviderId}
                onChange={e => handleFormChange('waterProviderId', e.target.value)}
                error={Boolean(errors.waterProviderId)}
                helperText={errors.waterProviderId}
                fullWidth
              >
                <MenuItem value="">Select Water Provider</MenuItem>
                {operators.map(op => (
                  <MenuItem key={op.opId} value={String(op.opId)} style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={`https://static.mobikwik.com/appdata/operator_icons/op${op.opId}.png`}
                      alt={op.operatorName}
                      style={{ width: 20, height: 20, marginRight: 8 }}
                      onError={e => {
                        (e.currentTarget as HTMLImageElement).src = '/fallback-operator.png'
                      }}
                    />
                    {op.operatorName}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomTextField
                select
                label="Circle"
                value={formData.circleId}
                onChange={e => handleFormChange('circleId', e.target.value)}
                error={Boolean(errors.circleId)}
                helperText={errors.circleId}
                fullWidth
              >
                <MenuItem value="">Select Circle</MenuItem>
                {circles.map(c => (
                  <MenuItem key={c.circleId} value={String(c.circleId)}>
                    {c.circleName}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomTextField
                label="Amount (₹)"
                value={formData.amount}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('amount', e.target.value)}
                error={Boolean(errors.amount)}
                helperText={errors.amount}
                fullWidth
                type="number"
                inputProps={{ min: 1, step: '0.01' }}
                placeholder="Enter amount to pay"
              />
            </Grid>

            <Grid size={{ xs: 12 }} className="flex justify-center mt-4">
              <Button variant="contained" color="primary" type="submit" size="large">
                Pay Now
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default WaterBillPaymentScreen
