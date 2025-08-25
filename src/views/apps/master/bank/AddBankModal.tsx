'use client'

import { UpdateBank, CreateBank } from '@/app/api/master/bankMaster/bankMaster'

import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { BankType } from '.'
import { useEffect } from 'react'

type AccountType = 'Savings' | 'Current' | 'Other'
type PaymentType = 'Cash Deposit' | 'Online Transfer' | 'Transaction Account Details'

export type BankForm = {
  bankName: string
  paymentType: PaymentType | ''
  accountHolder: string
  accountNumber: string
  ifsc: string
  nickname?: string
  accountType: AccountType | ''
  isActive: boolean
}

type Props = {
  open: boolean
  handleClose: () => void
  initialData?: BankType
  onSuccess: () => void
  onSubmit?: (newBank: BankForm) => void
}

const AddBankModal = ({ open, handleClose, initialData, onSuccess }: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<BankForm>({
    defaultValues: initialData
      ? {
          paymentType: initialData.paymentType,
          bankName: initialData.bankName,
          accountHolder: initialData.accountHolderName,
          accountNumber: initialData.accountNumber,
          ifsc: initialData.ifsc,
          nickname: initialData.nickname || '',
          accountType: (initialData.accountType as AccountType) || undefined,
          isActive: initialData.status === 'Active'
        }
      : {
          paymentType: undefined,
          bankName: '',
          accountHolder: '',
          accountNumber: '',
          ifsc: '',
          nickname: '',
          accountType: undefined,
          isActive: true
        }
  })

  useEffect(() => {
    if (initialData) {
      reset({
        paymentType: (initialData.paymentType as PaymentType | undefined) || undefined,
        bankName: initialData.bankName,
        accountHolder: initialData.accountHolderName,
        accountNumber: initialData.accountNumber,
        ifsc: initialData.ifsc,
        nickname: initialData.nickname || '',
        accountType: initialData.accountType,
        isActive: initialData.status === 'Active'
      })
    } else {
      reset({
        paymentType: undefined,
        bankName: '',
        accountHolder: '',
        accountNumber: '',
        ifsc: '',
        nickname: '',
        accountType: undefined,
        isActive: true
      })
    }
  }, [initialData, reset])

  const onSubmit = async (data: BankForm) => {
    const payload = {
      bankName: data.bankName,
      accountNumber: String(data.accountNumber),
      ifsc: data.ifsc,
      accountHolderName: data.accountHolder,
      nickname: data.nickname || undefined,
      accountType: data.accountType as 'Savings' | 'Current' | 'Other',
      paymentType: data.paymentType as 'Cash Deposit' | 'Online Transfer' | 'Transaction Account Details',
      status: data.isActive ? 'Active' : ('Inactive' as 'Active' | 'Inactive')
    }

    let res
    if (initialData?._id) {
      // Update flow
      res = await UpdateBank(initialData._id, payload)
    } else {
      // Create flow
      res = await CreateBank(payload)
    }

    if (res.success) {
      onSuccess()
      reset()
      handleClose()
    } else {
      console.error(res.error || 'Something went wrong')
    }
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: '10%', bgcolor: 'background.paper', overflowY: 'auto' }}>
        <Typography variant='h6'>{initialData ? 'Update Bank' : 'Add New Bank'}</Typography>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-3'>
          <InputLabel id='payment-type-label'>Payment Types</InputLabel>
          <Controller
            name='paymentType'
            control={control}
            render={({ field }) => (
              <Select {...field} fullWidth label='Payment Type'>
                <MenuItem value='Cash Deposit'>Cash Deposit</MenuItem>
                <MenuItem value='Online Transfer'>Online Transfer</MenuItem>
              </Select>
            )}
          />

          <Controller
            name='bankName'
            control={control}
            rules={{ required: 'Bank name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Bank Name'
                error={!!errors.bankName}
                helperText={errors.bankName?.message}
              />
            )}
          />

          {/* Grid for side-by-side fields */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controller
                name='accountHolder'
                control={control}
                rules={{ required: 'Account holder is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Account Holder'
                    error={!!errors.accountHolder}
                    helperText={errors.accountHolder?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name='accountNumber'
                control={control}
                rules={{ required: 'Account number is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Account Number'
                    error={!!errors.accountNumber}
                    helperText={errors.accountNumber?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          {/* Another row of side-by-side fields */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controller
                name='ifsc'
                control={control}
                rules={{ required: 'IFSC code is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='IFSC Code'
                    error={!!errors.ifsc}
                    helperText={errors.ifsc?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name='nickname'
                control={control}
                render={({ field }) => <TextField {...field} fullWidth label='Nickname (Optional)' />}
              />
            </Grid>
          </Grid>

          <Controller
            name='accountType'
            control={control}
            render={({ field }) => (
              <Select {...field} fullWidth>
                <MenuItem value='Savings'>Savings</MenuItem>
                <MenuItem value='Current'>Current</MenuItem>
                <MenuItem value='Other'>Other</MenuItem>
              </Select>
            )}
          />

          <Controller
            name='isActive'
            control={control}
            render={({ field }) => (
              <FormControlLabel control={<Switch {...field} checked={field.value} />} label='Active' />
            )}
          />

          <Box display='flex' justifyContent='flex-end' gap={2}>
            <Button onClick={handleClose} color='secondary'>
              Cancel
            </Button>
            <Button type='submit' variant='contained'>
              {initialData ? 'Update' : 'Add'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default AddBankModal
