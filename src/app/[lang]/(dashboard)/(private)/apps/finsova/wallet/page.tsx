'use client'

import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

const AddMoneyScreen = dynamic(() => import('@views/finsova/wallet/add-money'), { ssr: false })
const SendMoneyScreen = dynamic(() => import('@views/finsova/wallet/send-money'), { ssr: false })
const ScanPayScreen = dynamic(() => import('@views/finsova/wallet/scan-pay'), { ssr: false })
const TransactionHistoryScreen = dynamic(() => import('@views/finsova/wallet/transactions'), { ssr: false })
const EKYCScreen = dynamic(() => import('@/views/finsova/wallet/ekycForm'), { ssr: false })

const WalletPageRouter = (): ReactElement => {
  const params = useParams()
  const walletPage = params?.walletPage as string

  switch (walletPage) {
    case 'add-money':
      return <AddMoneyScreen />
    case 'send-money':
      return <SendMoneyScreen />
    case 'scan-pay':
      return <ScanPayScreen />
    case 'transaction-history':
      return <TransactionHistoryScreen />
    case 'ekyc':
      return <EKYCScreen />
    default:
      return <div>Page not found</div>
  }
}

export default WalletPageRouter
