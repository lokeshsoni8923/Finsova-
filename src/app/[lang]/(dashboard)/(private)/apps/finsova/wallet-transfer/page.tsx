'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// Icons
import SendIcon from '@mui/icons-material/Send'
import SearchIcon from '@mui/icons-material/Search'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import UserList from '@/views/apps/user/list'
import WalletList from '@/views/finsova/wallet/wallet-transfer'

// Types
interface WalletTransfer {
  id: string
  date: string
  mobile: string
  company: string
  creditAmount: number
  debitAmount: number
  currentBalance: number
  remarks: string
}

const WalletTransferPage = (): ReactElement => {
  const params = useParams()

  // Form States
  const [modeOfPayment, setModeOfPayment] = useState('')
  const [amount, setAmount] = useState('')
  const [remarks, setRemarks] = useState('')

  // Table States
  const [duration, setDuration] = useState('')
  const [searchMobile, setSearchMobile] = useState('')
  const [entriesPerPage, setEntriesPerPage] = useState(50)
  const [sortField, setSortField] = useState<string>('date')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)

  // Mock data - replace with actual API call
  const [transactions, setTransactions] = useState<WalletTransfer[]>([])

  // Calculate pagination
  const totalPages = Math.ceil(transactions.length / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const endIndex = startIndex + entriesPerPage
  const currentTransactions = transactions.slice(startIndex, endIndex)

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const renderSortIcon = (field: string) => {
    if (sortField !== field) {
      return <KeyboardArrowUpIcon sx={{ opacity: 0.3 }} />
    }
    return sortDirection === 'asc' ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
  }

  const handleSendMoney = () => {
    // Handle send money logic here
    console.log('Sending money:', { modeOfPayment, amount, remarks })
  }

  const handleSearch = () => {
    // Handle search logic here
    console.log('Searching:', { duration, searchMobile })
  }

  const totalCredit = transactions.reduce((sum, t) => sum + t.creditAmount, 0)
  const totalDebit = transactions.reduce((sum, t) => sum + t.debitAmount, 0)

  const data: any = []

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant='h4' component='h1' sx={{ fontWeight: 'bold', mb: 3 }}>
        Financial / Wallet Transfer
      </Typography>

      {/* Warning Alert at Top
       <Alert severity="error" sx={{ mb: 3 }}>
         We have restrict on the third-party payments into the company's bank account, and we will not accept any form of third-party payments. If you transfer any amount as a third party payment, either the amount will be reverse to you after an investigation or it will be reversed after 45 days.
       </Alert> */}

      <WalletList userData={data} />
      {/* Right Section - Transaction History */}
    </Box>
  )
}

export default WalletTransferPage
