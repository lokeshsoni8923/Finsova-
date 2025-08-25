'use client'

import Grid from '@mui/material/Grid2'
import ServiceProviderListCards from './serviceListCards'
import ServiceProviderListTable from './serviceListTable'

// Status enum type
export type StatusType = 'Active' | 'Inactive'

export type ServiceProviderType = {
  _id: string
  providerName: string
  serviceType: string
  operatorCode: string
  status: 'Active' | 'Inactive'
  createdAt: string
  updatedAt: string
}

// API Response types
export type ServiceProviderCreateResponse = {
  success: boolean
  data?: ServiceProviderType
  message?: string
  statusCode?: number
}

export type ServiceProviderListResponse = {
  success: boolean
  message?: string
  data?: {
    providers: ServiceProviderType[]
    pagination: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
  }
  statusCode?: number
}

export type ServiceProviderUpdateResponse = {
  success: boolean
  data?: ServiceProviderType
  message?: string
  statusCode?: number
}

export type ServiceProviderDeleteResponse = {
  success: boolean
  message?: string
  statusCode?: number
}

// Main Service Provider Master component
const ServiceProviderList = ({ serviceProviderData }: { serviceProviderData?: ServiceProviderType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <ServiceProviderListCards />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <ServiceProviderListTable tableData={serviceProviderData} />
      </Grid>
    </Grid>
  )
}

export default ServiceProviderList
