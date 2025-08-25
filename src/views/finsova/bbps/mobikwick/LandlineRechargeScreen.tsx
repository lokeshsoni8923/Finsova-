'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@core/components/mui/TextField'

import { fetchOperators, fetchCircles } from '@/app/api/bbps/mobikwick/recharge'

type Operator = {
  id: number
  opId: number
  operatorName: string
}

type Circle = {
  circleId: number
  circleName: string
}

type FormData = {
  landlineNumber: string
  operatorId: number | ''
  circleId: number | ''
  amount: string
}

const initialFormData: FormData = {
  landlineNumber: '',
  operatorId: '',
  circleId: '',
  amount: ''
}

const LandlineRechargeScreen = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [operators, setOperators] = useState<Operator[]>([])
  const [circles, setCircles] = useState<Circle[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const opRes = await fetchOperators('Landline')
      if (opRes.success && opRes.data) setOperators(opRes.data)

      const cirRes = await fetchCircles()
      if (cirRes.success && cirRes.data) setCircles(cirRes.data)
    }

    fetchData()
  }, [])

  const handleChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateLandlineNumber = (num: string) => /^\d{6,11}$/.test(num)
  const validateAmount = (amt: string) => /^\d+(\.\d{1,2})?$/.test(amt) && Number(amt) > 0

  const handleSubmit = () => {
    if (!validateLandlineNumber(formData.landlineNumber)) {
      alert('Enter a valid landline number (6 to 11 digits)')
      return
    }
    if (!formData.operatorId) {
      alert('Please select an operator')
      return
    }
    if (!formData.circleId) {
      alert('Please select a circle')
      return
    }
    if (!validateAmount(formData.amount)) {
      alert('Enter a valid amount')
      return
    }

    alert(`Recharging ${formData.landlineNumber} with ₹${formData.amount} on operator ID ${formData.operatorId}, circle ID ${formData.circleId}`)
    // TODO: Add API call for landline recharge
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Landline Recharge
        </Typography>
        <form
          onSubmit={e => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomTextField
                label="Landline Number"
                value={formData.landlineNumber}
                placeholder="Enter landline number"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('landlineNumber', e.target.value)}
                fullWidth
                inputProps={{ maxLength: 11 }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomTextField
                select
                label="Operator"
                value={formData.operatorId}
                onChange={e => handleChange('operatorId', Number(e.target.value))}
                fullWidth
              >
                <MenuItem value="">Select operator</MenuItem>
                {operators.map(op => (
                  <MenuItem key={op.opId} value={op.opId}>
                    <img
                      src={`https://static.mobikwik.com/appdata/operator_icons/op${op.opId}.png`}
                      alt=""
                      style={{ width: 20, marginRight: 8 }}
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
                onChange={e => handleChange('circleId', Number(e.target.value))}
                fullWidth
              >
                <MenuItem value="">Select circle</MenuItem>
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('amount', e.target.value)}
                fullWidth
                type="number"
                inputProps={{ min: 1 }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }} className="flex justify-center mt-4">
              <Button variant="contained" color="primary" type="submit" size="large">
                Recharge Now
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default LandlineRechargeScreen
