'use client'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Alert, CircularProgress } from '@mui/material'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { SystemMode } from '@core/types'
import type { Locale } from '@configs/i18n'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'
import { Box, Card } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { forgotPasswordWithAPI } from '@/app/api/auth/auth'

// Styled Custom Components
const ForgotPasswordIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 650,
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

const ForgotPassword = ({ mode }: { mode: SystemMode }) => {
  // Vars
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-forgot-password-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-forgot-password-light.png'

  // Hooks
  const { lang: locale } = useParams()
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(mode, lightIllustration, darkIllustration)

  // States
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  // Functions
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await forgotPasswordWithAPI(email)

      if (!response.success) {
        throw new Error(response.error || 'Something went wrong')
      }

      setSuccess('Password reset link has been sent to your email')
      setTimeout(() => {
        router.push(getLocalizedUrl('/login', locale as Locale))
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset link')
    } finally {
      setLoading(false)
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
              height: { xs: 'auto', md: '400px' }
            }}
          />
          <Box
            sx={{
              width: { xs: '100%', md: '500px' },
              height: { xs: 'auto', md: '400px' },
              objectFit: 'cover'
            }}
            className='p-5 flex  justify-center items-center gap-4'
          >
            <div className='w-full'>
              <div className='w-full flex flex-col gap-5 '>
                <div className='flex justify-center items-start'>
                  <Image
                    src={'/images/logos/FINSOVA.v2_logo.png'}
                    width={300}
                    height={50}
                    alt={`Bharat pay logo`}
                    className='object-contain mb-10'
                  />
                </div>
                <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-6'>
                  {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  )}
                  {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                      {success}
                    </Alert>
                  )}
                  <CustomTextField
                    autoFocus
                    fullWidth
                    label='Email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    error={!!error}
                  />
                  <Button 
                    fullWidth 
                    variant='contained' 
                    type='submit'
                    disabled={loading || !email}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Send Reset Link'
                    )}
                  </Button>
                  <Typography className='flex justify-center items-center' color='primary.main'>
                    <Link 
                      href={getLocalizedUrl('/login', locale as Locale)} 
                      className='flex items-center gap-1.5'
                      tabIndex={loading ? -1 : 0}
                    >
                      <DirectionalIcon
                        ltrIconClass='tabler-chevron-left'
                        rtlIconClass='tabler-chevron-right'
                        className='text-xl'
                      />
                      <span>Back to login</span>
                    </Link>
                  </Typography>
                </form>
              </div>
            </div>
          </Box>
        </Card>
      </Box>
    </Box>
  )
}

export default ForgotPassword
