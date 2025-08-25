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
import CloseIcon from '@mui/icons-material/Close'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

// Additional MUI Imports
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'
import ClearIcon from '@mui/icons-material/Clear'
import SendIcon from '@mui/icons-material/Send'
import UploadFileIcon from '@mui/icons-material/UploadFile'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Types Imports
import type { UsersType } from '@/types/apps/userTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
// import { submitFundRequest } from '@/app/api/fund-request' // placeholder for API integration

type Props = {
  open: boolean
  handleClose: () => void
  userData?: UsersType[]
  setData: React.Dispatch<React.SetStateAction<UsersType[]>>
  onSuccess: () => void
}

type FormValidateType = {
  modeOfPayment: string
  companyBank: string
  referenceNumber: string
  amount: string
  date: string
  time: string
  remarks: string
  fileName?: string
}

const FundRequestModal = (props: Props) => {
  // Props
  const { open, handleClose, onSuccess } = props
  const [successState, setSuccessState] = useState<{ message: string } | null>(null)
  const [errorState, setErrorState] = useState<{ message: string } | null>(null)
  const [fileName, setFileName] = useState<string>('')

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<FormValidateType>({
    defaultValues: {
      modeOfPayment: '',
      companyBank: '',
      referenceNumber: '',
      amount: '',
      date: '',
      time: '',
      remarks: '',
      fileName: ''
    }
  })

  const onSubmit = async (data: FormValidateType) => {
    try {
      // await submitFundRequest(data)
      setSuccessState({ message: 'Money sent successfully' })
      handleClose()
      resetForm()
      onSuccess()
    } catch (err: any) {
      setErrorState({ message: err.message || 'Transfer failed' })
    }
  }

  const handleReset = () => {
    handleClose()
    resetForm()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      setValue('fileName', file.name)
    }
  }

  const handleClearAmount = () => {
    setValue('amount', '')
  }

  const handleAddMoreTransaction = () => {
    // Implement add more transaction logic
    console.log('Add more transaction clicked')
  }

  return (
    <>
      <Dialog open={open} onClose={handleReset} fullWidth maxWidth='md'>
        <div className='flex items-center justify-between plb-4 pli-6'>
          <DialogTitle className='p-0'>Wallet Transfer</DialogTitle>
          <IconButton size='small' onClick={handleReset}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent dividers>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 pbs-2'>
            {/* Two items per row using Grid */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
              {/* Mode of Payment */}
              <Controller
                name='modeOfPayment'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.modeOfPayment}>
                    <InputLabel>Select Mode of Payment</InputLabel>
                    <Select {...field} label='Select Mode of Payment'>
                      <MenuItem value='upi'>UPI</MenuItem>
                      <MenuItem value='bank_transfer'>Bank Transfer</MenuItem>
                      <MenuItem value='card'>Card Payment</MenuItem>
                      <MenuItem value='cash'>Cash</MenuItem>
                    </Select>
                    {errors.modeOfPayment && (
                      <Typography variant='caption' color='error'>This field is required</Typography>
                    )}
                  </FormControl>
                )}
              />

              {/* Company Bank */}
              <Controller
                name='companyBank'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.companyBank}>
                    <InputLabel>Select Company Bank</InputLabel>
                    <Select {...field} label='Select Company Bank'>
                      <MenuItem value='hdfc'>HDFC Bank</MenuItem>
                      <MenuItem value='sbi'>State Bank of India</MenuItem>
                      <MenuItem value='icici'>ICICI Bank</MenuItem>
                      <MenuItem value='axis'>Axis Bank</MenuItem>
                    </Select>
                    {errors.companyBank && (
                      <Typography variant='caption' color='error'>This field is required</Typography>
                    )}
                  </FormControl>
                )}
              />

              {/* Reference Number */}
              <Controller
                name='referenceNumber'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Reference Number'
                    {...(errors.referenceNumber && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />

              {/* Amount */}
              <Controller
                name='amount'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Box sx={{ position: 'relative' }}>
                    <CustomTextField
                      {...field}
                      fullWidth
                      type='number'
                      label='Amount'
                      InputProps={{
                        startAdornment: <Typography variant='body2' sx={{ mr: 1 }}>₹</Typography>,
                        endAdornment: watch('amount') && (
                          <IconButton size='small' onClick={handleClearAmount}>
                            <ClearIcon />
                          </IconButton>
                        )
                      }}
                      {...(errors.amount && { error: true, helperText: 'This field is required.' })}
                    />
                  </Box>
                )}
              />

              {/* Date */}
              <Controller
                name='date'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type='date'
                    label='Date'
                    InputLabelProps={{ shrink: true }}
                    {...(errors.date && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />

              {/* Time */}
              <Controller
                name='time'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type='time'
                    label='Time'
                    InputLabelProps={{ shrink: true }}
                    {...(errors.time && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />

              {/* File Upload */}
              <Box>
                <input
                  accept='image/*,.pdf'
                  style={{ display: 'none' }}
                  id='receipt-file'
                  type='file'
                  onChange={handleFileChange}
                />
                <label htmlFor='receipt-file'>
                  <Button
                    variant='outlined'
                    component='span'
                    startIcon={<UploadFileIcon />}
                    fullWidth
                  >
                    Choose Files
                  </Button>
                </label>
                <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
                  {fileName || 'No file chosen'}
                </Typography>
              </Box>

              {/* Remarks */}
             
            </Box>
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

            {/* Full width button */}
            <Button
              variant='contained'
              fullWidth
              startIcon={<AddIcon />}
              onClick={handleAddMoreTransaction}
            >
              Add More Transaction
            </Button>

            <DialogActions className='pli-0 pbs-0 pbe-0'>
              <div className='flex items-center gap-4 pli-0'>
                <Button 
                  variant='contained'
                  type='submit'
                  startIcon={<SendIcon />}
                  sx={{ backgroundColor: '#00D4AA', '&:hover': { backgroundColor: '#00B894' } }}
                >
                  Send Request
                </Button>
                <Button variant='outlined' color='error' onClick={handleReset}>
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

export default FundRequestModal
