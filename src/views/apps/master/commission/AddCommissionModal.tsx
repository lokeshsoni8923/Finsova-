'use client'

import { Modal, Box, Typography, TextField, Button, Switch, FormControlLabel, Grid } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { CommissionType } from '.'
import { useEffect } from 'react'
import { UpdateCommission, CreateCommission } from '@/app/api/master/commissionMaster/commissionMaster'

export type CommissionForm = {
  service: string
  serviceName?: string
  operatorName?: string
  minAmount?: number
  maxAmount?: number
  commissionPercent?: number
  status: 'Active' | 'Inactive'
}

type Props = {
  open: boolean
  handleClose: () => void
  commissionData: CommissionType[]
  setData: React.Dispatch<React.SetStateAction<CommissionType[]>>
  initialData?: CommissionType
  onSuccess: () => void
}

const AddCommissionModal = ({ open, handleClose, initialData, onSuccess }: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setError
  } = useForm<CommissionForm>({
    defaultValues: initialData
      ? {
          service: initialData.service,
          serviceName: initialData.serviceName,
          operatorName: initialData.operatorName,
          minAmount: initialData.minAmount,
          maxAmount: initialData.maxAmount,
          commissionPercent: initialData.commissionPercent,
          status: initialData.status as 'Active' | 'Inactive'
        }
      : {
          service: '',
          serviceName: '',
          operatorName: '',
          minAmount: undefined,
          maxAmount: undefined,
          commissionPercent: undefined,
          status: 'Active'
        }
  })

  useEffect(() => {
    if (initialData) {
      reset({
        service: initialData.service,
        serviceName: initialData.serviceName,
        operatorName: initialData.operatorName,
        minAmount: initialData.minAmount,
        maxAmount: initialData.maxAmount,
        commissionPercent: initialData.commissionPercent,
        status: initialData.status as 'Active' | 'Inactive'
      })
    } else {
      reset({
        service: '',
        serviceName: '',
        operatorName: '',
        minAmount: undefined,
        maxAmount: undefined,
        commissionPercent: undefined,
        status: 'Active'
      })
    }
  }, [initialData, reset])

  const onSubmit = async (data: CommissionForm) => {
    // Validate amount range
    if (data.minAmount && data.maxAmount && data.minAmount >= data.maxAmount) {
      setError('minAmount', { message: 'Min amount must be less than max amount' })
      setError('maxAmount', { message: 'Max amount must be greater than min amount' })
      return
    }

    const payload = {
      service: data.service,
      serviceName: data.serviceName,
      operatorName: data.operatorName,
      minAmount: data.minAmount,
      maxAmount: data.maxAmount,
      commissionPercent: data.commissionPercent,
      status: data.status
    }

    let res
    if (initialData?._id) {
      res = await UpdateCommission(initialData._id, payload)
    } else {
      res = await CreateCommission(payload)
    }

    if (res.success) {
      onSuccess()
      reset()
      handleClose()
    } else {
      console.error(res.error || 'Something went wrong')
    }
  }

  const minAmount = watch('minAmount')
  const maxAmount = watch('maxAmount')

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: '10%', bgcolor: 'background.paper', overflowY: 'auto' }}>
        <Typography variant='h6'>{initialData ? 'Update Commission' : 'Add New Commission'}</Typography>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-3'>
          <Controller
            name='service'
            control={control}
            rules={{ required: 'Service is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Service Code'
                error={!!errors.service}
                helperText={errors.service?.message}
              />
            )}
          />

          <Controller
            name='serviceName'
            control={control}
            render={({ field }) => <TextField {...field} fullWidth label='Service Name (Optional)' />}
          />

          <Controller
            name='operatorName'
            control={control}
            render={({ field }) => <TextField {...field} fullWidth label='Operator Name (Optional)' />}
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controller
                name='minAmount'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='number'
                    label='Minimum Amount'
                    error={!!errors.minAmount}
                    helperText={errors.minAmount?.message}
                    onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name='maxAmount'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='number'
                    label='Maximum Amount'
                    error={!!errors.maxAmount}
                    helperText={errors.maxAmount?.message}
                    onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Controller
            name='commissionPercent'
            control={control}
            rules={{
              min: { value: 0, message: 'Commission must be at least 0%' },
              max: { value: 100, message: 'Commission cannot exceed 100%' }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type='number'
                label='Commission Percentage'
                error={!!errors.commissionPercent}
                helperText={errors.commissionPercent?.message || 'Enter a value between 0 and 100'}
                onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                InputProps={{
                  endAdornment: '%'
                }}
              />
            )}
          />

          <Controller
            name='status'
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={field.value === 'Active'}
                    onChange={e => field.onChange(e.target.checked ? 'Active' : 'Inactive')}
                  />
                }
                label='Active'
              />
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

export default AddCommissionModal
