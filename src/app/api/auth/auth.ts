import { encryptedPost } from '../../../libs/ApiClient'
import type { LoginResponse } from '../types/userTypes' // or inline if you prefer
import { doubleDecryptAES, doubleEncryptAES } from '@/utils/crypto'

export const loginWithAPI = async (email: string, password: string) => {
  try {
    debugger
    const res = await encryptedPost<LoginResponse>('/users/logIn', { email, password })
    if (!res.success || !res.data) {
      return { success: false, error: res.message || 'Login failed', data: null }
    }
    localStorage.setItem('userToken', res.data.token)
    localStorage.setItem('userData', doubleEncryptAES(JSON.stringify(res.data.user)))
    return {
      success: true,
      data: res.data,
      error: null
    }
  } catch (err: any) {
    return {
      success: false,
      data: null,
      error: err.message || 'Unexpected error'
    }
  }
}
export const registerWithAPI = async (obj: {
  role?: string
  email: string
  country?: string
  contact?: string
  password?: string
  name: string
  username: string
  isActive?: boolean
  isKycCompleted?: boolean
}) => {
  try {
    const res = await encryptedPost<LoginResponse>('/users/signUp',  obj)
    if (!res.success || !res.data) {
      return { success: false, error: res.message || 'Registration failed', data: null }
    }
    localStorage.setItem('userToken', res.data.token)
    localStorage.setItem('userData', doubleEncryptAES(JSON.stringify(res.data.user)))
    return {
      success: true,
      data: res.data,
      error: null
    }
  } catch (err: any) {
    return {
      success: false,
      data: null,
      error: err.message || 'Unexpected error'
    }
  }
}
export const logoutWithAPI = async (email: string) => {
  try {
    const res = await encryptedPost<LoginResponse>('/users/logout', { email })

    if (!res.success) {
      return { success: false, error: res.message || 'Logout failed' }
    }
    localStorage.removeItem('userToken')
    localStorage.removeItem('userData')
    return {
      success: true,
      error: null
    }
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Unexpected error'
    }
  }
}

export const forgotPasswordWithAPI = async (email: string) => {
  try {
    const res = await encryptedPost<LoginResponse>('/users/forgot-password', { email })
    if (!res.success || !res.data) {
      return { success: false, error: res.message || 'Forgot password failed', data: null }
    }
    return {
      success: true,
      data: res.data,
      error: null
    }
  } catch (err: any) {
    return {
      success: false,
      data: null,
      error: err.message || 'Unexpected error'
    }
  }
}
