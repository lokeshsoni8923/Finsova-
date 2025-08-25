'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { ReactElement } from 'react'
import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'

// Icons
import SchoolIcon from '@mui/icons-material/School'
import HomeIcon from '@mui/icons-material/Home'
import ReceiptIcon from '@mui/icons-material/Receipt'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import MoneyIcon from '@mui/icons-material/Money'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import RefreshIcon from '@mui/icons-material/Refresh'
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic'

const FundWithdrawalPage = (): ReactElement => {
  const params = useParams()

  // States
  const [mobileNumber, setMobileNumber] = useState('')

  // Feature cards data
  const featureCards = [
    {
      title: 'EDUCATION FEES',
      icon: <SchoolIcon sx={{ fontSize: 40 }} />
    },
    {
      title: 'RENT PAYMENT',
      icon: <HomeIcon sx={{ fontSize: 40 }} />
    },
    {
      title: 'TOTAL LOAD',
      icon: <ReceiptIcon sx={{ fontSize: 40 }} />
    },
    {
      title: 'TOTAL PAYOUT',
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 40 }} />
    }
  ]

  // Quick links data with colors as per your image
  const quickLinks = [
    { title: 'Credit Card Bill Payment', icon: <CreditCardIcon sx={{ color: '#1976d2' }} />, path: '/credit-card-payment' },
    { title: 'Fund Withdrawal', icon: <MoneyIcon sx={{ color: '#00BCD4' }} />, path: '/fund-withdrawal' },
    { title: 'Rent Payment', icon: <HomeIcon sx={{ color: '#FFC107' }} />, path: '/rent-payment' },
    { title: 'Fund Settlement', icon: <AccountBalanceWalletIcon sx={{ color: '#1976d2' }} />, path: '/fund-settlement' },
    { title: 'Register Sender', icon: <PersonAddIcon sx={{ color: '#FF9800' }} />, path: '/register-sender' },
    { title: 'Transactions', icon: <SwapHorizIcon sx={{ color: '#4CAF50' }} />, path: '/transactions' },
    { title: 'Total Payout', icon: <AccountBalanceWalletIcon sx={{ color: '#1565C0' }} />, path: '/total-payout' },
    { title: 'Load Wallet', icon: <AccountBalanceWalletIcon sx={{ color: '#4CAF50' }} />, path: '/load-wallet' },
    { title: 'Account Ledger', icon: <ReceiptIcon sx={{ color: '#00BCD4' }} />, path: '/account-ledger' },
    { title: 'Relationship Manager', icon: <HeadsetMicIcon sx={{ color: '#00695C' }} />, path: '/relationship-manager' }
  ]

  const handleMobileNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMobileNumber(event.target.value)
  }

  const handleRefreshMobile = () => {
    setMobileNumber('')
  }

  const handleFeatureCardClick = (title: string) => {
    console.log(`Clicked on ${title}`)
    // Add navigation logic here if needed
  }

  return (
    <Box sx={{ p: 3, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Top Feature Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {featureCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                }
              }}
              onClick={() => handleFeatureCardClick(card.title)}
            >
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <Box sx={{ mb: 2 }}>
                  {card.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {card.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Left Panel - Mobile Number Input */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: 'fit-content' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>
                Enter Mobile Number
              </Typography>

              <Box sx={{ position: 'relative' }}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  placeholder="Mobile Number"
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                  sx={{ mb: 2 }}
                  InputProps={{
                    style: { fontSize: '20px', padding: '18px 16px' }
                  }}
                  InputLabelProps={{
                    style: { fontSize: '18px' }
                  }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<RefreshIcon />}
                  onClick={handleRefreshMobile}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    minWidth: 'auto',
                    borderRadius: '50%',
                    width: 40,
                    height: 40
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Content - Payment Gateway Checkout */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h3" sx={{ mb: 4, fontWeight: 'bold' }}>
                Payment Gateway Checkout (PG)
              </Typography>

              {/* Important Notes Section */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
                  Important Notes
                </Typography>

                {/* English Notes */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    English:
                  </Typography>
                  <Box component="ul" sx={{ pl: 3, mb: 3 }}>
                    <Typography component="li" variant="body1" sx={{ mb: 2, fontSize: '18px', lineHeight: 1.6 }}>
                      The transaction with Payment Gateway (PG) may sometimes take time to be successful. The payment to the beneficiary will be done only after success has been received from the payment gateway.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 2, fontSize: '18px', lineHeight: 1.6 }}>
                      Transactions may take a few minutes to process. Please do not refresh or navigate away from the payment page.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 2, fontSize: '18px', lineHeight: 1.6 }}>
                      We use a secure third-party payment gateway to process your transaction. By proceeding, you agree to their terms and conditions.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 2, fontSize: '18px', lineHeight: 1.6 }}>
                      Successful payment does not guarantee service/product delivery if incorrect details are provided.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 2, fontSize: '18px', lineHeight: 1.6 }}>
                      Your payment details are securely transmitted through encrypted channels. However, we do not store any payment information.
                    </Typography>
                  </Box>
                </Box>

                {/* Hindi Notes */}
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    महत्वपूर्ण नोट्स:
                  </Typography>
                  <Box component="ul" sx={{ pl: 3 }}>
                    <Typography component="li" variant="body1" sx={{ mb: 2, fontSize: '18px', lineHeight: 1.6 }}>
                      Payment Gateway (PG) के साथ लेन-देन कभी-कभी सफल होने में समय लग सकता है। लाभार्थी को भुगतान केवल तभी किया जाएगा जब Payment Gateway से सफलता प्राप्त हो।
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 2, fontSize: '18px', lineHeight: 1.6 }}>
                      लेन-देन में कुछ मिनट लग सकते हैं। कृपया भुगतान पेज को रिफ्रेश न करें या नेविगेट न करें।
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Sidebar - Quick Links */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>
                Quick Links
              </Typography>

              <List sx={{ p: 0 }}>
                {quickLinks.map((link, index) => (
                  <Box key={index}>
                    <Link href={link.path} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                      <ListItem
                        sx={{
                          borderRadius: 1,
                          mb: 0.5,
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: '#f5f5f5'
                          }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 50 }}>
                          {React.cloneElement(link.icon, { sx: { fontSize: 28, color: link.icon.props.sx.color } })}
                        </ListItemIcon>
                        <ListItemText
                          primary={link.title}
                          primaryTypographyProps={{
                            variant: 'body1',
                            sx: { fontWeight: 500, fontSize: '18px' }
                          }}
                        />
                      </ListItem>
                    </Link>
                    {index < quickLinks.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FundWithdrawalPage
