'use client'

import { useState, useEffect } from 'react'
import type { ChangeEvent, Key } from 'react'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@core/components/mui/TextField'

import { fetchPlanByType, fetchPlan, fetchOperators, fetchCircles } from '../../../../app/api/bbps/mobikwick/recharge'

type RechargeData = {
  mobileNumber: string
  operatorId: number | null
  circleId: number | null
  amount: string
}

type Plan = {
  id: string
  amount: number
  planName: string
  planDescription?: string
  validity?: string
  dataBenefit?: string
  planBenefitItemList?: { displayName: string }[]
}

type Operator = {
  operatorName: Key | null | undefined
  opId: string | number | readonly string[] | undefined
  id: number
  name: string
}

type Circle = {
  circleId: number
  circleName: string
}

const initialData: RechargeData = {
  mobileNumber: '',
  operatorId: null,
  circleId: null,
  amount: ''
}

type Props = {
  serviceId: string
}

const RechargeScreen = ({ serviceId }: Props) => {
  const [formData, setFormData] = useState<RechargeData>(initialData)
  const [plans, setPlans] = useState<Plan[]>([])
  const [operators, setOperators] = useState<Operator[]>([])
  const [circles, setCircles] = useState<Circle[]>([])
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [loadingPlans, setLoadingPlans] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFormChange = (field: keyof RechargeData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

 useEffect(() => {
  const fetchInitialData = async () => {
    const opRes = await fetchOperators('Prepaid')
    debugger
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

  const validateMobile = (num: string) => /^[6-9]\d{9}$/.test(num)
  const validateAmount = (amt: string) => /^\d+(\.\d{1,2})?$/.test(amt) && Number(amt) > 0

  const handleRecharge = () => {
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
    if (!validateAmount(formData.amount)) {
      alert('Enter a valid recharge amount')
      return
    }

    alert(`Recharging ${formData.mobileNumber} with ₹${formData.amount}`)
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" mb={3} fontWeight="bold">
          Mobile Recharge
        </Typography>
        <form
          onSubmit={e => {
            e.preventDefault()
            handleRecharge()
          }}
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 4 }} >
              <CustomTextField
                label="Mobile Number"
                value={formData.mobileNumber}
                placeholder="Enter mobile number"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('mobileNumber', e.target.value)}
                fullWidth
                inputProps={{ maxLength: 10 }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }} >
              <CustomTextField
                select
                label="Operator"
                value={formData.operatorId || ''}
                onChange={(e) => handleFormChange('operatorId', Number(e.target.value))}
                fullWidth
              >
                <MenuItem value="">Select operator</MenuItem>
                {operators.map(op => (
                <MenuItem key={op.operatorName } value={op.opId}>
                    <img
                      src={`https://static.mobikwik.com/appdata/operator_icons/op${op.opId}.png`}
                      alt=""
                      style={{ width: 20, marginRight: 5 }}
                    />
                    {op.operatorName}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }} >
             <CustomTextField
                select
                label="Circle"
                value={formData.circleId || ''}
                onChange={(e) => handleFormChange('circleId', Number(e.target.value))}
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
              <Grid size={{ xs: 12}}>
                <Typography>Loading plans...</Typography>
              </Grid>
            )}

            {error && (
              <Grid size={{ xs: 12}} >
                <Typography color="error">{error}</Typography>
              </Grid>
            )}

            {plans.length > 0 && (
              <>
                <Grid size={{ xs: 12 }} >
                  <CustomTextField
                    select
                    label="Select Plan"
                    value={formData.amount}
                    onChange={(e) => {
                      const selected = plans.find(p => p.amount.toString() === e.target.value)
                      handleFormChange('amount', e.target.value)
                      setSelectedPlan(selected || null)
                    }}
                    fullWidth
                  >
                    <MenuItem value="">Select a plan</MenuItem>
                    {plans.map((plan) => (
                      <MenuItem key={plan.id} value={plan.amount.toString()}>
                        ₹{plan.amount} - {plan.planName}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>

                <Grid size={{ xs: 12}} >
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

            <Grid size={{ xs: 12}}>
              <Button variant="contained" type="submit">
                Recharge Now
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default RechargeScreen
