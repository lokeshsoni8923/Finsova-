'use client'

import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
const RechargeScreen = dynamic(() => import('@views/finsova/bbps/mobikwick/RechargeScreen'), {
  ssr: false,
})
const PostpaidRechargeScreen = dynamic(() => import('@views/finsova/bbps/mobikwick/PostpaidRechargeScreen'), {
  ssr: false,
})
const DTHRechargeScreen = dynamic(() => import('@views/finsova/bbps/mobikwick/DTHRechargeScreen'), {
  ssr: false,
})
const BroadbandRechargeScreen = dynamic(() => import('@views/finsova/bbps/mobikwick/BroadbandRechargeScreen'), {
  ssr: false,
})
const LandlineRechargeScreen = dynamic(() => import('@views/finsova/bbps/mobikwick/LandlineRechargeScreen'), {
  ssr: false,
})
const ElectricityBillPaymentScreen = dynamic(() => import('@views/finsova/bbps/mobikwick/ElectricityBillPaymentScreen'), {
  ssr: false,
})
const GasBillPaymentScreen = dynamic(() => import('@views/finsova/bbps/mobikwick/GasBillPaymentScreen'), {
  ssr: false,
})
const WaterBillPaymentScreen = dynamic(() => import('@views/finsova/bbps/mobikwick/WaterBillPaymentScreen'), {
  ssr: false,
})
const FastagRechargeScreen = dynamic(() => import('@views/finsova/bbps/mobikwick/FastagRechargeScreen'), {
  ssr: false,
})
const LoanRepaymentScreen = dynamic(() => import('@views/finsova/bbps/mobikwick/LoanRepaymentScreen'), {
  ssr: false,
})
const InsurancePremiumScreen = dynamic(() => import('@views/finsova/bbps/mobikwick/InsurancePremiumScreen'), {
  ssr: false,
})
const CreditCardBillPaymentScreen = dynamic(() => import('@views/finsova/bbps/mobikwick/CreditCardBillPaymentScreen'), {
  ssr: false,
})

const BBPSServicePage = (): ReactElement => {
  const params = useParams()
  const serviceId = params?.serviceId as string

  switch (serviceId) {
    case 'mobile-postpaid':
      return <PostpaidRechargeScreen />
    case 'dth':
      return <DTHRechargeScreen />
    case 'broadband':
      return <BroadbandRechargeScreen />
       case 'landline':
      return <LandlineRechargeScreen />
          case 'electricity':
      return <ElectricityBillPaymentScreen />
        case 'gas':
      return <GasBillPaymentScreen />
        case 'water':
      return <WaterBillPaymentScreen />
       case 'fastag':
      return <FastagRechargeScreen />
      case 'loan-repayment':
      return <LoanRepaymentScreen />
       case 'insurance':
      return <InsurancePremiumScreen />
        case 'credit-card':
      return <CreditCardBillPaymentScreen />


    default:
      return <RechargeScreen serviceId={serviceId} />
  }
}
export default BBPSServicePage

