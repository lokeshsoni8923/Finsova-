"use client"
// MUI Imports
import Grid from '@mui/material/Grid2'
import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import KycModalWrapper from '@/components/dialogs/kyc-modal-wrapper'

// Component Imports
import DistributedBarChartOrder from '@views/dashboards/crm/DistributedBarChartOrder'
import LineAreaYearlySalesChart from '@views/dashboards/crm/LineAreaYearlySalesChart'
import CardStatVertical from '@/components/card-statistics/Vertical'
import BarChartRevenueGrowth from '@views/dashboards/crm/BarChartRevenueGrowth'
import EarningReportsWithTabs from '@views/dashboards/crm/EarningReportsWithTabs'
import RadarSalesChart from '@views/dashboards/crm/RadarSalesChart'
import SalesByCountries from '@views/dashboards/crm/SalesByCountries'
import ProjectStatus from '@views/dashboards/crm/ProjectStatus'
import ActiveProjects from '@views/dashboards/crm/ActiveProjects'
import LastTransaction from '@views/dashboards/crm/LastTransaction'
import ActivityTimeline from '@views/dashboards/crm/ActivityTimeline'
import WalletDashboard from '@views/dashboards/crm/finsova/wallet'

import ServicesDashboard from '@/views/dashboards/crm/finsova/services'
import PromoCards from '@/views/dashboards/crm/finsova/PromoCards'
import LatestTransactions from '@/views/dashboards/crm/finsova/latestTransactions'
import BillOverviewCard from '@/views/dashboards/crm/finsova/BillOverviewCard'
import BillingSummary from '@/views/dashboards/crm/finsova/BillOverviewCard'
import UpcomingBills from '@/views/dashboards/crm/finsova/UpcomingBills'
import { useEffect, useState } from 'react'
import { doubleDecryptAES } from '@/utils/crypto'
import { useRouter } from 'next/navigation'
import AccountDetailsPage from '@/views/dashboards/crm/finsova/transctionDetailTables'
import { User } from '@/types/globalTypes'




const DashboardCRM = () => {
  const router = useRouter()

  const serviceButtons = [
    { name: 'AEPS1', path: '/apps/finsova/aeps1' },
    { name: 'AEPS2', path: '/apps/finsova/aeps2' },
    { name: 'EXPRESSPAY', path: '/apps/finsova/expresspay' },
    { name: 'RECHARGE', path: '/apps/finsova/recharge' },
    { name: 'CMS', path: '/apps/finsova/cms' },
    { name: 'CREDIT CARD BILL PAYMENT', path: '/apps/finsova/credit-card-bill-payment' },
    { name: 'DMT PLUS', path: '/apps/finsova/dmt-plus' },
    { name: 'UTI PAN', path: '/apps/finsova/uti-pan' },
    { name: 'BOOK FLIGHT', path: '/apps/finsova/book-flight' },
    { name: 'INSURANCE DEKHO', path: '/apps/finsova/insurance-dekho' },
    { name: 'EDUCATION FEES', path: '/apps/finsova/education-fees' }
  ]

  const handleClick = (link?: string) => {
    if (link) {
      router.push(link)
    }
  }

  
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // This runs only in the browser
    const encryptedData = localStorage.getItem('userData');
    if (encryptedData) {
      try {
        const decrypted = doubleDecryptAES(encryptedData);
        setUser(JSON.parse(decrypted));
      } catch (err) {
        console.error('Failed to decrypt user data:', err);
      }
    }
  }, []);

  // if (!user) return <p>Loading...</p>

  console.log("user",user)



  return (
    <Grid container spacing={6}>
      {/* Service Buttons Section */}
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
              {serviceButtons.map((service, index) => (
                <KycModalWrapper key={index}  
                 onServiceClick={() => handleClick(service.path)}
                isKycDone={user?.isKycCompleted}
                languagePreference='en'>
                  <Button
                    variant='contained'
                    sx={{
                      color: 'white',
                      textTransform: 'none',
                      borderRadius: '20px',
                      px: 3,
                      py: 1,
                      fontSize: '0.9rem',
                      fontWeight: 500
                    }}
                  >
                    {service.name}
                  </Button>
                </KycModalWrapper>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Banner Image */}
      <Grid size={{ xs: 12 }}>
        <Card>
          <Box
            component='img'
            src='/images/banner/Finsova Combo Offer Promotion.png'
            alt='Finsova Banner'
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: 600,
              objectFit: 'cover',
              borderRadius: 1
            }}
          />
        </Card>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <UpcomingBills />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <WalletDashboard />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <ServicesDashboard />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <PromoCards />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <AccountDetailsPage />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <BillingSummary />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <LatestTransactions />
      </Grid>
      {/* <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
        <DistributedBarChartOrder />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
        <LineAreaYearlySalesChart />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
        <CardStatVertical
          title='Total Profit'
          subtitle='Last Week'
          stats='1.28k'
          avatarColor='error'
          avatarIcon='tabler-credit-card'
          avatarSkin='light'
          avatarSize={44}
          chipText='-12.2%'
          chipColor='error'
          chipVariant='tonal'
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
        <CardStatVertical
          title='Total Sales'
          subtitle='Last Week'
          stats='24.67k'
          avatarColor='success'
          avatarIcon='tabler-currency-dollar'
          avatarSkin='light'
          avatarSize={44}
          chipText='+24.67%'
          chipColor='success'
          chipVariant='tonal'
        />
      </Grid>
      <Grid size={{ xs: 12, md: 8, lg: 4 }}>
        <BarChartRevenueGrowth />
      </Grid>
      <Grid size={{ xs: 12, lg: 8 }}>
        <EarningReportsWithTabs />
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <RadarSalesChart />
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <SalesByCountries />
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <ProjectStatus />
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <ActiveProjects />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <LastTransaction serverMode={serverMode} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ActivityTimeline />
      </Grid> */}
    </Grid>
  )
}

export default DashboardCRM
