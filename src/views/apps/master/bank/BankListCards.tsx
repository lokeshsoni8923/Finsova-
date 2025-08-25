'use client'

import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2'
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'
import { GetAllBanks } from '@/app/api/master/bankMaster/bankMaster'

const BankListCards = () => {
  const [cardsData, setCardsData] = useState<any[]>([])

  useEffect(() => {
    const fetchBanks = async () => {
      const res = await GetAllBanks()
      if (res?.success && res.data?.banks) {
        const banks = res.data.banks

        setCardsData([
          {
            title: 'Total Banks',
            stats: banks.length,
            avatarIcon: 'tabler-building-bank',
            avatarColor: 'primary',
            trend: 'positive',
            subtitle: 'Linked for Payment'
          },
          {
            title: 'Active Banks',
            stats: banks.filter(b => b.status === 'Active').length,
            avatarIcon: 'tabler-check',
            avatarColor: 'success',
            trend: 'positive',
            subtitle: 'Available to Receive'
          },
          {
            title: 'Inactive Banks',
            stats: banks.filter(b => b.status === 'Inactive').length,
            avatarIcon: 'tabler-ban',
            avatarColor: 'error',
            trend: 'negative',
            subtitle: 'Disabled Accounts'
          },
          {
            title: 'Recently Added',
            stats: banks.filter(b => {
              const created = new Date(b.createdAt)
              const now = new Date()
              const diffDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
              return diffDays <= 7
            }).length,
            avatarIcon: 'tabler-calendar-plus',
            avatarColor: 'warning',
            trend: 'positive',
            subtitle: 'Last 7 Days'
          }
        ])
      }
    }

    fetchBanks()
  }, [])

  return (
    <Grid container spacing={6}>
      {cardsData.map((item, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
          <HorizontalWithSubtitle {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default BankListCards
