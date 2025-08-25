// Component Imports
import BankList from '@/views/apps/master/bank/index'



/**
 * ! If you prefer to fetch data via REST API:
 *
 * const getBankAccounts = async () => {
 *   const res = await fetch(`${process.env.API_URL}/apps/bank-list`)
 *   if (!res.ok) throw new Error('Failed to fetch bank accounts')
 *   return res.json()
 * }
 */

const BankListApp = async () => {

  
  return <BankList bankData={[]} />
}

export default BankListApp
