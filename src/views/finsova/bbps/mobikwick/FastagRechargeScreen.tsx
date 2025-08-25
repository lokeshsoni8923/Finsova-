'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@core/components/mui/TextField'

import { fetchOperators, fetchCircles, fetchPlan } from '../../../../app/api/bbps/mobikwick/recharge'

type FastagRechargeData = {
  vehicleNumber: string
  operatorId: number | null
  circleId: number | null
  amount: string
  mobileNumber: string
  email?: string
}

type Plan = {
  id: string
  amount: number
  planName: string
}

type Operator = {
  operatorName: string
  opId: number
  id: number
}

type Circle = {
  circleId: number
  circleName: string
}

const initialData: FastagRechargeData = {
  vehicleNumber: '',
  operatorId: null,
  circleId: null,
  amount: '',
  mobileNumber: '',
  email: ''
}

const FastagRechargeScreen = () => {
  const [formData, setFormData] = useState<FastagRechargeData>(initialData)
  const [operators, setOperators] = useState<Operator[]>([])
  const [circles, setCircles] = useState<Circle[]>([])
  const [plans, setPlans] = useState<Plan[]>([])
  const [loadingPlans, setLoadingPlans] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)

  useEffect(() => {
    const fetchInitialData = async () => {
      const opRes = await fetchOperators('Fastag')
      if (opRes.success && opRes.data) setOperators(opRes.data)

      const cirRes = await fetchCircles()
      if (cirRes.success && cirRes.data) setCircles(cirRes.data)
    }
    fetchInitialData()
  }, [])

  useEffect(() => {
    const fetchPlansForSelection = async () => {
      if (formData.operatorId && formData.circleId) {
        setLoadingPlans(true)
        setError(null)
        const res = await fetchPlan(formData.circleId, formData.operatorId)
        setLoadingPlans(false)
        if (res.success && res.data) {
          setPlans(res.data.plans || [])
        } else {
          setError(res.error || 'Failed to fetch plans')
          setPlans([])
        }
      } else {
        setPlans([])
      }
    }
    fetchPlansForSelection()
  }, [formData.operatorId, formData.circleId])

  const handleFormChange = (field: keyof FastagRechargeData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateMobile = (num: string) => /^[6-9]\d{9}$/.test(num)
  const validateAmount = (amt: string) => /^\d+(\.\d{1,2})?$/.test(amt) && Number(amt) > 0
  const validateVehicleNumber = (num: string) => /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/.test(num.toUpperCase().replace(/\s/g, ''))
  const validateEmail = (email: string) => !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleRecharge = () => {
    if (!formData.vehicleNumber.trim() || !validateVehicleNumber(formData.vehicleNumber.trim())) {
      alert('Enter valid vehicle number e.g. MH12AB1234')
      return
    }
    if (!validateMobile(formData.mobileNumber)) {
      alert('Enter a valid 10-digit mobile number starting with 6-9')
      return
    }
    if (!formData.operatorId) {
      alert('Please select a FASTag operator')
      return
    }
    if (!formData.circleId) {
      alert('Please select a circle')
      return
    }
    if (!validateAmount(formData.amount)) {
      alert('Enter a valid recharge amount')
      return
    }
    if (!validateEmail(formData.email || '')) {
      alert('Enter a valid email address')
      return
    }

    alert(`Recharging FASTag\nVehicle: ${formData.vehicleNumber.toUpperCase()}\nMobile: ${formData.mobileNumber}\nAmount: ₹${formData.amount}`)
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          FASTag Recharge
        </Typography>
        <form
          onSubmit={e => {
            e.preventDefault()
            handleRecharge()
          }}
          noValidate
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomTextField
                label="Vehicle Number"
                value={formData.vehicleNumber}
                placeholder="e.g. MH12AB1234"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFormChange('vehicleNumber', e.target.value.toUpperCase())
                }
                fullWidth
                inputProps={{ maxLength: 10 }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomTextField
                label="Mobile Number"
                value={formData.mobileNumber}
                placeholder="Enter 10-digit mobile number"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('mobileNumber', e.target.value)}
                fullWidth
                inputProps={{ maxLength: 10 }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomTextField
                select
                label="FASTag Operator"
                value={formData.operatorId || ''}
                onChange={e => handleFormChange('operatorId', Number(e.target.value))}
                fullWidth
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
              >
                <MenuItem value="">Select circle</MenuItem>
                {circles.map(c => (
                  <MenuItem key={c.circleId} value={c.circleId}>
                    {c.circleName}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            {loadingPlans && (
              <Grid size={{ xs: 12 }}>
                <Typography>Loading plans...</Typography>
              </Grid>
            )}

            {error && (
              <Grid size={{ xs: 12 }}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}

            {plans.length > 0 && (
              <>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <CustomTextField
                    select
                    label="Select Plan"
                    value={formData.amount}
                    onChange={e => {
                      const selected = plans.find(p => p.amount.toString() === e.target.value)
                      handleFormChange('amount', e.target.value)
                      setSelectedPlan(selected || null)
                    }}
                    fullWidth
                  >
                    <MenuItem value="">Select a plan</MenuItem>
                    {plans.map(plan => (
                      <MenuItem key={plan.id} value={plan.amount.toString()}>
                        ₹{plan.amount} - {plan.planName}
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
                  />
                </Grid>
              </>
            )}

            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomTextField
                label="Email (optional)"
                type="email"
                placeholder="example@mail.com"
                value={formData.email || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('email', e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12 }} className="flex justify-center mt-4">
              <Button variant="contained" color="primary" type="submit" size="large">
                Recharge FASTag
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FastagRechargeScreen
