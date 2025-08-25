'use client'

import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2'
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'
import { GetAllRoles } from '@/app/api/master/roleMaster/roleMaster'

const RoleListCards = () => {
  const [cardsData, setCardsData] = useState<any[]>([])

  useEffect(() => {
    const fetchRoles = async () => {
      const res = await GetAllRoles()
      if (res?.success && res.data) {
        const roles = res.data
        setCardsData([
          {
            title: 'Total Roles',
            stats: roles.length,
            avatarIcon: 'tabler-users',
            avatarColor: 'primary',
            trend: 'positive',
            subtitle: 'All Roles in System'
          },
          {
            title: 'Active Roles',
            stats: roles.filter(r => r.status === 'Active').length,
            avatarIcon: 'tabler-check',
            avatarColor: 'success',
            trend: 'positive',
            subtitle: 'Currently in Use'
          },
          {
            title: 'Inactive Roles',
            stats: roles.filter(r => r.status === 'Inactive').length,
            avatarIcon: 'tabler-ban',
            avatarColor: 'error',
            trend: 'negative',
            subtitle: 'Temporarily Disabled'
          },
          {
            title: 'Recently Added',
            stats: roles.filter(r => {
              const created = new Date(r.createdAt)
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

    fetchRoles()
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

export default RoleListCards
