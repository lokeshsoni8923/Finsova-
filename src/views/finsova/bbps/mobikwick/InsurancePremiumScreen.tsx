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

type InsuranceData = {
  policyNumber: string
  insuredName: string
  mobileNumber: string
  email?: string
  operatorId: number | null
  circleId: number | null
  premiumAmount: string
}

const initialData: InsuranceData = {
  policyNumber: '',
  insuredName: '',
  mobileNumber: '',
  email: '',
  operatorId: null,
  circleId: null,
  premiumAmount: ''
}

const InsurancePremiumPaymentScreen = () => {
  const [formData, setFormData] = useState<InsuranceData>(initialData)
  const [operators, setOperators] = useState<{ opId: number; operatorName: string }[]>([])
  const [circles, setCircles] = useState<{ circleId: number; circleName: string }[]>([])
  const [loadingOperators, setLoadingOperators] = useState(false)
  const [loadingCircles, setLoadingCircles] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFormChange = (field: keyof InsuranceData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  useEffect(() => {
    setLoadingOperators(true)
    fetchOperators('Insurance')
      .then(res => {
        if (res.success && res.data) setOperators(res.data)
        else setError('Failed to load operators')
      })
      .finally(() => setLoadingOperators(false))
  }, [])

  useEffect(() => {
    if (!formData.operatorId) {
      setCircles([])
      setFormData(prev => ({ ...prev, circleId: null }))
      return
    }
    setLoadingCircles(true)
    fetchCircles()
      .then(res => {
        if (res.success && res.data) setCircles(res.data)
        else setError('Failed to load circles')
      })
      .finally(() => setLoadingCircles(false))
  }, [formData.operatorId])

  const validateMobile = (num: string) => /^[6-9]\d{9}$/.test(num)
  const validateAmount = (amt: string) => /^\d+(\.\d{1,2})?$/.test(amt) && Number(amt) > 0

  const handleSubmit = () => {
    if (!formData.policyNumber.trim()) {
      alert('Policy Number is required')
      return
    }
    if (!formData.insuredName.trim()) {
      alert('Insured Name is required')
      return
    }
    if (!validateMobile(formData.mobileNumber)) {
      alert('Enter a valid 10-digit mobile number starting with 6-9')
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
    if (!validateAmount(formData.premiumAmount)) {
      alert('Enter a valid premium amount')
      return
    }
    alert(`Paying premium ₹${formData.premiumAmount} for policy ${formData.policyNumber}`)
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" mb={3} fontWeight="bold">
          Insurance Premium Payment
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
                label="Policy Number"
                value={formData.policyNumber}
                placeholder="Enter policy number"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('policyNumber', e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomTextField
                label="Insured Name"
                value={formData.insuredName}
                placeholder="Enter insured name"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('insuredName', e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomTextField
                label="Mobile Number"
                value={formData.mobileNumber}
                placeholder="Enter mobile number"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('mobileNumber', e.target.value)}
                inputProps={{ maxLength: 10 }}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomTextField
                label="Email (Optional)"
                value={formData.email || ''}
                placeholder="Enter email"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('email', e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomTextField
                select
                label="Operator"
                value={formData.operatorId || ''}
                onChange={e => handleFormChange('operatorId', Number(e.target.value))}
                fullWidth
                disabled={loadingOperators}
              >
                <MenuItem value="">Select operator</MenuItem>
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

            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomTextField
                select
                label="Circle"
                value={formData.circleId || ''}
                onChange={e => handleFormChange('circleId', Number(e.target.value))}
                fullWidth
                disabled={!formData.operatorId || loadingCircles}
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
                label="Premium Amount (₹)"
                value={formData.premiumAmount}
                placeholder="Enter premium amount"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('premiumAmount', e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button variant="contained" type="submit">
                Pay Premium
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default InsurancePremiumPaymentScreen
