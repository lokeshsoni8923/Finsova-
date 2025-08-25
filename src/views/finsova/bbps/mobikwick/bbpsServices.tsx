'use client'
import {
  IconDeviceMobile,
  IconPhoneCall,
  IconBrandYoutube,
  IconWifi,
  IconPhone,
  IconBulb,
  IconFlame,
  IconDroplet,
  IconCreditCard,
  IconBuildingBank,
  IconCurrencyDollar,
  IconShield,
  IconHome,
  IconBuildingCommunity,
  IconSchool,
  IconBuildingHospital,
  IconBookmark
} from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import Divider from '@mui/material/Divider'
import * as bbpsIcons from '../../../../assets/svg/bbps'
import type { ReactNode } from 'react'
import KycModalWrapper from '../../../../components/dialogs/kyc-modal-wrapper'
import { doubleDecryptAES } from '@/utils/crypto'

type BBPSService = {
  id: string
  name: string
  icon: ReactNode
}

type ServiceGroup = {
  label: string
  emoji: string
  services: BBPSService[]
}

const serviceGroups = [
  {
    label: 'Telecom',
    emoji: '📶',
    services: [
      { id: 'mobile-prepaid', name: 'Mobile Prepaid', icon: <IconDeviceMobile size={40} /> },
      { id: 'mobile-postpaid', name: 'Mobile Postpaid', icon: <IconPhoneCall size={40} /> },
      { id: 'dth', name: 'DTH Recharge', icon: <IconBrandYoutube size={40} /> },
      { id: 'broadband', name: 'Broadband', icon: <IconWifi size={40} /> },
      { id: 'landline', name: 'Landline', icon: <IconPhone size={40} /> }
    ]
  },
  {
    label: 'Utilities',
    emoji: '💡',
    services: [
      { id: 'electricity', name: 'Electricity', icon: <IconBulb size={40} /> },
      { id: 'gas', name: 'Gas Bill', icon: <IconFlame size={40} /> },
      { id: 'water', name: 'Water Bill', icon: <IconDroplet size={40} /> },
      { id: 'fastag', name: 'FASTag Recharge', icon: <IconCreditCard size={40} /> }
    ]
  },
  {
    label: 'Financial Services',
    emoji: '🧾',
    services: [
      { id: 'loan-repayment', name: 'Loan Repayment', icon: <IconCurrencyDollar size={40} /> },
      { id: 'insurance', name: 'Insurance Premium', icon: <IconShield size={40} /> },
      { id: 'credit-card', name: 'Credit Card Bill Pay', icon: <IconCreditCard size={40} /> }
    ]
  },
  {
    label: 'Municipal / Society',
    emoji: '🏠',
    services: [
      { id: 'property-tax', name: 'Property Tax', icon: <IconHome size={40} /> },
      { id: 'society', name: 'Society Maintenance', icon: <IconBuildingCommunity size={40} /> }
    ]
  },
  {
    label: 'Other Services',
    emoji: '🎓',
    services: [
      { id: 'education', name: 'Education Fees', icon: <IconSchool size={40} /> },
      { id: 'hospital', name: 'Hospital Bills', icon: <IconBuildingHospital size={40} /> },
      { id: 'subscriptions', name: 'Club/Subscription', icon: <IconBookmark size={40} /> }
    ]
  }
]

const BBPSServices = () => {
  const router = useRouter()
  const [isKycDone, setIsKycDone] = useState<boolean>(false)

  useEffect(() => {
    try {
      const encrypted = typeof window !== 'undefined' ? localStorage.getItem('userData') : null
      if (encrypted) {
        const user = JSON.parse(doubleDecryptAES(encrypted))
        if (typeof user?.kycStatus === 'boolean') setIsKycDone(user.isKycCompleted)
      }
    } catch (e) {
      console.error('Failed to read userData for KYC:', e)
    }
  }, [])

  const handleServiceClick = (serviceId: string) => {
    router.push(`/apps/finsova/bbps/${serviceId}`)
  }

  return (
    <div>
      <Typography variant='h4' mb={4} textAlign='center' fontWeight='bold'>
        Bill Payment Services
      </Typography>

      {serviceGroups.map(group => (
        <div key={group.label} style={{ marginBottom: 40 }}>
          <Typography variant='h6' fontWeight='bold' gutterBottom>
            {group.emoji} {group.label}
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={4}>
            {group.services.map(service => (
              <Grid item xs={6} sm={4} md={3} key={service.id}>
                <KycModalWrapper
                  onServiceClick={() => handleServiceClick(service.id)}
                  isKycDone={isKycDone}
                  languagePreference='en'
                >
                  <Card>
                    <CardActionArea>
                    <CardContent
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 2,
                        color: 'primary.main'
                      }}
                      className='flex flex-col items-center justify-center text-center p-6'
                    >
                      {service.icon}
                      <Typography variant='subtitle1' mt={2}>
                        {service.name}
                      </Typography>
                    </CardContent>
                    </CardActionArea>
                  </Card>
                </KycModalWrapper>
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  )
}

export default BBPSServices
