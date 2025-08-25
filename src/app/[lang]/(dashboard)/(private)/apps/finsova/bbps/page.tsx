'use client'

// React Imports
import type { ReactElement } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import RechargeScreen component
const AllServices = dynamic(() => import('@views/finsova/bbps/mobikwick/bbpsServices'), {
  ssr: false,
})
const RechargePage = (): ReactElement => {
  return <AllServices />
}

export default RechargePage
