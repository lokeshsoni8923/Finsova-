import { encryptedGet } from "@/libs/ApiClient"
export const GetUserBalance = async (userId: string|undefined) => {
  try {
    const res = await encryptedGet<any>(`/transaction/balance/${userId}`)
    if (!res.success) {
      return { success: false, error:  'No Data Found', data: null }
    }

    return {
      success: res.success,
      data: res,
    }
  } catch (err: any) {
    return {
      success: false,
      data: null,
      error: err.message || 'Unexpected error'
    }
  }
}