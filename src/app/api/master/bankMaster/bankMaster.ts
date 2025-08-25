import { encryptedGet, encryptedPatch, encryptedPost } from '@/libs/ApiClient'
import { BankCreateResponse, BankListResponse, BankUpdateResponse, BankDeleteResponse } from '@/views/apps/master/bank'

// Create Bank
export const CreateBank = async (payload: {
  bankName: string
  accountNumber: string
  ifsc: string
  accountHolderName: string
  nickname?: string
  accountType: 'Savings' | 'Current' | 'Other'
  paymentType: 'Cash Deposit' | 'Online Transfer' | 'Transaction Account Details'
  status?: 'Active' | 'Inactive'
}) => {
  try {
    const res = await encryptedPost<BankCreateResponse>('/bank-master', payload)
    if (!res.success || !res.data) {
      return { success: false, error: 'Unable to create bank', data: null }
    }
    return { success: res.success, data: res.data }
  } catch (err: any) {
    return { success: false, data: null, error: err.message || 'Unexpected error' }
  }
}

// Get All Banks
export const GetAllBanks = async (params?: { search?: string; status?: string; page?: number; limit?: number }) => {
  try {
    const query = new URLSearchParams()

    if (params?.search) query.append('search', params.search)
    if (params?.status) query.append('status', params.status)
    if (params?.page) query.append('page', params.page.toString())
    if (params?.limit) query.append('limit', params.limit.toString())

    const res = await encryptedGet<BankListResponse>(`/bank-master?${query.toString()}`)

    if (!res.success || !res.data) {
      return { success: false, error: res.message || 'No Data Found', data: null }
    }

    return { success: res.success, data: res.data, message: res.message }
  } catch (err: any) {
    return { success: false, data: null, error: err.message || 'Unexpected error' }
  }
}

// Update Bank
export const UpdateBank = async (
  id: string,
  payload: Partial<{
    bankName: string
    accountNumber: string
    ifsc: string
    accountHolderName: string
    nickname?: string
    accountType: 'Savings' | 'Current' | 'Other'
    paymentType: 'Cash Deposit' | 'Online Transfer' | 'Transaction Account Details'
    status?: 'Active' | 'Inactive'
  }>
) => {
  try {
    const res = await encryptedPatch<BankUpdateResponse>(`/bank-master/${id}`, payload)
    if (!res.success || !res.data) {
      return { success: false, error: 'Unable to update bank', data: null }
    }
    return { success: res.success, data: res.data }
  } catch (err: any) {
    return { success: false, data: null, error: err.message || 'Unexpected error' }
  }
}

// Delete Bank
export const DeleteBank = async (id: string) => {
  try {
    const res = await encryptedPost<BankDeleteResponse>(`/bank-master/delete/${id}`)
    if (!res.success || !res.message) {
      return { success: false, error: 'Unable to delete bank', message: null }
    }
    return { success: res.success, message: res.message }
  } catch (err: any) {
    return { success: false, message: null, error: err.message || 'Unexpected error' }
  }
}
