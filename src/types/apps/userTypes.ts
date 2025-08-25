// Type Imports
import type { ThemeColor } from '@core/types'

export type UsersType = {
  currentPlan:string,
  id?: number
  role: string
  email: string
  avatar?: string
  country?: string
  contact?: string
  password?:string
  name: string
  username: string
  avatarColor?: ThemeColor
  isActive?:boolean
  isKycCompleted?:boolean,
  status:string
}
