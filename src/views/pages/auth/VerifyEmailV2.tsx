'use client'

// Next Imports
import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { SystemMode } from '@core/types'
import type { Locale } from '@configs/i18n'

// Component Imports
import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'
import { useUserFormStore, useUserStore } from '@/store/useUserStore'
import { genrateotpformail } from '@/app/api/user/user'
import { useState } from 'react'
import { Alert } from '@mui/material'

// Styled Custom Components
const VerifyEmailIllustration = styled('img')(({ theme }) => ({
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

const VerifyEmailV2 = ({ mode }: { mode: SystemMode }) => {
  // Vars
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-verify-email-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-verify-email-light.png'

  // Hooks
  const { settings } = useSettings()
  const router = useRouter()
  const theme = useTheme()
  const { lang: locale } = useParams()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(mode, lightIllustration, darkIllustration)
  const email = useUserStore((state) => state.selectedEmail)
  const [msgState, setMsgState] = useState<any>(null)
  const formdata = useUserFormStore.getState().formData;
  console.log(formdata);
  const onSubmit = async () => {
    const Email = formdata.email;

    try {
      debugger;
      if (!formdata.email) {
        setMsgState("Email is required");
        return;
      }

      const res = await genrateotpformail(formdata.email)
      if (res?.success) {
        setMsgState(res.data);
        router.replace(`/${locale}/pages/auth/two-steps-v2`);
      } else {
        setMsgState(res?.error || "Failed to send OTP");
      }
       router.replace(`/${locale}/pages/auth/two-steps-v2`);
    } catch (err: any) {
      console.error("OTP send error:", err);
      setMsgState(err?.message || "An unexpected error occurred");
    }

  }

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <VerifyEmailIllustration src={characterIllustration} alt='character-illustration' />
        {!hidden && (
          <MaskImg
            alt='mask'
            src={authBackground}
            className={classnames({ 'scale-x-[-1]': theme.direction === 'rtl' })}
          />
        )}
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <Link
          href={getLocalizedUrl('/', locale as Locale)}
          className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'
        >
          <Logo />
        </Link>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>Verify Your Email and Mobile Number</Typography>
          <Typography>
  Click the <strong>Send</strong> button to receive an activation link on your registered email (<span className='font-medium' style={{ color: 'inherit' }}>{formdata.email}</span>) and mobile number (<span className='font-medium' style={{ color: 'inherit' }}>{formdata.contact}</span>). Please check your inbox and SMS, and follow the instructions to verify your account.
</Typography>
          </div>
                {msgState && (
        <Alert severity="info" className="mbe-4">
          {msgState}
        </Alert>
      )}
          <Button fullWidth variant='contained' className='mbe-5' onClick={onSubmit}>
            Send
          </Button>
          {/* <div className='flex justify-center items-center flex-wrap gap-2'>
            <Typography>Didn&#39;t get the mail?</Typography>
            <Typography color='primary.main' component={Link}>
              Resend
            </Typography>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default VerifyEmailV2
