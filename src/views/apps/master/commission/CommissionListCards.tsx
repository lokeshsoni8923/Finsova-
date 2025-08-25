'use client'

import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2'
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'
import { GetAllCommissions } from '@/app/api/master/commissionMaster/commissionMaster'

const CommissionListCards = () => {
  const [cardsData, setCardsData] = useState<any[]>([])

  useEffect(() => {
    const fetchCommissions = async () => {
      const res = await GetAllCommissions()
      if (res?.success && res.data?.commissions) {
        const commissions = res.data.commissions

        const normalizeStatus = (s: string) => (s === 'Active' || s === 'true' || s === 'True' ? 'Active' : 'Inactive')

        setCardsData([
          {
            title: 'Total Commissions',
            stats: commissions.length,
            avatarIcon: 'tabler-currency-dollar',
            avatarColor: 'primary',
            trend: 'positive',
            subtitle: 'All Services Covered'
          },
          {
            title: 'Active Commissions',
            stats: commissions.filter(c => normalizeStatus(c.status) === 'Active').length,
            avatarIcon: 'tabler-check',
            avatarColor: 'success',
            trend: 'positive',
            subtitle: 'Currently in Use'
          },
          {
            title: 'Inactive Commissions',
            stats: commissions.filter(c => normalizeStatus(c.status) === 'Inactive').length,
            avatarIcon: 'tabler-ban',
            avatarColor: 'error',
            trend: 'negative',
            subtitle: 'Temporarily Disabled'
          },
          {
            title: 'Recently Added',
            stats: commissions.filter(c => {
              const created = new Date(c.createdAt)
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

    fetchCommissions()
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

export default CommissionListCards
