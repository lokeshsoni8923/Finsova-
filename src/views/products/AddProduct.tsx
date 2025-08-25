// React Imports
'use client'
import { useState } from 'react'
import { Snackbar, Alert } from '@mui/material'


// MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Types Imports
import type { UsersType } from '@/types/apps/userTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
// import { walletTransferAPI } from '@/app/api/wallet/transfer' // Placeholder for future integration

type Props = {
  open: boolean
  handleClose: () => void
  userData?: UsersType[]
  setData: React.Dispatch<React.SetStateAction<UsersType[]>>
  onSuccess: () => void
}

type FormValidateType = {
  modeOfPayment: string
  amount: string
  remarks: string
}

const AddwalletDrawer = (props: Props) => {
  // Props
  const { open, handleClose, onSuccess } = props
  const [successState, setSuccessState] = useState<{ message: string } | null>(null)
  const [errorState, setErrorState] = useState<{ message: string } | null>(null)
  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateType>({
    defaultValues: {
      modeOfPayment: '',
      amount: '',
      remarks: ''
    }
  })

  const onSubmit = async (data: FormValidateType) => {
    try {
      // await walletTransferAPI(data)
      setSuccessState({ message: 'Wallet transfer submitted' })
      handleClose()
      resetForm()
      onSuccess()
    } catch (err: any) {
      setErrorState({ message: err.message || 'Submission failed' })
    }
  }

  const handleReset = () => {
    handleClose()
  }

  return (
    <>
    <Dialog open={open} onClose={handleReset} fullWidth maxWidth='sm'>
      <div className='flex items-center justify-between plb-4 pli-6'>
        <DialogTitle className='p-0'>Wallet Transfer</DialogTitle>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <DialogContent dividers>
        <form onSubmit={handleSubmit(data => onSubmit(data))} className='flex flex-col gap-6 pbs-2'>
          <Controller
            name='modeOfPayment'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Mode of Payment'
                placeholder='Select Mode of Payment'
                {...field}
                {...(errors.modeOfPayment && { error: true, helperText: 'This field is required.' })}
              >
                <MenuItem value='UPI'>UPI</MenuItem>
                <MenuItem value='Bank Transfer'>Bank Transfer</MenuItem>
                <MenuItem value='Cash'>Cash</MenuItem>
                <MenuItem value='Cheque'>Cheque</MenuItem>
              </CustomTextField>
            )}
          />

          <Controller
            name='amount'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                type='number'
                label='Amount'
                placeholder='Enter amount'
                inputProps={{ min: 0, step: '0.01' }}
                {...(errors.amount && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />

          <Controller
            name='remarks'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                multiline
                rows={3}
                label='Remarks'
                placeholder='Write remarks'
                {...(errors.remarks && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <DialogActions className='pli-0 pbs-0 pbe-0'>
            <div className='flex items-center gap-4 pli-0'>
              <Button variant='contained' type='submit'>
                Send Money
              </Button>
              <Button variant='tonal' color='error' type='button' onClick={() => handleReset()}>
                Cancel
              </Button>
            </div>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
    <Snackbar
      open={!!successState}
      autoHideDuration={3000}
      onClose={() => setSuccessState(null)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
        <Alert onClose={() => setSuccessState(null)} severity="success" variant="filled">
          {successState?.message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!errorState}
        autoHideDuration={3000}
        onClose={() => setErrorState(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setErrorState(null)} severity="error" variant="filled">
          {errorState?.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AddwalletDrawer
