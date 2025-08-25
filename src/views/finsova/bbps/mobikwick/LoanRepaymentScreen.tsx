'use client'

import { useEffect, useState, ChangeEvent } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import CustomTextField from '@core/components/mui/TextField'

type LoanRepaymentData = {
  loanAccountNumber: string
  borrowerName: string
  amount: string
  mobileNumber: string
  email?: string
  otp?: string
  providerId?: string
  state?: string
}

const initialData: LoanRepaymentData = {
  loanAccountNumber: '',
  borrowerName: '',
  amount: '',
  mobileNumber: '',
  email: '',
  otp: '',
  providerId: '',
  state: '',
}

const LoanRepaymentScreen = () => {
  const [formData, setFormData] = useState<LoanRepaymentData>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [otpSent, setOtpSent] = useState(false)

  const [providers, setProviders] = useState<any[]>([])
  const [states, setStates] = useState<string[]>([])
  const [loadingProviders, setLoadingProviders] = useState(true)

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const [providersRes, statesRes] = await Promise.all([
          fetch('/api/water-providers'),
          fetch('/api/states')
        ])
        setProviders(await providersRes.json())
        setStates(await statesRes.json())
      } catch (error) {
        console.error('Error fetching providers or states:', error)
      } finally {
        setLoadingProviders(false)
      }
    }

    fetchMeta()
  }, [])

  const handleFormChange = (field: keyof LoanRepaymentData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validateLoanAccountNumber = (num: string) => /^[A-Z0-9]{8,20}$/.test(num.trim())
  const validateName = (name: string) => /^[a-zA-Z\s]{3,100}$/.test(name.trim())
  const validateMobile = (num: string) => /^[6-9]\d{9}$/.test(num)
  const validateEmail = (email: string) => !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const validateAmount = (amt: string) => /^\d+(\.\d{1,2})?$/.test(amt) && Number(amt) > 0
  const validateOtp = (otp: string) => /^\d{4,6}$/.test(otp.trim())

  const validate = (forOtp = false): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.providerId) newErrors.providerId = 'Water provider is required'
    if (!formData.state) newErrors.state = 'State is required'

    if (!formData.loanAccountNumber.trim()) {
      newErrors.loanAccountNumber = 'Loan account number is required'
    } else if (!validateLoanAccountNumber(formData.loanAccountNumber)) {
      newErrors.loanAccountNumber = 'Invalid loan account number format'
    }

    if (!formData.borrowerName.trim()) {
      newErrors.borrowerName = 'Borrower name is required'
    } else if (!validateName(formData.borrowerName)) {
      newErrors.borrowerName = 'Invalid name (only letters and spaces allowed)'
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required'
    } else if (!validateMobile(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Invalid mobile number'
    }

    if (!validateEmail(formData.email || '')) {
      newErrors.email = 'Invalid email address'
    }

    if (!formData.amount.trim()) {
      newErrors.amount = 'Amount is required'
    } else if (!validateAmount(formData.amount)) {
      newErrors.amount = 'Invalid amount'
    }

    if (forOtp) {
      if (!formData.otp?.trim()) {
        newErrors.otp = 'OTP is required'
      } else if (!validateOtp(formData.otp)) {
        newErrors.otp = 'Invalid OTP'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSendOtp = () => {
    if (!validate()) return
    // TODO: Send OTP API call
    setOtpSent(true)
    alert(`OTP sent to ${formData.mobileNumber}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate(true)) return
    // TODO: Repayment API call
    alert(`Repayment submitted for ${formData.loanAccountNumber}`)
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Loan Repayment
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <CustomTextField
                select
                label="Water Provider"
                value={formData.providerId || ''}
                onChange={(e) => handleFormChange('providerId', e.target.value)}
                error={Boolean(errors.providerId)}
                helperText={errors.providerId || 'Select your water provider'}
                fullWidth
              >
                {loadingProviders ? (
                  <MenuItem value="" disabled>
                    <CircularProgress size={20} />
                  </MenuItem>
                ) : (
                  providers.map(provider => (
                    <MenuItem key={provider.id} value={provider.id}>
                      <Avatar src={provider.logo} sx={{ width: 24, height: 24, mr: 2 }} />
                      {provider.name}
                    </MenuItem>
                  ))
                )}
              </CustomTextField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <CustomTextField
                select
                label="State"
                value={formData.state || ''}
                onChange={(e) => handleFormChange('state', e.target.value)}
                error={Boolean(errors.state)}
                helperText={errors.state || 'Select your state'}
                fullWidth
              >
                {states.map(state => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <CustomTextField
                label="Loan Account Number"
                value={formData.loanAccountNumber}
                onChange={(e) => handleFormChange('loanAccountNumber', e.target.value.toUpperCase())}
                error={Boolean(errors.loanAccountNumber)}
                helperText={errors.loanAccountNumber}
                fullWidth
                inputProps={{ maxLength: 20 }}
                placeholder="Enter loan account number"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <CustomTextField
                label="Borrower Name"
                value={formData.borrowerName}
                onChange={(e) => handleFormChange('borrowerName', e.target.value)}
                error={Boolean(errors.borrowerName)}
                helperText={errors.borrowerName}
                fullWidth
                placeholder="Enter borrower name"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <CustomTextField
                label="Mobile Number"
                value={formData.mobileNumber}
                onChange={(e) => handleFormChange('mobileNumber', e.target.value)}
                error={Boolean(errors.mobileNumber)}
                helperText={errors.mobileNumber}
                fullWidth
                inputProps={{ maxLength: 10 }}
                placeholder="10-digit mobile number"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <CustomTextField
                label="Email (optional)"
                type="email"
                value={formData.email}
                onChange={(e) => handleFormChange('email', e.target.value)}
                error={Boolean(errors.email)}
                helperText={errors.email}
                fullWidth
                placeholder="example@mail.com"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <CustomTextField
                label="Amount (₹)"
                type="number"
                value={formData.amount}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                error={Boolean(errors.amount)}
                helperText={errors.amount}
                fullWidth
                inputProps={{ min: 1, step: '0.01' }}
                placeholder="Enter repayment amount"
              />
            </Grid>

            {otpSent && (
              <Grid item xs={12} sm={4}>
                <CustomTextField
                  label="Enter OTP"
                  value={formData.otp}
                  onChange={(e) => handleFormChange('otp', e.target.value)}
                  error={Boolean(errors.otp)}
                  helperText={errors.otp}
                  fullWidth
                  inputProps={{ maxLength: 6 }}
                  placeholder="4-6 digit OTP"
                />
              </Grid>
            )}

            <Grid item xs={12} className="flex justify-center gap-4 mt-4">
              {!otpSent ? (
                <Button variant="outlined" color="primary" size="large" onClick={handleSendOtp}>
                  Send OTP
                </Button>
              ) : (
                <Button variant="contained" color="primary" size="large" type="submit">
                  Submit Repayment
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default LoanRepaymentScreen
