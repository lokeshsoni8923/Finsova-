'use client'

import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

// Dynamically import wallet components
const AddMoneyScreen = dynamic(() => import('@views/finsova/wallet/add-money'), { ssr: false })
const SendMoneyScreen = dynamic(() => import('@views/finsova/wallet/send-money'), { ssr: false })
const ScanPayScreen = dynamic(() => import('@views/finsova/wallet/scan-pay'), { ssr: false })
const TransactionHistoryScreen = dynamic(() => import('@views/finsova/wallet/transactions'), { ssr: false })
const WalletSummaryScreen = dynamic(() => import('@views/finsova/wallet/transactions'), { ssr: false })
// const PayoutScreen = dynamic(() => import('@views/finsova/wallet/PayoutScreen'), { ssr: false })
// const FundRequestScreen = dynamic(() => import('@views/finsova/wallet/FundRequestScreen'), { ssr: false })
const EKYCScreen = dynamic(() => import('@views/finsova/wallet/ekycForm'), { ssr: false })

const WalletServicePage = (): ReactElement => {
  const params = useParams()
  const walletPage = params?.walletPage as string

  switch (walletPage) {
    case 'add-money':
      return <AddMoneyScreen />
    case 'send-money':
      return <SendMoneyScreen />
    case 'scan-pay':
      return <ScanPayScreen />
    case 'transactions':
      return <TransactionHistoryScreen />
    case 'summary':
      return <WalletSummaryScreen />
    // case 'payout':
    //   return <PayoutScreen />
    // case 'fund-request':
    //   return <FundRequestScreen />
    case 'ekyc':
      return <EKYCScreen />
    default:
      return <div style={{ padding: 24, fontSize: 18 }}>404 | Wallet Page Not Found</div>
  }
}

export default WalletServicePage
