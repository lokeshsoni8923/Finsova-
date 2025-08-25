import { encryptedPost } from '../../../../libs/ApiClient'
import { MobiResponse, ViewBillResponse, RechargeStatusResponse ,CommonResponse, ResponseRecharge} from '../../types/bbps/mobikwick/mobiTypes'
import type { LoginResponse } from '../../types/userTypes' // or inline if you prefer
import { doubleDecryptAES, doubleEncryptAES } from '@/utils/crypto'

export const fetchPlan = async (CircleID: number, operator: number) => {
  try {
    debugger
    const res = await encryptedPost<MobiResponse>('/bpps/mobikwik/plan-fetch', { opId:operator,cirId: CircleID })
    if (!res.success || !res.data) {
      return { success: false, error: res.message || 'plans fetch failed', data: null }
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
export const fetchPostpaidBill = async (mobileNumber:string ,CircleID: string, operator: string) => {
  try {
    debugger
    const res = await encryptedPost<MobiResponse>('/bpps/mobikwik/plan-fetch', { opId:operator,cirId: CircleID })
    if (!res.success || !res.data) {
      return { success: false, error: res.message || 'plans fetch failed', data: null }
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

export const fetchOperators = async (category: string) => {
  try {
    debugger
    const res = await encryptedPost<any>('/mob/operators', { category:category})
    if (!res.data) {
      return { success: false, error: res.message || 'Operators fetch failed', data: null }
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
export const fetchPlanByType = async () => {
  try {

    const res = await encryptedPost<MobiResponse>('/api/mob/planTypes')
    if (!res.data) {
      return { success: false, error: res.message || 'Operators fetch failed', data: null }
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
export const fetchCircles = async () => {
  try {

    const res = await encryptedPost<any>('/mob/circles')
    debugger
    if (!res.data) {
      return { success: false, error: res.message || 'Circles fetch failed', data: null }
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
export const fetchValidateBill = async (CircleID: string, operator: number,consumerNumber:number) => {
  try {
    debugger
    const res = await encryptedPost<CommonResponse>('/bpps/mobikwik/retailer-validation', {opId:operator,cirId: CircleID ,consumerNumber:consumerNumber})
    if (!res.data) {
      return { success: false, error: res.message || 'Validation Failed for this api', data: null }
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
export const fetchViewBill = async (circleId: string, providerId: number,consumerNumber:any) => {
  try {
    debugger
    const res = await encryptedPost<ViewBillResponse>('/bpps/mobikwik/view-bill', {op:String(providerId),cir: String(circleId) ,cn:String(consumerNumber)})
    if (!res.data) {
      return { success: false, error: res.message?.text || 'Validation Failed for this api', data: null }
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
export const fetchRechargePayBill = async (circleId: string, providerId: number, consumerNumber: number) => {
  try {
    debugger
    const res = await encryptedPost<ResponseRecharge>('/bpps/mobikwik/recharge', {op:providerId,cir: circleId ,cn:consumerNumber})
    if (!res.data) {
      return { success: false, error: res.message || 'Error In Recharing and bill paying', data: null }
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
export const checkRechargeStatus = async (CircleID: string, operator: number,consumerNumber:any) => {
  try {
    debugger
    const res = await encryptedPost<RechargeStatusResponse>('/bpps/mobikwik/recharge-status', {op:operator,cir: CircleID ,cn:consumerNumber})
    if (!res.data) {
      return { success: false, error: res.message || 'Recharge Checking Failed', data: null }
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
export const fetchCCBill = async (circleId: string, providerId: number,consumerNumber:any,checksum:string) => {
  try {
    debugger
    const res = await encryptedPost<ResponseRecharge>('/bpps/mobikwik/recharge', {op:providerId,cir: circleId ,cn:consumerNumber})
    if (!res.data) {
      return { success: false, error: res.message || 'Error In Recharing and bill paying', data: null }
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




