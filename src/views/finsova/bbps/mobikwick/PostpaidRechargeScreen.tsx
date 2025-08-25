'use client'

import { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@core/components/mui/TextField'

import { fetchPostpaidBill, fetchOperators, fetchCircles } from '../../../../app/api/bbps/mobikwick/recharge'
import Image from 'next/image'

type Operator = {
  operatorName: string | undefined
  opId: string | number  // operator code/id for image URL
}

type Circle = {
  circleId: number
  circleName: string
}

type FormData = {
  mobileNumber: string
  operatorId: number | null
  circleId: number | null
}

const initialData: FormData = {
  mobileNumber: '',
  operatorId: null,
  circleId: null,
}

const PostpaidRechargeScreen = () => {
  const [formData, setFormData] = useState<FormData>(initialData)
  const [operators, setOperators] = useState<Operator[]>([])
  const [circles, setCircles] = useState<Circle[]>([])
  const [billAmount, setBillAmount] = useState<string>('')
  const [customerName, setCustomerName] = useState<string>('')
  const [loadingBill, setLoadingBill] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const opRes = await fetchOperators('Postpaid')
        if (opRes.success && opRes.data) {
          setOperators(opRes.data)
        }

        const cirRes = await fetchCircles()
        if (cirRes.success && cirRes.data) {
          setCircles(cirRes.data)
        }
      } catch (e) {
        // handle errors if needed
      }
    }
    loadInitialData()
  }, [])

  const handleFormChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateMobile = (num: string) => /^[6-9]\d{9}$/.test(num)

  const handleFetchBill = async () => {
    setError(null)
    setBillAmount('')
    setCustomerName('')

    if (!validateMobile(formData.mobileNumber)) {
      setError('Enter a valid 10-digit mobile number')
      return
    }
    if (!formData.operatorId) {
      setError('Select an operator')
      return
    }
    if (!formData.circleId) {
      setError('Select a circle')
      return
    }

    setLoadingBill(true)
    try {
      const res = await fetchPostpaidBill(formData.mobileNumber, String(formData.operatorId), String(formData.circleId))
      if (res.success && res.data) {
        setBillAmount(res.data.amount ?? '')
        setCustomerName(res.data.customerName ?? '')
      } else {
        setError(res.error || 'Failed to fetch bill')
      }
    } catch (e) {
      setError('Error fetching bill')
    } finally {
      setLoadingBill(false)
    }
  }

  const handlePay = () => {
    if (!billAmount) {
      alert('No bill to pay. Please fetch the bill first.')
      return
    }
    alert(`Paying ₹${billAmount} for ${formData.mobileNumber} (${customerName}) on operator ID ${formData.operatorId}`)
    // TODO: Integrate payment API here
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" mb={3} fontWeight="bold">
          Postpaid Mobile Bill Payment
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <CustomTextField
              label="Mobile Number"
              value={formData.mobileNumber}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('mobileNumber', e.target.value)}
              placeholder="Enter mobile number"
              fullWidth
              inputProps={{ maxLength: 10 }}
              error={!!error && !validateMobile(formData.mobileNumber)}
              helperText={!!error && !validateMobile(formData.mobileNumber) ? error : ' '}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <CustomTextField
              select
              label="Operator"
              value={formData.operatorId || ''}
              onChange={(e) => handleFormChange('operatorId', Number(e.target.value))}
              fullWidth
              error={!!error && !formData.operatorId}
              helperText={!!error && !formData.operatorId ? error : ' '}
            >
              <MenuItem value="">Select operator</MenuItem>
              {operators.map((op) => (
                <MenuItem key={op.opId} value={op.opId} style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={`https://static.mobikwik.com/appdata/operator_icons/op${op.opId}.png`}
                    alt={op.operatorName}
                    style={{ width: 20, height: 20, marginRight: 8 }}
                    onError={e => {
                      // fallback if image fails
                      (e.currentTarget as HTMLImageElement).src = '/fallback-operator.png'
                    }}
                  />
                  {op.operatorName}-({op.opId})
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <CustomTextField
              select
              label="Circle"
              value={formData.circleId || ''}
              onChange={(e) => handleFormChange('circleId', Number(e.target.value))}
              fullWidth
              error={!!error && !formData.circleId}
              helperText={!!error && !formData.circleId ? error : ' '}
            >
              <MenuItem value="">Select circle</MenuItem>
              {circles.map((c) => (
                <MenuItem key={c.circleId} value={c.circleId}>
                  {c.circleName}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }} className="flex items-end">
            <Button variant="outlined" onClick={handleFetchBill} disabled={loadingBill}>
              {loadingBill ? 'Fetching...' : 'Fetch Bill'}
            </Button>
          </Grid>

          {error && !(!validateMobile(formData.mobileNumber) || !formData.operatorId || !formData.circleId) && (
            <Grid size={{ xs: 12 }}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}

          {billAmount && (
            <>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Typography>
                  <strong>Customer Name:</strong> {customerName}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Typography>
                  <strong>Bill Amount:</strong> ₹{billAmount}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }} className="flex justify-end">
                <Button variant="contained" onClick={handlePay}>
                  Pay Now
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>

    
    </Card>
  )
}

export default PostpaidRechargeScreen
