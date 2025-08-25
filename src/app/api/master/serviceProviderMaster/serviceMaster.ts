import { encryptedGet, encryptedPatch, encryptedPost } from '@/libs/ApiClient'
import {
  ServiceProviderCreateResponse,
  ServiceProviderListResponse,
  ServiceProviderUpdateResponse,
  ServiceProviderDeleteResponse
} from '@/views/apps/master/serviceProvider'

// Create Service Provider
export const CreateServiceProvider = async (payload: {
  providerName: string
  serviceType: string
  operatorCode: string
  status?: 'Active' | 'Inactive'
}) => {
  try {
    const res = await encryptedPost<ServiceProviderCreateResponse>('/service-provider-master', payload)
    if (!res.success || !res.data) {
      return { success: false, error: res.message || 'Unable to create service provider', data: null }
    }
    return { success: res.success, data: res.data }
  } catch (err: any) {
    return { success: false, data: null, error: err.message || 'Unexpected error' }
  }
}

// Get All Service Providers (with pagination & filters)
export const GetAllServiceProviders = async (params?: {
  search?: string
  status?: string
  serviceType?: string // Add this
  page?: number
  limit?: number
}) => {
  try {
    const query = new URLSearchParams()
    if (params?.search) query.append('search', params.search)
    if (params?.status) query.append('status', params.status)
    if (params?.serviceType) query.append('serviceType', params.serviceType) // Add this
    if (params?.page) query.append('page', params.page.toString())
    if (params?.limit) query.append('limit', params.limit.toString())

    const res = await encryptedGet<ServiceProviderListResponse>(`/service-provider-master?${query.toString()}`)

    if (!res.success || !res.data?.providers) {
      // Check for `res.data.providers`
      return { success: false, error: res.message || 'No Data Found', data: null }
    }

    return res // Now includes `res.data.providers` & `res.data.pagination`
  } catch (err: any) {
    return { success: false, data: null, error: err.message || 'Unexpected error' }
  }
}

// Update Service Provider
export const UpdateServiceProvider = async (
  id: string,
  payload: Partial<{
    providerName: string
    serviceType: string
    operatorCode: string
    status?: 'Active' | 'Inactive'
  }>
) => {
  try {
    const res = await encryptedPatch<ServiceProviderUpdateResponse>(`/service-provider-master/${id}`, payload)
    if (!res.success || !res.data) {
      return { success: false, error: res.message || 'Unable to update service provider', data: null }
    }
    return { success: res.success, data: res.data }
  } catch (err: any) {
    return { success: false, data: null, error: err.message || 'Unexpected error' }
  }
}

// Delete Service Provider
export const DeleteServiceProvider = async (id: string) => {
  try {
    const res = await encryptedPost<ServiceProviderDeleteResponse>(`/service-provider-master/delete/${id}`)
    if (!res.success || !res.message) {
      return { success: false, error: res.message || 'Unable to delete service provider', message: null }
    }
    return { success: res.success, message: res.message }
  } catch (err: any) {
    return { success: false, message: null, error: err.message || 'Unexpected error' }
  }
}

// Delete All Service Providers
export const DeleteAllServiceProviders = async () => {
  try {
    const res = await encryptedPost<ServiceProviderDeleteResponse>('/service-provider-master/delete-all')
    if (!res.success || !res.message) {
      return { success: false, error: res.message || 'Unable to delete all service providers', message: null }
    }
    return { success: res.success, message: res.message }
  } catch (err: any) {
    return { success: false, message: null, error: err.message || 'Unexpected error' }
  }
}
