'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import Collapse from '@mui/material/Collapse'
import CustomTextField from '@core/components/mui/TextField'
import { Visibility, VisibilityOff } from '@mui/icons-material';

import {
  fetchOperators,
  fetchCircles,
  fetchViewBill,
  fetchRechargePayBill,
  checkRechargeStatus,
  fetchCCBill
} from '../../../../app/api/bbps/mobikwick/recharge'

import { encryptCardNumber, generateChecksum } from '../../../../utils/crypto'
import InputAdornment from '@mui/material/InputAdornment'
import { IconButton } from '@mui/material'

interface Provider {
  opId: number
  operatorName: string
}

interface Circle {
  circleId: number
  circleName: string
}

interface BillDetails {
  billAmount: number
  dueDate?: string
  userName?: string
}

interface FormData {
  creditCardNumber: string
  providerId: number | null
  circleId: number | null
  amount: string
}

const initialData: FormData = {
  creditCardNumber: '',
  providerId: null,
  circleId: null,
  amount: ''
}

const CreditCardBillPaymentScreen = () => {
  const [formData, setFormData] = useState<FormData>(initialData)
  const [providers, setProviders] = useState<Provider[]>([])
  const [circles, setCircles] = useState<Circle[]>([])
  const [billDetails, setBillDetails] = useState<any | null>(null)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(false)
  const [paying, setPaying] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(false)
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      const providerRes = await fetchOperators('creditcardpay')
      if (providerRes.success) setProviders(providerRes.data)

      const circleRes = await fetchCircles()
      if (circleRes.success) setCircles(circleRes.data)
    }
    fetchInitialData()
  }, [])

const validateCardNumber = (num: string): boolean => {
  const cleaned = num.replace(/\s/g, ''); // Remove all spaces
  return /^\d{16}$/.test(cleaned);
};
  const validateAmount = (amt: string): boolean => /^\d+(\.\d{1,2})?$/.test(amt) && Number(amt) > 0

  const handleFormChange = (field: keyof FormData, value: string | number) => {
    if (!formData.creditCardNumber.replace(/\s/g, '')) {
  errors.creditCardNumber = 'Credit card number is required';
} else if (formData.creditCardNumber.replace(/\s/g, '').length !== 16) {
  errors.creditCardNumber = 'Card number must be 16 digits';
}
    if (field === 'creditCardNumber') {
  const cleanedValue = String(value).replace(/\s/g, ''); // remove all spaces
  const isValid = /^\d{16}$/.test(cleanedValue); // now check if it's 16 digits
  setErrors(prev => ({
    ...prev,
    creditCardNumber: isValid ? '' : 'Enter a valid 16-digit credit card number'
  }));
}
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleViewBill = async () => {
    debugger
    setError(null)
    setBillDetails(null)
    setLoading(true)

    if (!validateCardNumber(formData.creditCardNumber) || !formData.providerId || !formData.circleId) {
      setError('All fields are required and must be valid to view bill.')
      setLoading(false)
      return
    }

 const encryptedNumber = await encryptCardNumber(formData.creditCardNumber.replace(/\s/g, ''));


    const res = await fetchViewBill(
      String(formData.circleId),
      Number(formData.providerId),
      encryptedNumber
    )

    setLoading(false)
    if (res.success && res.data) {
      setBillDetails(res.data)
      setFormData(prev => ({
        ...prev,
        amount: res.data.billAmount?.toString() || ''
      }))
    } else {
      setError(res.error || 'Failed to fetch bill')
    }
  }

  const handlePayBill = async () => {
    setError(null)
    setPaying(true)

    if (!validateCardNumber(formData.creditCardNumber)) {
      setError('Invalid credit card number')
      setPaying(false)
      return
    }

    if (!formData.providerId || !formData.circleId) {
      setError('Please select provider and circle')
      setPaying(false)
      return
    }

    if (!validateAmount(formData.amount)) {
      setError('Enter a valid amount')
      setPaying(false)
      return
    }

    const encryptedNumber = await encryptCardNumber(formData.creditCardNumber)
    const checksum = generateChecksum(
      JSON.stringify({
        circleId: formData.circleId,
        providerId: formData.providerId,
        number: encryptedNumber,
        amount: formData.amount
      }),
      'abcd@123'
    )

    const res = await fetchCCBill(
      String(formData.circleId),
      Number(formData.providerId),
      encryptedNumber,
      checksum
    )

    setPaying(false)

    if (res.success && res.data) {
      setStatusMessage('Bill payment successful. Status ID: ' + res.data.status)
      setTimeout(() => handleCheckStatus(), 30000)
    } else {
      setError(res.error || 'Payment failed')
    }
  }

  const handleCheckStatus = async () => {
    setCheckingStatus(true)
    setError(null)

    const encryptedNumber = await encryptCardNumber(formData.creditCardNumber)

    const res = await checkRechargeStatus(
      String(formData.circleId),
      Number(formData.providerId),
      encryptedNumber
    )

    setCheckingStatus(false)
    if (res.success && res.data) {
      setStatusMessage('Payment status: ' + res.data.txStatus.status)
    } else {
      setError(res.error || 'Status check failed')
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" mb={3} fontWeight="bold">
          Credit Card Bill Payment
        </Typography>
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault()
            handlePayBill()
          }}
        >
          <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
  <CustomTextField
    label="Credit Card Number"
    type={showCard ? 'text' : 'password'}
    value={formData.creditCardNumber}
    placeholder="XXXX XXXX XXXX 1234"
    inputProps={{
      maxLength: 19, // Allows space characters
      inputMode: 'numeric',
      pattern: '[0-9]*',
    }}
    onChange={(e: ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value.replace(/\D/g, ''); // Keep only digits
      if (value.length > 16) value = value.slice(0, 16);
      const formatted = value.replace(/(.{4})/g, '$1 ').trim(); // Format as XXXX XXXX ...
      handleFormChange('creditCardNumber', formatted);
    }}
    error={!!errors.creditCardNumber}
    helperText={errors.creditCardNumber || ' '}
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={() => setShowCard(!showCard)} edge="end">
            {showCard ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
</Grid>

            <Grid item xs={12} sm={4}>
              <CustomTextField
                select
                label="Provider"
                value={formData.providerId ?? ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('providerId', Number(e.target.value))}
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
                    {provider.operatorName}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            <Grid item xs={12} sm={4  }>
              <CustomTextField
                select
                label="Circle"
                value={formData.circleId ?? ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('circleId', Number(e.target.value))}
                fullWidth
              >
                <MenuItem value="">Select circle</MenuItem>
                {circles.map(circle => (
                  <MenuItem key={circle.circleId} value={circle.circleId}>
                    {circle.circleName}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button variant="outlined" onClick={handleViewBill} fullWidth disabled={loading}>
                {loading ? <CircularProgress size={20} /> : 'Fetch Bill'}
              </Button>
            </Grid>

            <Collapse in={!!billDetails} style={{ width: '100%' }}>
              <Grid container spacing={3} mt={2}>
                <Grid item xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography>
                        <strong>Bill Amount:</strong> ₹{billDetails?.billAmount}
                        <br />
                        <strong>Due Date:</strong> {billDetails?.dueDate}
                        <br />
                        <strong>Card Holder:</strong> {billDetails?.userName || 'N/A'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label="Amount (₹)"
                    value={formData.amount}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('amount', e.target.value)}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button variant="contained" type="submit" fullWidth disabled={paying}>
                    {paying ? <CircularProgress size={20} /> : 'Pay Bill'}
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button variant="outlined" onClick={handleCheckStatus} fullWidth disabled={checkingStatus}>
                    {checkingStatus ? <CircularProgress size={20} /> : 'Check Status'}
                  </Button>
                </Grid>
              </Grid>
            </Collapse>

            {statusMessage && (
              <Grid item xs={12}>
                <Typography color="primary">{statusMessage}</Typography>
              </Grid>
            )}
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default CreditCardBillPaymentScreen
