'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
} from '@mui/material'


const WalletRechargePage = () => {
  const router = useRouter()
   
   const handleButtonClick = (buttonName: string) => {
     console.log(`${buttonName} clicked`)
     // Navigate to the dynamic route with the button name
     router.push(`/apps/finsova/all-reports/${encodeURIComponent(buttonName)}`)
   }

  const sections = [
    {
      title: 'REPORT',
      buttons: [
        { name: 'NEW REPORT' },
      ]
    },
    {
      title: 'Wallet Recharge',
      buttons: [
        { name: 'Load Money' },
        { name: 'Add Money' },
        { name: 'Razorpay Load Money' },
        { name: 'PAYTM Load Money' },
        { name: 'Qr Load Money' },
        { name: 'Virtual Account' },
      ]
    },
    {
      title: 'Accounts Ledger',
      buttons: [
        { name: 'Wallet Ledger' },
        { name: 'Old Wallet Ledger' },
        { name: 'Fund Requests' },
        { name: 'Reserve Wallet' },
      ]
    },
    {
      title: 'Utility',
      buttons: [
        { name: 'RECHARGE' },
        { name: 'OFFLINE' },
        { name: 'BBPS' },
        { name: 'UTI' },
        { name: 'CMS' },
        { name: 'IK BILL PAY' },
        { name: 'CARD BILL PAYMENT' },
      ]
    },
    {
      title: 'Money Transfer',
      buttons: [
        { name: 'DMT' },
        { name: 'EXPRESSPAY' },
        { name: 'DMT PLUS' },
        { name: 'MONEY TRANSFER' },
      ]
    },
    {
      title: 'AEPS, MATM & Others',
      buttons: [
        { name: 'AEPS' },
        { name: 'MATM' },
        { name: 'FLIGHT BOOKING' },
        { name: 'INSURANCE DEKHO' },
      ]
    },
  ]

  return (
    <Box sx={{ p: 3 }}>
      {sections.map((section, sectionIndex) => (
        <Card key={sectionIndex} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
              {section.title}
            </Typography>
            
                         <Grid container spacing={2}>
               {section.buttons.map((option, index) => (
                 <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                   <Button
                     variant="contained"
                     fullWidth
                     size="large"
                     onClick={() => handleButtonClick(option.name)}
                                           sx={{
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        py: 1.5,
                      }}
                   >
                     {option.name}
                   </Button>
                 </Grid>
               ))}
             </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}

export default WalletRechargePage
