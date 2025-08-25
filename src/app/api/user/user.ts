
import { encryptedPost } from '../../../libs/ApiClient'
import {  UserDeleteResponse, UserListResponse, UserViewResponse } from '../types/userlist'

export const GetAllUser = async () => {
  try {
    const res = await encryptedPost<UserListResponse>('/users/users')
    if (!res.success || !res.users) {
      return { success: false, error:  'No Data Found', data: null }
    }

    return {
      success: res.success,
      data: res.users,
    }
  } catch (err: any) {
    return {
      success: false,
      data: null,
      error: err.message || 'Unexpected error'
    }
  }
}
export const DeleteUser = async (email: string) => {
  try {
    const res = await encryptedPost<UserDeleteResponse>('/users/deleteuser',{email})
    if (!res.success || !res.message) {
      return { success: false, error:  'No Data Found', data: null }
    }

    return {
      success: res.success,
      message: res.message,
    }
  } catch (err: any) {
    return {
      success: false,
      message: null,
      error: err.message || 'Unexpected error'
    }
  }
}
export const ViewUser = async (email: string) => {
  try {
    const res = await encryptedPost<UserViewResponse>('/users/profile',{email})
    if (!res.success || !res.data) {
      return { success: false, error:  'No Data Found', data: null }
    }

    return {
      success: res.success,
      data: res.data,
    }
  } catch (err: any) {
    return {
      success: false,
      data: null,
      error: err.message || 'Unexpected error'
    }
  }
}
export const genrateotpformail = async (email: string) => {
  try {
    debugger;
    const res = await encryptedPost<UserDeleteResponse>('/users/otp',{email})
    if (!res.success || !res.message) {
      return { success: false, error:  'No Data Found', data: null }
    }

    return {
      success: res.success,
      data: res.message,
    }
  } catch (err: any) {
    return {
      success: false,
      data: null,
      error: err.message || 'Unexpected error'
    }
  }
}
export const verifyotpformail = async (email: string, otp:string) => {
  try {
    debugger;
    const res = await encryptedPost<UserDeleteResponse>('/users/verifyotp',{email,otp})
    if (!res.success || !res.message) {
      return { success: false, error:  'No Data Found', data: null }
    }

    return {
      success: res.success,
      data: res.message,
    }
  } catch (err: any) {
    return {
      success: false,
      data: null,
      error: err.message || 'Unexpected error'
    }
  }
}

export const UpdateUser = async (data: any) => {
  try {
    const res = await encryptedPost<UserDeleteResponse>('/users/updateuser', data)
    if (!res.success || !res.message) {
      return { success: false, error:  'No Data Found', data: null }
    }

    return {
      success: res.success,
      message: res.message,
    }
  } catch (err: any) {
    return {
      success: false,
      message: null,
      error: err.message || 'Unexpected error'
    }
  }
}