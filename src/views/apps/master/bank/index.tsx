'use client'
import Grid from '@mui/material/Grid2'
import BankListCards from './BankListCards'
import BankListTable from './BankListTable'

// Define enums as union types (like before)
export type AccountType = 'Savings' | 'Current' | 'Other' | ''
export type PaymentType = 'Cash Deposit' | 'Online Transfer' | 'Transaction Account Details' | ''
export type StatusType = 'Active' | 'Inactive'

// Unified Bank type with your simplified naming and backend-compatible fields
export type BankType = {
  _id: string
  bankName: string
  accountNumber: string
  accountHolderName: string
  ifsc: string
  status: 'Active' | 'Inactive' | 'true' | 'false' | string
  accountHolder: string // renamed to simpler form (instead of accountHolderName)
  nickname?: string
  accountType: AccountType
  paymentType: PaymentType
  isActive: boolean // instead of string status, use boolean for easier UI use
  createdAt: string
  updatedAt: string
}

// API Response types matching the new unified type
export interface BankCreateResponse {
  success: boolean
  message?: string
  data?: BankType
}

export interface BankListResponse {
  success: boolean
  message?: string
  data?: {
    banks: BankType[]
    pagination: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
  }
}

export interface BankUpdateResponse {
  success: boolean
  message?: string
  data?: BankType
}

export interface BankDeleteResponse {
  success: boolean
  message?: string
}

// Main component
const BankList = ({ bankData }: { bankData?: BankType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <BankListCards />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <BankListTable tableData={bankData} />
      </Grid>
    </Grid>
  )
}

export default BankList
