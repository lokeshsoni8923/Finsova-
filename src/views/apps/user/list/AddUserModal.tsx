// React Imports
'use client'
import { useState, useEffect } from 'react'
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
import { registerWithAPI } from '@/app/api/auth/auth'
import { UpdateUser } from '@/app/api/user/user'
import { GetAllRoles } from '@/app/api/master/roleMaster/roleMaster'

type Props = {
  open: boolean
  handleClose: () => void
  userData?: UsersType[]
  setData: React.Dispatch<React.SetStateAction<UsersType[]>>
  onSuccess: () => void
  mode: 'add' | 'edit'
  editData?: UsersType | null
}

type FormValidateType = {
  contact: string
  country: string
  fullName: string
  username: string
  email: string
  role: string
  plan: string
  status: string
}

const AddUserModal = (props: Props) => {
  // Props
  const { open, handleClose, userData, setData, onSuccess, mode, editData } = props
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
      fullName: '',
      username: '',
      email: '',
      role: '',
      status: '',
      contact: '',
      country: ''
    }
  })

  // Add useEffect to reset form when modal opens in add mode
  useEffect(() => {
    if (open && mode === 'add') {
      resetForm({
        fullName: '',
        username: '',
        email: '',
        role: '',
        status: '',
        contact: '',
        country: ''
      })
    }
  }, [open, mode, resetForm])

  // Existing useEffect for edit mode
  useEffect(() => {
    if (mode === 'edit' && editData) {
      resetForm({
        fullName: editData.name,
        username: editData.username,
        email: editData.email,
        role: editData.role,
        status: editData.isActive ? 'active' : 'inactive',
        contact: editData.contact,
        country: editData.country
      })
    }
  }, [mode, editData, resetForm])
  const [roles, setRoles] = useState<string[]>([])

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await GetAllRoles({ status: 'Active' })
        if (res.success && res.data) {
          // extract only role names
          setRoles(res.data.map((role: any) => role.roleName))
        }
      } catch (err) {
        console.error('Failed to fetch roles', err)
      }
    }
    fetchRoles()
  }, [])

  const onSubmit = async (data: FormValidateType) => {
    let status = data.status === 'active'

    const userData = {
      name: data.fullName,
      username: data.username,
      email: data.email,
      role: data.role,
      country: data.country,
      contact: data.contact,
      isActive: status,
      isKycCompleted: mode === 'edit' ? editData?.isKycCompleted : false
    }

    try {
      if (mode === 'edit') {
        // Call update API instead of register
        const res = await UpdateUser(userData)
        if (res && res.success) {
          setSuccessState({ message: 'User updated successfully' })
          handleClose()
          resetForm()
          onSuccess()
        } else {
          setErrorState({ message: res.error?.message || 'Update failed' })
        }
      } else {
        // Existing register logic
        const res = await registerWithAPI(userData)
        if (res && res.success && !res.error) {
          setSuccessState({ message: 'User registered successfully' })
          handleClose()
          resetForm()
          onSuccess()
        } else {
          setErrorState({ message: res.error?.message || 'Registration failed' })
        }
      }
    } catch (err: any) {
      setErrorState({ message: err.message || `${mode === 'edit' ? 'Update' : 'Registration'} failed` })
    }
  }

  const handleReset = () => {
    handleClose()
  }

  return (
    <>
      <Dialog open={open} onClose={handleReset} fullWidth maxWidth='sm'>
        <DialogTitle sx={{ position: 'relative', pr: 6 }}>
          <Typography variant='h6' component='span'>
            {mode === 'edit' ? 'Edit User' : 'Add New User'}
          </Typography>
          <IconButton size='small' onClick={handleReset} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit(data => onSubmit(data))}>
          <DialogContent dividers className='flex flex-col gap-6 p-6'>
            <Controller
              name='fullName'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Full Name'
                  placeholder='John Doe'
                  {...(errors.fullName && { error: true, helperText: 'This field is required.' })}
                />
              )}
            />
            <Controller
              name='username'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Username'
                  placeholder='johndoe'
                  {...(errors.username && { error: true, helperText: 'This field is required.' })}
                />
              )}
            />
            <Controller
              name='email'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  type='email'
                  label='Email'
                  placeholder='johndoe@gmail.com'
                  {...(errors.email && { error: true, helperText: 'This field is required.' })}
                />
              )}
            />
            <Controller
              name='role'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  select
                  fullWidth
                  id='select-role'
                  label='Select Role'
                  {...field}
                  {...(errors.role && { error: true, helperText: 'This field is required.' })}
                >
                  {roles.map(role => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </CustomTextField>
              )}
            />
            <Controller
              name='status'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  select
                  fullWidth
                  id='select-status'
                  label='Select Status'
                  {...field}
                  {...(errors.status && { error: true, helperText: 'This field is required.' })}
                >
                  <MenuItem value='active'>Active</MenuItem>
                  <MenuItem value='inactive'>Inactive</MenuItem>
                </CustomTextField>
              )}
            />
            <Controller
              name='country'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  select
                  fullWidth
                  id='select-country'
                  label='Select country'
                  {...field}
                  {...(errors.country && { error: true, helperText: 'This field is required.' })}
                >
                  <MenuItem value='India'>India</MenuItem>
                  <MenuItem value='USA'>USA</MenuItem>
                  <MenuItem value='Australia'>Australia</MenuItem>
                  <MenuItem value='Germany'>Germany</MenuItem>
                </CustomTextField>
              )}
            />
            <Controller
              name='contact'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Contact'
                  placeholder='(397) 294-5153'
                  {...(errors.contact && { error: true, helperText: 'This field is required.' })}
                />
              )}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 3, gap: 2, mt: 3, justifyContent: 'flex-end' }}>
            <Button variant='tonal' color='error' type='button' onClick={handleReset}>
              Cancel
            </Button>
            <Button variant='contained' type='submit'>
              Submit
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
        <Alert onClose={() => setSuccessState(null)} severity='success' variant='filled'>
          {successState?.message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!errorState}
        autoHideDuration={3000}
        onClose={() => setErrorState(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setErrorState(null)} severity='error' variant='filled'>
          {errorState?.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AddUserModal
