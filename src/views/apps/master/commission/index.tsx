'use client'

import Grid from '@mui/material/Grid2'
import CommissionListCards from './CommissionListCards'
import CommissionListTable from './CommissionListTable'

// Status enum type
export type StatusType = 'Active' | 'Inactive'

// Unified Commission type (backend-compatible)
export type CommissionType = {
  _id: string
  service: string
  serviceName?: string
  operatorName?: string
  minAmount?: number
  maxAmount?: number
  commissionPercent?: number
  commission?: number
  status: 'Active' | 'Inactive' | 'true' | 'false' | string
  createdAt: string
  updatedAt: string
}

// API Response types
export interface CommissionCreateResponse {
  success: boolean
  message?: string
  data?: CommissionType
}

export interface CommissionListResponse {
  success: boolean
  message?: string
  data?: {
    commissions: CommissionType[]
    pagination: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
  }
}

export interface CommissionUpdateResponse {
  success: boolean
  message?: string
  data?: CommissionType
}

export interface CommissionDeleteResponse {
  success: boolean
  message?: string
}

// Main Commission Master component
const CommissionList = ({ commissionData }: { commissionData?: CommissionType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <CommissionListCards />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <CommissionListTable tableData={commissionData} />
      </Grid>
    </Grid>
  )
}

export default CommissionList
