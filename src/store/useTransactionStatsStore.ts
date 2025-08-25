import { create } from 'zustand'

interface TransactionStats {
  total: number
  pending: number
  Approved: number
  Rejected: number
  todayCount: number
  last30DaysCount: number
  setStats: (stats: Partial<TransactionStats>) => void
}

export const useTransactionStatsStore = create<TransactionStats>((set) => ({
  total: 0,
  pending: 0,
  Approved: 0,
  Rejected: 0,
  todayCount: 0,
  last30DaysCount: 0,
  setStats: (stats) => set((state) => ({ ...state, ...stats }))
}))
