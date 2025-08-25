import { encryptedGet, encryptedPatch, encryptedPost } from "@/libs/ApiClient"
import { TranscationListResponse } from "../types/transactionlist"


export const SaveTransaction = async (obj:{
    Amount:number,
        senderBank: string,
        companyAccount: string,
        utrNumber: string,
        transactionDateTime: string,
        recipient: string,
        status: string,
        userId: string
}) => {
  try {
    const res = await encryptedPost<TranscationListResponse>('/transaction/save',obj)
    if (res.message != "Transaction created successfully") {
      return { success: false, message:  "Transaction created failed", data: null }
    }

    return {
      success: res.success,
      data: res.data,
      message:res.message
    }
  } catch (err: any) {
    return {
      success: false,
      data: null,
      message:  "Transaction created failed"
    }
  }
}

export const FetchTransaction = async () => {
  try {
    const res = await encryptedGet<TranscationListResponse>('/transaction/fetch')
    if (res.message != "Transactions fetched successfully") {
      return { success: false, message:  "Transaction fetched failed", data: null }
    }

    return {
      success: res.success,
      data: res.data,
      message:res.message
    }
  } catch (err: any) {
    return {
      success: false,
      data: null,
      message:  "Transaction fetched failed"
    }
  }
}

export const AdminApprovalTransaction = async (
    _id: string,
    obj :{
        status: string,
        adminRemark: string
    }
) => {
  try {
    const res = await encryptedPatch<TranscationListResponse>(`/transaction/status/${_id}`,obj)
    if (res.message != "Transactions fetched successfully") {
      return { success: false, message:  "Transaction fetched failed", data: null }
    }

    return {
      success: res.success,
      data: res.data,
      message:res.message
    }
  } catch (err: any) {
    return {
      success: false,
      data: null,
      message:  "Transaction fetched failed"
    }
  }
}

