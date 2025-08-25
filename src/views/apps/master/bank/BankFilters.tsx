// React Imports
'use client'
import { useState, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import { BankType } from '.'

const BankFilters = ({ setData, tableData }: { setData: (data: BankType[]) => void; tableData?: BankType[] }) => {
  // States
  const [accountType, setAccountType] = useState<BankType['accountType']>('')
  const [paymentType, setPaymentType] = useState<BankType['paymentType']>('')
  const [status, setStatus] = useState<BankType['isActive']>(false)

  useEffect(() => {
    const filteredData = tableData?.filter(user => {
      if (accountType && user.accountType !== accountType) return false
      if (paymentType && user.paymentType !== paymentType) return false
      if (status && user.isActive !== status) return false

      return true
    })

    setData(filteredData || [])
  }, [accountType, paymentType, status, tableData, setData])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            select
            fullWidth
            id='select-role'
            value={accountType}
            onChange={e => setAccountType(e.target.value as BankType['accountType'])}
            slotProps={{
              select: { displayEmpty: true }
            }}
          >
            <MenuItem value=''>Select Account Type</MenuItem>
            <MenuItem value='savings'>Savings</MenuItem>
            <MenuItem value='current'>Current</MenuItem>
            <MenuItem value='fixed'>Fixed</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            select
            fullWidth
            id='select-payment-type'
            value={paymentType}
            onChange={e => setPaymentType(e.target.value as BankType['paymentType'])}
            slotProps={{
              select: { displayEmpty: true }
            }}
          >
            <MenuItem value=''>Select Payment Type</MenuItem>
            <MenuItem value='transaction-account-details'>Transaction Account Details</MenuItem>
            <MenuItem value='cash-deposit'>Cash Deposit</MenuItem>
            <MenuItem value='online-transfer'>Online Transfer (IMPS/NEFT/RTGS)</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            select
            fullWidth
            id='select-status'
            value={status}
            onChange={e => setStatus(e.target.value === '' ? false : e.target.value === 'active')}
            slotProps={{
              select: { displayEmpty: true }
            }}
          >
            <MenuItem value=''>Select Status</MenuItem>
            <MenuItem value='pending'>Pending</MenuItem>
            <MenuItem value='active'>Active</MenuItem>
            <MenuItem value='inactive'>Inactive</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default BankFilters
