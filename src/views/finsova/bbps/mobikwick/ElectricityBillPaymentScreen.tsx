'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@core/components/mui/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Collapse from '@mui/material/Collapse'

import {
  fetchOperators,
  fetchCircles,
  fetchViewBill,
  fetchRechargePayBill,
  checkRechargeStatus
} from '../../../../app/api/bbps/mobikwick/recharge'

type FormData = {
  consumerNumber: string
  providerId: number | null
  circleId: number | null
  amount: string
}

type Operator = {
  operatorName: string
  opId: number
}

type Circle = {
  circleId: number
  circleName: string
}

const initialData: FormData = {
  consumerNumber: '',
  providerId: null,
  circleId: null,
  amount: ''
}

const ElectricityBillPaymentScreen = () => {
  const [formData, setFormData] = useState<FormData>(initialData)
  const [providers, setProviders] = useState<Operator[]>([])
  const [circles, setCircles] = useState<Circle[]>([])
  const [billDetails, setBillDetails] = useState<any>(null)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(false)
  const [paying, setPaying] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(false)

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const providerRes = await fetchOperators('Electricity')
        if (providerRes.success && providerRes.data) {
          setProviders(providerRes.data)
        }

        const circleRes = await fetchCircles()
        if (circleRes.success && circleRes.data) {
          setCircles(circleRes.data)
        }
      } catch (err) {
        setError('Failed to load providers or circles')
      }
    }

    fetchInitialData()
  }, [])

  const validateConsumerNumber = (num: string) => /^\d{6,20}$/.test(num)
  const validateAmount = (amt: string) => /^\d+(\.\d{1,2})?$/.test(amt) && Number(amt) > 0

  const handleFormChange = (field: keyof FormData, value: any) => {
    if (field === 'consumerNumber') {
      const onlyDigits = /^\d{6,20}$/
      setErrors(prev => ({
        ...prev,
        consumerNumber: onlyDigits.test(value) ? '' : 'Enter a valid consumer number (6-20 digits)'
      }))
    }

    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleViewBill = async () => {
    setStatusMessage(null)
    setError(null)
    setBillDetails(null)
    setLoading(true)

    if (!formData.consumerNumber || !formData.providerId || !formData.circleId) {
      setError('All fields are required to view bill.')
      setLoading(false)
      return
    }

    const res = await fetchViewBill(
      String(formData.circleId),
      Number(formData.providerId),
      Number(formData.consumerNumber)
    )

    setLoading(false)

    if (res.success && res.data) {
      setBillDetails(res.data)
      setFormData(prev => ({
        ...prev,
        amount: res.data.billAmount.toString() || ''
      }))
    } else {
      setError(res.error || 'Failed to view bill')
    }
  }

  const handlePayBill = async () => {
    setStatusMessage(null)
    setError(null)
    setPaying(true)

    if (!validateConsumerNumber(formData.consumerNumber)) {
      setError('Enter a valid consumer number')
      setPaying(false)
      return
    }
    if (!formData.providerId || !formData.circleId) {
      setError('Please select both provider and circle')
      setPaying(false)
      return
    }
    if (!validateAmount(formData.amount)) {
      setError('Enter a valid amount')
      setPaying(false)
      return
    }

    const res = await fetchRechargePayBill(
      String(formData.circleId),
      Number(formData.providerId),
      Number(formData.consumerNumber)
    )

    setPaying(false)

    if (res.success && res.data) {
      setStatusMessage('Recharge successful! Status ID: ' + res.data.status || '')
      setTimeout(() => {
        handleCheckStatus()
      }, 30000)
    } else {
      setError(res.error || 'Recharge failed')
    }
  }

  const handleCheckStatus = async () => {
    setStatusMessage(null)
    setError(null)
    setCheckingStatus(true)

    const res = await checkRechargeStatus(
      String(formData.circleId),
      Number(formData.providerId),
      Number(formData.consumerNumber)
    )

    setCheckingStatus(false)

    if (res.success && res.data) {
      setStatusMessage('Recharge Status: ' + res.data.txStatus.status)
    } else {
      setError(res.error || 'Failed to check status')
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" mb={3} fontWeight="bold">
          Electricity Bill Payment
        </Typography>
        <form
          onSubmit={e => {
            e.preventDefault()
            handlePayBill()
          }}
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomTextField
                label="Consumer Number"
                value={formData.consumerNumber}
                placeholder="Enter consumer number"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('consumerNumber', e.target.value)}
                error={!!errors.consumerNumber}
                helperText={errors.consumerNumber || ' '}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomTextField
                select
                label="Provider"
                value={formData.providerId || ''}
                onChange={(e) => handleFormChange('providerId', Number(e.target.value))}
                fullWidth
              >
                <MenuItem value="">Select provider</MenuItem>
                {providers.map(provider => (
                  <MenuItem key={provider.opId} value={provider.opId}>
                    <img
                      src={`https://static.mobikwik.com/appdata/operator_icons/op${provider.opId}.png`}
                      alt=""
                      style={{ width: 20, marginRight: 5 }}
                    />
                    {provider.operatorName}-({provider.opId})
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
              >
                <MenuItem value="">Select circle</MenuItem>
                {circles.map(c => (
                  <MenuItem key={c.circleId} value={c.circleId}>
                    {c.circleName}-({c.circleId})
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            {error && (
              <Grid size={{ xs: 12}}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}

            <Grid size={{ xs: 12 }}>
              <Button variant="outlined" onClick={handleViewBill} fullWidth disabled={loading}>
                {loading ? <CircularProgress size={20} /> : 'Fetch Bill'}
              </Button>
            </Grid>

            <Collapse in={!!billDetails} style={{ width: '100%' }}>
              <Grid container spacing={3} mt={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="body1">
                        <strong>Bill Amount:</strong> ₹{billDetails?.billAmount}<br />
                        <strong>Due Date:</strong> {billDetails?.dueDate}<br />
                        <strong>Customer Name:</strong> {billDetails?.userName || 'N/A'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <CustomTextField
                    label="Amount (₹)"
                    value={formData.amount}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('amount', e.target.value)}
                    fullWidth
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <Button variant="contained" type="submit" fullWidth disabled={paying}>
                    {paying ? <CircularProgress size={20} /> : 'Pay Bill'}
                  </Button>
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <Button variant="outlined" onClick={handleCheckStatus} fullWidth disabled={checkingStatus}>
                    {checkingStatus ? <CircularProgress size={20} /> : 'Check Status'}
                  </Button>
                </Grid>
              </Grid>
            </Collapse>

            {statusMessage && (
              <Grid size={{ xs: 12}}>
                <Typography color="primary">{statusMessage}</Typography>
              </Grid>
            )}
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default ElectricityBillPaymentScreen
