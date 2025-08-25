export interface User {
  isKycCompleted?: boolean
  id?: string
  name?: string
  email?: string
  role?: string
}
export interface FundRequest {
  id: string
  requestDate: string
  modeOfPayment: string
  totalAmount: number
  receipt: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PROCESSING'
  remarks: string
}