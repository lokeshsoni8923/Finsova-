'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'

// Components
import OptionMenu from '@core/components/option-menu'

// Styles
import tableStyles from '@core/styles/table.module.css'

type TransactionType = {
  label: string
  date: string // raw string format
  trend: string
  icon: string
  status: 'success' | 'pending' | 'failed'
}

type StatusMap = Record<
  TransactionType['status'],
  { text: string; color: 'success' | 'warning' | 'error' }
>

const transactions: TransactionType[] = [
  {
    label: 'UPI transfer to Ramesh',
    date: '2023-07-24',
    status: 'success',
    trend: '- ₹1,250',
    icon: 'upi'
  },
  {
    label: 'Bill Payment',
    date: '2023-07-22',
    status: 'pending',
    trend: '- ₹600',
    icon: 'bill'
  },
  {
    label: 'Cashback Received',
    date: '2023-07-20',
    status: 'success',
    trend: '+ ₹50',
    icon: 'cashback'
  },
  {
    label: 'Zomato',
    date: '2023-07-16',
    status: 'failed',
    trend: '- ₹320',
    icon: 'zomato'
  },
  {
    label: 'DTH Recharge',
    date: '2023-07-16',
    status: 'success',
    trend: '- ₹299',
    icon: 'dth'
  }
]

const statusMap: StatusMap = {
  success: { text: 'Success', color: 'success' },
  pending: { text: 'Pending', color: 'warning' },
  failed: { text: 'Failed', color: 'error' }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

const getTrendColor = (trend: string) =>
  trend.trim().startsWith('+') ? 'success.main' : 'error.main'

const LatestTransactions = () => {
  return (
    <Card>
      <CardHeader
        title='Latest Transactions'
        action={<OptionMenu options={['Show all entries', 'Refresh', 'Export']} />}
      />
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead className='uppercase'>
            <tr className='border-be'>
              <th className='leading-6 plb-4 pis-6 pli-2'>Service</th>
              <th className='leading-6 plb-4 pli-2'>Date</th>
              <th className='leading-6 plb-4 pli-2'>Status</th>
              <th className='leading-6 plb-4 pie-6 pli-2 text-right'>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr key={index} className='border-0'>
                <td className='pis-6 pli-2 plb-3'>
                  <div className='flex items-center gap-4'>
                    <Avatar
                      variant='rounded'
                      sx={{
                        bgcolor: '#F5F5F5',
                        width: 40,
                        height: 40
                      }}
                    >
                      <img
                        width={24}
                        height={24}
                        src={`/images/icons/${txn.icon}.png`}
                        alt={txn.label}
                      />
                    </Avatar>
                    <Typography color='text.primary'>{txn.label}</Typography>
                  </div>
                </td>
                <td className='pli-2 plb-3'>
                  <Typography variant='body2' color='text.secondary'>
                    {formatDate(txn.date)}
                  </Typography>
                </td>
                <td className='pli-2 plb-3'>
                  <Chip
                    size='small'
                    label={statusMap[txn.status].text}
                    color={statusMap[txn.status].color}
                    variant='tonal'
                  />
                </td>
                <td className='pli-2 pie-6 text-right plb-3'>
                  <Typography color={getTrendColor(txn.trend)} fontWeight={500}>
                    {txn.trend}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default LatestTransactions
