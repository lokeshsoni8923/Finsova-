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

import { loginWithAPI } from '../app/api/auth/auth'
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { email, object, minLength, string, pipe, nonEmpty } from 'valibot'
import type { SubmitHandler } from 'react-hook-form'
import type { InferInput } from 'valibot'
import classnames from 'classnames'

// Type Imports
import type { SystemMode } from '@core/types'
import type { Locale } from '@/configs/i18n'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

import Snackbar from '@mui/material/Snackbar'
import { Box, Card, CardContent } from '@mui/material'
import Image from 'next/image'
// Styled Custom Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 680,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: {
    maxBlockSize: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxBlockSize: 450
  }
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

type ErrorType = {
  message: string[]
}

type FormData = InferInput<typeof schema>

const schema = object({
  email: pipe(string(), minLength(1, 'This field is required'), email('Email is invalid')),
  password: pipe(
    string(),
    nonEmpty('This field is required'),
    minLength(5, 'Password must be at least 5 characters long')
  )
})

const Login = ({ mode }: { mode: SystemMode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [errorState, setErrorState] = useState<ErrorType | null>(null)
  const [successState, setSuccessState] = useState<string | null>(null)

  // Vars
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-login-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-login-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png'

  // Hooks
  const router = useRouter()
  const searchParams = useSearchParams()
  const { lang: locale } = useParams()
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: { email: '', password: '' }
  })

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const res = await loginWithAPI(data.email, data.password)
      debugger
      if (res && res.success && !res.error) {
        setSuccessState('Login successful!')
        setTimeout(() => {
          const redirectURL = searchParams.get('redirectTo') ?? '/'
          router.replace(getLocalizedUrl(redirectURL, locale as Locale))
        }, 1000)
      } else {
        const error = typeof res.error === 'string' ? { message: res.error } : res.error
        setErrorState({ message: error.message || 'User Not Found' })
      }
    } catch (err: any) {
      setErrorState({ message: err.message || 'Login failed' })
    }
  }

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
              width: { xs: '100%', md: '500px' },
              height: { xs: 'auto', md: '600px' }
            }}
          />
          <Box
            sx={{
              width: { xs: '100%', md: '500px' },
              height: { xs: 'auto', md: '600px' },
              objectFit: 'cover'
            }}
            className='p-5 flex  justify-center items-center gap-4'
          >
            <div>
              <div className='flex justify-center items-start'>
                 <Image src={'/images/logos/FINSOVA.v2_logo.png'} width={300} height={50} alt={`Bharat pay logo` } className ="object-contain mb-10"/>
              </div>
              <div className='flex flex-col gap-1 mb-2 justify-start items-start'>
                  
                <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}`}</Typography>
                <Typography>Please sign-in to your account and start the adventure</Typography>
              </div>
              <form
                noValidate
                autoComplete='off'
                action={() => {}}
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-6'
              >
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      autoFocus
                      fullWidth
                      type='email'
                      label='Email'
                      placeholder='Enter your email'
                      onChange={e => {
                        field.onChange(e.target.value)
                        if (errorState) setErrorState(null) // reset API error on input
                      }}
                      error={!!errors.email || !!errorState}
                      helperText={errors.email?.message || errorState?.message}
                    />
                  )}
                />
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='Password'
                      placeholder='············'
                      id='login-password'
                      type={isPasswordShown ? 'text' : 'password'}
                      onChange={e => {
                        field.onChange(e.target.value)
                        errorState !== null && setErrorState(null)
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
                                <i className={isPasswordShown ? 'tabler-eye' : 'tabler-eye-off'} />
                              </IconButton>
                            </InputAdornment>
                          )
                        }
                      }}
                      {...(errors.password && { error: true, helperText: errors.password.message })}
                    />
                  )}
                />
                <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
                  <FormControlLabel control={<Checkbox defaultChecked />} label='Remember me' />
                  <Typography
                    className='text-end'
                    color='primary.main'
                    component={Link}
                    href={getLocalizedUrl('/forgot-password', locale as Locale)}
                  >
                    Forgot password?
                  </Typography>
                </div>
                {errorState && (
                  <Alert severity='error' variant='outlined'>
                    {errorState.message}
                  </Alert>
                )}
                {successState && (
                  <Alert severity='success' variant='outlined'>
                    {successState}
                  </Alert>
                )}
                <Button fullWidth variant='contained' type='submit'>
                  Login
                </Button>
                <div className='flex justify-center items-center flex-wrap gap-2'>
                  <Typography>New on our platform?</Typography>
                  <Typography
                    component={Link}
                    href={getLocalizedUrl('/register', locale as Locale)}
                    color='primary.main'
                  >
                    Create an account
                  </Typography>
                </div>
                {/* <Divider className='gap-2'>or</Divider> */}
                {/* <Button
              color='secondary'
              className='self-center text-textPrimary'
              startIcon={<img src='/images/logos/google.png' alt='Google' width={22} />}
              sx={{ '& .MuiButton-startIcon': { marginInlineEnd: 3 } }}
              onClick={() => signIn('google')}
            >
              Sign in with Google
            </Button> */}
              </form>
            </div>
          </Box>
        </Card>
      </Box>
    </Box>
  )
}

export default Login
