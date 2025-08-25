'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Grid,
  Box,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  Snackbar,
  Alert
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'

type TicketFormData = {
  issueType: 'transaction' | 'general'
  serviceName: string
  transactionDate: string
  referenceNumber: string
  subject: string
  description: string
  attachment?: File
}

type Props = {
  open: boolean
  handleClose: () => void
  onSubmit: (data: TicketFormData) => void
}

const AddSupportTicket = ({ open, handleClose, onSubmit }: Props) => {
  const [file, setFile] = useState<File | null>(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<TicketFormData>({
    defaultValues: {
      issueType: 'transaction',
      serviceName: '',
      transactionDate: '',
      referenceNumber: '',
      subject: '',
      description: ''
    }
  })

  const issueType = watch('issueType')

  const services = [
    'BBPS',
    'CMS',
    'CCBP',
    'AEPS1',
    'AEPS2',
    'Express Pay',
    'Recharge'
  ]

  // Add mock transaction data - replace with your actual data
  const transactions = [
    { id: 'TXN001', amount: '1000', date: '2024-02-20' },
    { id: 'TXN002', amount: '2000', date: '2024-02-21' },
    { id: 'TXN003', amount: '3000', date: '2024-02-22' },
  ]

  const handleFormSubmit = async (data: TicketFormData) => {
    try {
      if (file) {
        data.attachment = file
      }
      await onSubmit(data)
      setSuccessMessage('Ticket submitted successfully')
      reset()
      setFile(null)
      handleClose()
    } catch (error) {
      setErrorMessage('Failed to submit ticket')
    }
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant='h6'>Create Support Ticket</Typography>
              <IconButton onClick={handleClose}>
                <i className='tabler-x' />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent dividers sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <Grid container spacing={3} sx={{ pt: 1 }}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel>Issue Type</FormLabel>
                  <Controller
                    name='issueType'
                    control={control}
                    render={({ field }) => (
                      <RadioGroup {...field} row>
                        <FormControlLabel 
                          value='transaction' 
                          control={<Radio />} 
                          label='Transaction Related Issue' 
                        />
                        <FormControlLabel 
                          value='general' 
                          control={<Radio />} 
                          label='General Issue/Query' 
                        />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </Grid>

              {issueType === 'transaction' && (
                <>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Service Name</InputLabel>
                      <Controller
                        name='serviceName'
                        control={control}
                        rules={{ required: 'Service name is required' }}
                        render={({ field }) => (
                          <Select {...field} label='Service Name'>
                            {services.map(service => (
                              <MenuItem key={service} value={service}>{service}</MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Controller
                      name='transactionDate'
                      control={control}
                      rules={{ required: 'Transaction date is required' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type='date'
                          label='Transaction Date'
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          error={!!errors.transactionDate}
                          helperText={errors.transactionDate?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Transaction Reference</InputLabel>
                      <Controller
                        name='referenceNumber'
                        control={control}
                        rules={{ required: 'Reference number is required' }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            label='Transaction Reference'
                            error={!!errors.referenceNumber}
                          >
                            {transactions.map((txn) => (
                              <MenuItem key={txn.id} value={txn.id}>
                                {`${txn.id} - ₹${txn.amount} (${txn.date})`}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </FormControl>
                    {errors.referenceNumber && (
                      <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                        {errors.referenceNumber.message}
                      </Typography>
                    )}
                  </Grid>
                </>
              )}

              <Grid item xs={12} sm={6}>
                <Controller
                  name='subject'
                  control={control}
                  rules={{ required: 'Subject is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label='Ticket Subject'
                      fullWidth
                      error={!!errors.subject}
                      helperText={errors.subject?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name='description'
                  control={control}
                  rules={{ required: 'Description is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label='Issue Description'
                      multiline
                      rows={4}
                      fullWidth
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Box>
                  <Button
                    variant='outlined'
                    component='label'
                    startIcon={<i className='tabler-upload' />}
                  >
                    Upload Attachment
                    <input
                      type='file'
                      hidden
                      accept='.pdf,.jpg,.jpeg,.png'
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file && file.size <= 2 * 1024 * 1024) { // 2MB limit
                          setFile(file)
                        } else {
                          setErrorMessage('File size should be less than 2MB')
                        }
                      }}
                    />
                  </Button>
                  {file && (
                    <Typography variant='caption' display='block' sx={{ mt: 1 }}>
                      Selected file: {file.name}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'flex-end', mt:4 }}>
              <Button variant='outlined' onClick={handleClose}>
                Cancel
              </Button>
              <Button type='submit' variant='contained'>
                Submit Ticket
              </Button>
            </Box>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity='success' onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={3000}
        onClose={() => setErrorMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity='error' onClose={() => setErrorMessage('')}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AddSupportTicket