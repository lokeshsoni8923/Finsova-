'use client'

import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2'
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'
import { GetAllServiceProviders } from '@/app/api/master/serviceProviderMaster/serviceMaster'

const ServiceProviderListCards = () => {
  const [cardsData, setCardsData] = useState<any[]>([])

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await GetAllServiceProviders()
      if (res?.success && res.data?.providers) {
        const providers = res.data.providers

        const normalizeStatus = (s: string) => (s === 'Active' || s === 'true' || s === 'True' ? 'Active' : 'Inactive')

        setCardsData([
          {
            title: 'Total Service Providers',
            stats: providers.length,
            avatarIcon: 'tabler-truck-delivery',
            avatarColor: 'primary',
            trend: 'positive',
            subtitle: 'All Providers in System'
          },
          {
            title: 'Active Providers',
            stats: providers.filter(p => normalizeStatus(p.status) === 'Active').length,
            avatarIcon: 'tabler-check',
            avatarColor: 'success',
            trend: 'positive',
            subtitle: 'Currently Operational'
          },
          {
            title: 'Inactive Providers',
            stats: providers.filter(p => normalizeStatus(p.status) === 'Inactive').length,
            avatarIcon: 'tabler-ban',
            avatarColor: 'error',
            trend: 'negative',
            subtitle: 'Temporarily Disabled'
          },
          {
            title: 'Recently Added',
            stats: providers.filter(p => {
              const created = new Date(p.createdAt)
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

    fetchProviders()
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

export default ServiceProviderListCards
