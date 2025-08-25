import { encryptedGet, encryptedPatch, encryptedPost } from '@/libs/ApiClient'
import {
  PermissionType,
  RoleCreateResponse,
  RoleListResponse,
  RoleUpdateResponse,
  RoleDeleteResponse
} from '@/views/apps/master/role'

// Create Role
export const CreateRole = async (payload: {
  roleName: string
  description?: string
  roleCode: string
  status?: 'Active' | 'Inactive'
  permissions: PermissionType[]
}) => {
  try {
    const res = await encryptedPost<RoleCreateResponse>('/role-master', payload)
    if (!res.success || !res.data) {
      return { success: false, error: res.message || 'Unable to create role', data: null }
    }
    return { success: res.success, data: res.data }
  } catch (err: any) {
    return { success: false, data: null, error: err.message || 'Unexpected error' }
  }
}

// Get All Roles (with pagination & filters)
export const GetAllRoles = async (params?: { search?: string; status?: string; page?: number; limit?: number }) => {
  try {
    const query = new URLSearchParams()
    if (params?.search) query.append('search', params.search)
    if (params?.status) query.append('status', params.status)
    if (params?.page) query.append('page', params.page.toString())
    if (params?.limit) query.append('limit', params.limit.toString())

    const res = await encryptedGet<RoleListResponse>(`/role-master?${query.toString()}`)

    if (!res.success || !res.data) {
      return { success: false, error: res.message || 'No Data Found', data: null }
    }

    return res // ✅ clean, no duplicate keys
  } catch (err: any) {
    return { success: false, data: null, error: err.message || 'Unexpected error' }
  }
}

// Update Role
export const UpdateRole = async (
  id: string,
  payload: Partial<{
    roleName: string
    description?: string
    roleCode?: string
    status?: 'Active' | 'Inactive'
    permissions: PermissionType[]
  }>
) => {
  try {
    const res = await encryptedPatch<RoleUpdateResponse>(`/role-master/${id}`, payload)
    if (!res.success || !res.data) {
      return { success: false, error: res.message || 'Unable to update role', data: null }
    }
    return { success: res.success, data: res.data }
  } catch (err: any) {
    return { success: false, data: null, error: err.message || 'Unexpected error' }
  }
}

// Delete Role
export const DeleteRole = async (id: string) => {
  try {
    const res = await encryptedPost<RoleDeleteResponse>(`/role-master/delete/${id}`)
    if (!res.success || !res.message) {
      return { success: false, error: res.message || 'Unable to delete role', message: null }
    }
    return { success: res.success, message: res.message }
  } catch (err: any) {
    return { success: false, message: null, error: err.message || 'Unexpected error' }
  }
}
