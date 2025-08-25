import { encryptedGet, encryptedPatch, encryptedPost } from '@/libs/ApiClient'
import {
  CommissionCreateResponse,
  CommissionListResponse,
  CommissionUpdateResponse,
  CommissionDeleteResponse
} from '@/views/apps/master/commission'

// Create Commission
export const CreateCommission = async (payload: {
  service: string
  serviceName?: string
  operatorName?: string
  minAmount?: number
  maxAmount?: number
  commissionPercent?: number
  status?: 'Active' | 'Inactive'
}) => {
  try {
    const res = await encryptedPost<CommissionCreateResponse>('/commission-master', payload)
    if (!res.success || !res.data) {
      return { success: false, error: res.message || 'Unable to create commission', data: null }
    }
    return { success: res.success, data: res.data }
  } catch (err: any) {
    return { success: false, data: null, error: err.message || 'Unexpected error' }
  }
}

// Get All Commissions
export const GetAllCommissions = async (params?: {
  search?: string
  status?: string
  page?: number
  limit?: number
}) => {
  try {
    const query = new URLSearchParams()

    if (params?.search) query.append('search', params.search)
    if (params?.status) query.append('status', params.status)
    if (params?.page) query.append('page', params.page.toString())
    if (params?.limit) query.append('limit', params.limit.toString())

    const res = await encryptedGet<CommissionListResponse>(`/commission-master?${query.toString()}`)

    if (!res.success || !res.data) {
      return { success: false, error: res.message || 'No Data Found', data: null }
    }

    return { success: res.success, data: res.data, message: res.message }
  } catch (err: any) {
    return { success: false, data: null, error: err.message || 'Unexpected error' }
  }
}

// Update Commission
export const UpdateCommission = async (
  id: string,
  payload: Partial<{
    service: string
    serviceName?: string
    operatorName?: string
    minAmount?: number
    maxAmount?: number
    commissionPercent?: number
    status?: 'Active' | 'Inactive'
  }>
) => {
  try {
    const res = await encryptedPatch<CommissionUpdateResponse>(`/commission-master/${id}`, payload)
    if (!res.success || !res.data) {
      return { success: false, error: res.message || 'Unable to update commission', data: null }
    }
    return { success: res.success, data: res.data }
  } catch (err: any) {
    return { success: false, data: null, error: err.message || 'Unexpected error' }
  }
}

// Delete Commission
export const DeleteCommission = async (id: string) => {
  try {
    const res = await encryptedPost<CommissionDeleteResponse>(`/commission-master/delete/${id}`)
    if (!res.success || !res.message) {
      return { success: false, error: res.message || 'Unable to delete commission', message: null }
    }
    return { success: res.success, message: res.message }
  } catch (err: any) {
    return { success: false, message: null, error: err.message || 'Unexpected error' }
  }
}
