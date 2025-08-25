'use client'

import Grid from '@mui/material/Grid2'
import RoleListCards from './RoleListCards'
import RoleListTable from './RoleListTable'

// Status enum type
export type StatusType = 'Active' | 'Inactive'

export type PermissionType = {
  module: string
  menu: string
  all: boolean
  add: boolean
  view: boolean
  edit: boolean
  delete: boolean
  upload: boolean
  download: boolean
  status: boolean
  id: string
}

export type RoleType = {
  _id: string
  roleName: string
  description?: string
  roleCode: string
  status: 'Active' | 'Inactive'
  permissions: PermissionType[]
  createdAt: string
  updatedAt: string
}

// API Response types
export type RoleCreateResponse = {
  success: boolean
  data?: RoleType
  message?: string
}

export type RoleListResponse = {
  success: boolean
  data?: RoleType[]
  totalItems?: number
  totalPages?: number
  currentPage?: number
  message?: string
}

export type RoleUpdateResponse = {
  success: boolean
  data?: RoleType
  message?: string
}

export type RoleDeleteResponse = {
  success: boolean
  message?: string
}

// Main Role Master component
const RoleList = ({ roleData }: { roleData?: RoleType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <RoleListCards />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <RoleListTable tableData={roleData} />
      </Grid>
    </Grid>
  )
}

export default RoleList
