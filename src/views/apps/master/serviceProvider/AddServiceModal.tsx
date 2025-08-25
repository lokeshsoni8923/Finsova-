'use client'
import { useEffect, useState } from 'react'
import { Snackbar, Alert } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { useForm, Controller } from 'react-hook-form'
import CustomTextField from '@core/components/mui/TextField'
import { UpdateServiceProvider, CreateServiceProvider } from '@/app/api/master/serviceProviderMaster/serviceMaster'
import { ServiceProviderType } from '.'

type Props = {
  open: boolean
  handleClose: () => void
  serviceProviderData?: ServiceProviderType[]
  onSuccess: () => void
  editData?: ServiceProviderType | null
}

type FormValidateType = {
  providerName: string
  serviceType: string
  operatorCode: string
  status: 'Active' | 'Inactive'
}

const AddServiceProviderModal = (props: Props) => {
  // Props
  const { open, handleClose, onSuccess, editData } = props
  const [successState, setSuccessState] = useState<{ message: string } | null>(null)
  const [errorState, setErrorState] = useState<{ message: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Hooks
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateType>({
    defaultValues: {
      providerName: '',
      serviceType: '',
      operatorCode: '',
      status: 'Active'
    }
  })

  // Set form values when in edit mode
  useEffect(() => {
    if (editData) {
      reset({
        providerName: editData.providerName,
        serviceType: editData.serviceType,
        operatorCode: editData.operatorCode,
        status: editData.status
      })
    } else {
      reset({
        providerName: '',
        serviceType: '',
        operatorCode: '',
        status: 'Active'
      })
    }
  }, [editData, reset])

  const onSubmit = async (data: FormValidateType) => {
    setIsSubmitting(true)
    try {
      let res
      if (editData) {
        res = await UpdateServiceProvider(editData._id, data)
      } else {
        res = await CreateServiceProvider(data)
      }

      if (res.success) {
        setSuccessState({
          message: editData ? 'Service Provider updated successfully' : 'Service Provider created successfully'
        })
        onSuccess()
        handleClose()
      } else {
        setErrorState({ message: res.error || 'Operation failed' })
      }
    } catch (err: any) {
      setErrorState({ message: err.message || 'An error occurred' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    reset()
    handleClose()
  }

  return (
    <>
      <Dialog open={open} onClose={handleReset} fullWidth maxWidth='sm'>
        <DialogTitle sx={{ position: 'relative', pr: 6 }}>
          <Typography variant='h6' component='span'>
            {editData ? 'Edit Service Provider' : 'Add New Service Provider'}
          </Typography>
          <IconButton size='small' onClick={handleReset} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers className='flex flex-col gap-6 p-6'>
            <Controller
              name='providerName'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Provider Name'
                  placeholder='e.g., Airtel'
                  error={!!errors.providerName}
                  helperText={errors.providerName && 'Provider name is required'}
                />
              )}
            />

            <Controller
              name='serviceType'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Service Type'
                  placeholder='e.g., Recharge'
                  error={!!errors.serviceType}
                  helperText={errors.serviceType && 'Service type is required'}
                />
              )}
            />

            <Controller
              name='operatorCode'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Operator Code'
                  placeholder='e.g., AIR123'
                  error={!!errors.operatorCode}
                  helperText={errors.operatorCode && 'Operator code is required'}
                />
              )}
            />

            <Controller
              name='status'
              control={control}
              render={({ field }) => (
                <CustomTextField select fullWidth label='Status' {...field}>
                  <MenuItem value='Active'>Active</MenuItem>
                  <MenuItem value='Inactive'>Inactive</MenuItem>
                </CustomTextField>
              )}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 3, gap: 2, justifyContent: 'flex-end' }}>
            <Button variant='tonal' color='error' onClick={handleReset}>
              Cancel
            </Button>
            <Button variant='contained' type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={!!successState}
        autoHideDuration={3000}
        onClose={() => setSuccessState(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity='success' onClose={() => setSuccessState(null)}>
          {successState?.message}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorState}
        autoHideDuration={3000}
        onClose={() => setErrorState(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity='error' onClose={() => setErrorState(null)}>
          {errorState?.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AddServiceProviderModal
