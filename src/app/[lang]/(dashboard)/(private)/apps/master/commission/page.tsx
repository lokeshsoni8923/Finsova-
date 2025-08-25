/**
 * ! If you prefer to fetch data via REST API:
 *
 * const getBankAccounts = async () => {
 *   const res = await fetch(`${process.env.API_URL}/apps/bank-list`)
 *   if (!res.ok) throw new Error('Failed to fetch bank accounts')
 *   return res.json()
 * }
 */

import CommissionList from '@/views/apps/master/commission'

const CommissionListApp = async () => {
  return <CommissionList commissionData={[]} />
}

export default CommissionListApp
