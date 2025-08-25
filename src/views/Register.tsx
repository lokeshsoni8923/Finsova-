'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'

// Third-party Imports
import classnames from 'classnames'
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { email, object, minLength, string, pipe, nonEmpty, regex } from 'valibot'

// Type Imports
import type { SystemMode } from '@core/types'
import type { Locale } from '@/configs/i18n'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// API Imports
// import { registerWithAPI } from '../app/api/auth/auth'
import { useUserFormStore, useUserStore } from '@/store/useUserStore'
import { Box, Card } from '@mui/material'
import Image from 'next/image'

// Styled Components
const RegisterIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 600,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: { maxBlockSize: 550 },
  [theme.breakpoints.down('lg')]: { maxBlockSize: 450 }
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 345,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

// Type Definitions
type ErrorType = { message: string }

const schema = object({
  name: pipe(string(), minLength(1, 'This field is required')),
  username: pipe(string(), minLength(1, 'This field is required')),
  email: pipe(string(), minLength(1, 'This field is required'), email('Email is invalid')),
  contact: pipe(string(), minLength(1, 'This field is required'), regex(/^[6-9]\d{9}$/, 'Mobile No is invalid')),
  password: pipe(
    string(),
    nonEmpty('This field is required'),
    regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._#^+=-])[A-Za-z\d@$!%*?&._#^+=-]{8,}$/,
      'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'
    )
  )
})

type FormData = {
  name: string
  username: string
  email: string
  contact?: string
  password: string
}

const Register = ({ mode }: { mode: SystemMode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [errorState, setErrorState] = useState<ErrorType | null>(null)

  // Hooks
  const { lang: locale } = useParams()
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode, '/images/pages/auth-mask-light.png', '/images/pages/auth-mask-dark.png')
  const router = useRouter()
  const searchParams = useSearchParams()

  const characterIllustration = useImageVariant(
    mode,
    '/images/illustrations/auth/v2-register-light.png',
    '/images/illustrations/auth/v2-register-dark.png',
    '/images/illustrations/auth/v2-register-light-border.png',
    '/images/illustrations/auth/v2-register-dark-border.png'
  )

  // Form Setup
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      contact: '',
      password: ''
    }
  })

  // Submit Handler
  const onSubmit = async (data: FormData) => {
    try {
      debugger
      let obj = {
        name: data.name,
        username: data.username,
        email: data.email,
        contact: data.contact,
        password: data.password
      }
      useUserFormStore.getState().setFormData(obj)
      console.log('Stored in global state:', useUserFormStore.getState().formData)
      router.replace(`/${locale}/pages/auth/verify-email-v2`)
    } catch (err: any) {
      setErrorState({ message: err.message || 'Registration failed' })
    }
  }

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        p: 2
      }}
    >
      {/* Container for both cards */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          alignItems: 'center'
        }}
      >
        {/* Left Image Card */}
        <Card sx={{ display: 'flex', boxShadow: 4, borderRadius: 3 }}>
          <Box
            component='img'
            src='/images/banner/finsova-login-banner.png'
            alt='Festival Bonanza Scheme'
            sx={{
              width: { xs: '100%', md: '600px' },
              height: { xs: 'auto', md: '800px' }
            }}
          />
          <Box
            sx={{
              width: { xs: '100%', md: '500px' },
              height: { xs: 'auto', md: '800px' },
              objectFit: 'cover'
            }}
            className='p-5 flex  justify-center items-center gap-4'
          >
             <div className=''>
                 <div className='flex justify-center items-start'>
                  <Image src={'/images/logos/FINSOVA.v2_logo.png'} width={300} height={50} alt={`finsova logo` } className ="object-contain mb-5"/>
                    </div>
                <div className='flex flex-col gap-1'>
                  <Typography variant='h4'>Adventure starts here </Typography>
                  <Typography>Make your app management easy and fun!</Typography>
                </div>

                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
                  <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        autoFocus
                        fullWidth
                        label='Name'
                        placeholder='Enter your Name'
                        onChange={e => {
                          field.onChange(e.target.value)
                          setErrorState(null)
                        }}
                        error={!!errors.name || !!errorState}
                        helperText={errors.name?.message || ''}
                      />
                    )}
                  />
                  <Controller
                    name='username'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        autoFocus
                        fullWidth
                        label='Username'
                        placeholder='Enter your username'
                        onChange={e => {
                          field.onChange(e.target.value)
                          setErrorState(null)
                        }}
                        error={!!errors.username || !!errorState}
                        helperText={errors.username?.message || ''}
                      />
                    )}
                  />

                  <Controller
                    name='email'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Email'
                        placeholder='Enter your email'
                        onChange={e => {
                          field.onChange(e.target.value)
                          setErrorState(null)
                        }}
                        error={!!errors.email || !!errorState}
                        helperText={errors.email?.message || ''}
                      />
                    )}
                  />
                  <Controller
                    name='contact'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        autoFocus
                        fullWidth
                        label='Mobile No'
                        placeholder='Enter your Mobile No'
                        onChange={e => {
                          field.onChange(e.target.value)
                          setErrorState(null)
                        }}
                        error={!!errors.contact || !!errorState}
                        helperText={errors.contact?.message || ''}
                      />
                    )}
                  />

                  <Controller
                    name='password'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Password'
                        placeholder='············'
                        type={isPasswordShown ? 'text' : 'password'}
                        onChange={e => {
                          field.onChange(e.target.value)
                          setErrorState(null)
                        }}
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onClick={handleClickShowPassword}
                                  onMouseDown={e => e.preventDefault()}
                                >
                                  <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                                </IconButton>
                              </InputAdornment>
                            )
                          }
                        }}
                        error={!!errors.password || !!errorState}
                        helperText={errors.password?.message || ''}
                      />
                    )}
                  />

                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <>
                        <span>I agree to </span>
                        <Link className='text-primary' href='/' onClick={e => e.preventDefault()}>
                          privacy policy & terms
                        </Link>
                      </>
                    }
                  />

                  {errorState && (
                    <Alert severity='error' variant='outlined'>
                      {errorState.message}
                    </Alert>
                  )}

                  <Button fullWidth variant='contained' type='submit'>
                    Sign Up
                  </Button>

                  <div className='flex justify-center items-center flex-wrap gap-2'>
                    <Typography>Already have an account?</Typography>
                    <Typography
                      component={Link}
                      href={getLocalizedUrl('/login', locale as Locale)}
                      color='primary.main'
                    >
                      Sign in instead
                    </Typography>
                  </div>

                  {/* <Divider className='gap-2'>or</Divider>
                  <div className='flex justify-center items-center gap-1.5'>
                    <IconButton className='text-facebook' size='small'>
                      <i className='tabler-brand-facebook-filled' />
                    </IconButton>
                    <IconButton className='text-twitter' size='small'>
                      <i className='tabler-brand-twitter-filled' />
                    </IconButton>
                    <IconButton className='text-textPrimary' size='small'>
                      <i className='tabler-brand-github-filled' />
                    </IconButton>
                    <IconButton className='text-error' size='small'>
                      <i className='tabler-brand-google-filled' />
                    </IconButton>
                  </div> */}
                </form>
              </div>
          </Box>
        </Card>
      </Box>
    </Box>
  )
}

export default Register
