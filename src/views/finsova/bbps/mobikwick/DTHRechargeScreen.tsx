'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@core/components/mui/TextField'

// Replace these imports with your actual API functions
import { fetchOperators, fetchCircles } from '../../../../app/api/bbps/mobikwick/recharge'

type DTHRechargeData = {
  subscriberId: string
  operatorId: number | null
  circleId: number | null
  amount: string
}

type Operator = {
  operatorName: string
  opId: number | string
  id: number
}

type Circle = {
  circleId: number
  circleName: string
}

const initialData: DTHRechargeData = {
  subscriberId: '',
  operatorId: null,
  circleId: null,
  amount: '',
}

const DTHRechargeScreen = () => {
  const [formData, setFormData] = useState<DTHRechargeData>(initialData)
  const [operators, setOperators] = useState<Operator[]>([])
  const [circles, setCircles] = useState<Circle[]>([])

  useEffect(() => {
    const fetchInitialData = async () => {
      const opRes = await fetchOperators('DTH') // Assuming 'DTH' fetch param
      if (opRes.success && opRes.data) setOperators(opRes.data)

      const cirRes = await fetchCircles()
      if (cirRes.success && cirRes.data) setCircles(cirRes.data)
    }

    fetchInitialData()
  }, [])

  const handleFormChange = (field: keyof DTHRechargeData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateSubscriberId = (id: string) => id.trim().length > 0
  const validateAmount = (amt: string) => /^\d+(\.\d{1,2})?$/.test(amt) && Number(amt) > 0

  const handleRecharge = () => {
    if (!validateSubscriberId(formData.subscriberId)) {
      alert('Please enter a valid subscriber ID')
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
      alert('Please enter a valid amount')
      return
    }

    alert(`Recharging subscriber ${formData.subscriberId} with ₹${formData.amount} on operator ${formData.operatorId}`)
    // TODO: Connect your DTH recharge API here
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" mb={3} fontWeight="bold" textAlign="left">
          DTH Recharge
        </Typography>
        <form
          onSubmit={e => {
            e.preventDefault()
            handleRecharge()
          }}
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomTextField
                label="Subscriber ID"
                value={formData.subscriberId}
                placeholder="Enter subscriber ID"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('subscriberId', e.target.value)}
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
              >
                <MenuItem value="">Select operator</MenuItem>
                {operators.map(op => (
                  <MenuItem key={op.opId?.toString() || op.id} value={op.opId}>
                    <img
                      src={`https://static.mobikwik.com/appdata/operator_icons/op${op.opId}.png`}
                      alt={op.operatorName}
                      style={{ width: 20, marginRight: 5, verticalAlign: 'middle' }}
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

            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomTextField
                label="Amount (₹)"
                type="number"
                value={formData.amount}
                placeholder="Enter amount"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('amount', e.target.value)}
                fullWidth
                inputProps={{ min: 1 }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }} className="flex justify-center items-end">
              <Button variant="contained" color="primary" type="submit" size="large" fullWidth>
                Recharge Now
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default DTHRechargeScreen
