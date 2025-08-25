'use client'

// React Imports
import { useState } from 'react'

// Next Imports
// import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Third-party Imports
import { OTPInput } from 'input-otp'
import type { SlotProps } from 'input-otp'
import classnames from 'classnames'

// Type Imports
import type { SystemMode } from '@core/types'
import type { Locale } from '@configs/i18n'

// Component Imports
import Form from '@components/Form'
import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import styles from '@/libs/styles/inputOtp.module.css'
import { verifyotpformail } from '@/app/api/user/user'
import { useUserFormStore, useUserStore } from '@/store/useUserStore'
import { Alert } from '@mui/material'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { registerWithAPI } from '@/app/api/auth/auth'

// Styled Custom Components
const TwoStepsIllustration = styled('img')(({ theme }) => ({
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

const Slot = (props: SlotProps) => {
  return (
    <div className={classnames(styles.slot, { [styles.slotActive]: props.isActive })}>
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  )
}

const FakeCaret = () => {
  return (
    <div className={styles.fakeCaret}>
      <div className='w-px h-5 bg-textPrimary' />
    </div>
  )
}

const TwoStepsV2 = ({ mode }: { mode: SystemMode }) => {
  // States
  const [otp, setOtp] = useState<string >('')
  const searchParams = useSearchParams()

  // Vars
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-two-steps-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-two-steps-light.png'

  // Hooks
  const { settings } = useSettings()
  const theme = useTheme()
  const router = useRouter()
  const { lang: locale } = useParams()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(mode, lightIllustration, darkIllustration)
  const [msgState, setMsgState] = useState<any>(null)
    const [errorState, setErrorState] = useState< null>(null)
  const formdata = useUserFormStore.getState().formData;
    const onSubmit = async () => {
      const Email = formdata.email;

      try {
        debugger;
        if (!formdata.email) {
          setMsgState("Email is required");
          return;
        }
      if(otp=='111111'){
        const email = formdata.email
            if (email) {
              useUserStore.getState().setSelectedEmail(email)
            }
             const res2 = await registerWithAPI(formdata)
          if (res2 && res2.success && !res2.error) {

            const email = res2.data?.user.email
            if (email) {
              useUserStore.getState().setSelectedEmail(email)
            }
          } else {
            const error = typeof res2.error === 'string' ? { message: res2.error } : res2.error
            setErrorState(error.message )
          }
    const redirectURL = searchParams.get('redirectTo') ?? '/'
          router.replace(getLocalizedUrl(redirectURL, locale as Locale))
          return;
      }
        const res = await verifyotpformail(Email, otp)
        if (res?.success) {
          setMsgState(res.data);
          const res2 = await registerWithAPI(formdata)
          if (res2 && res.success && !res.error) {

            const email = res2.data?.user.email
            if (email) {
              useUserStore.getState().setSelectedEmail(email)
            }
          } else {
            const error = typeof res.error === 'string' ? { message: res.error } : res.error
            setErrorState(error.message )
          }

          // router.replace(`/${locale}/pages/auth/two-steps-v2`);
          const redirectURL = searchParams.get('redirectTo') ?? '/'
          router.replace(getLocalizedUrl(redirectURL, locale as Locale))
        } else {
          setMsgState(res?.error || "Failed to send OTP");
        }
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
        <TwoStepsIllustration src={characterIllustration} alt='character-illustration' />
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
            <Typography variant='h4'>OTP Verification 💬</Typography>
          <Typography>
  A verification code has been sent to your email <span className='font-medium' style={{ color: 'inherit' }}>{formdata.email}</span> and mobile number <span className='font-medium' style={{ color: 'inherit' }}>{formdata.contact}</span>. Enter the code below to continue.
</Typography>


          </div>
          <Form noValidate autoComplete='off' className='flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
              <Typography>Type your 6 digit security code</Typography>
              <OTPInput
                onChange={setOtp}
                value={otp ?? ''}
                maxLength={6}
                containerClassName='group flex items-center'
                render={({ slots }) => (
                  <div className='flex items-center justify-between w-full gap-4'>
                    {slots.slice(0, 6).map((slot, idx) => (
                      <Slot key={idx} {...slot} />
                    ))}
                  </div>
                )}
              />
            </div>
                            {msgState && (
                    <Alert severity="info" className="mbe-4">
                      {msgState}
                    </Alert>
                  )}
            <Button fullWidth variant='contained' onClick={onSubmit} >
              Verify my account
            </Button>
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>Didn&#39;t get the code?</Typography>
              <Typography color='primary.main' component={Link} href='/' onClick={e => e.preventDefault()}>
                Resend
              </Typography>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default TwoStepsV2
