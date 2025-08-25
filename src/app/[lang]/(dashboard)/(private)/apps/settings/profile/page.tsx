'use client';

import { useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import {
  Business,
  Lock,
  AccountBalance,
  Settings as SettingsIcon,
  Person
} from '@mui/icons-material';

export default function ProfileSettings() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: any, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ mt: 4 }}>
      {/* Breadcrumb */}
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
        Settings / <strong>Profile</strong>
      </Typography>

      <Grid container spacing={3}>
        {/* LEFT CARD */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                src="/profile.jpg" // Replace with real image path
                sx={{ width: 100, height: 100, mx: 'auto', mb: 1 }}
              />
              <Typography fontWeight="bold">
                DEEPAK THATHERA (00100937025)
              </Typography>
              <Chip
                label="CHANNEL PARTNER"
                color="info"
                size="small"
                sx={{ mt: 1 }}
              />

              <Typography
                variant="subtitle2"
                color="text.secondary"
                textAlign="left"
                sx={{ mt: 3 }}
              >
                Personal Info
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', flexDirection:"column" , justifyContent:"start" , alignItems: "flex-start", gap:"20px" , mt: 1 ,py:"8px" }}>
                <Typography sx={{textAlign: 'left'}}>
                  <strong>Member Code:</strong> 2018700146
                </Typography>
                <Typography>
                  <strong>Mobile:</strong> 9549038395
                </Typography>
                <Typography>
                  <strong>Email:</strong> thatheradeepak1@gmail.com
                </Typography>
                <Typography>
                  <strong>Pan No.:</strong> BMVPT4454P
                </Typography>
                <Typography>
                  <strong>Aadhaar No.:</strong> xxxxxxxx9688
                </Typography>
                <Typography>
                  <strong>Voter ID:</strong> -
                </Typography>
                <Typography>
                  <strong>DL No.:</strong> -
                </Typography>
                <Typography>
                  <strong>Membership Date:</strong> 05 Jul 2020
                </Typography>
                <Typography>
                  <strong>KYC:</strong>{' '}
                  <Chip label="VERIFIED" size="small" color="success" />
                </Typography>
                <Typography>
                  <strong>Status:</strong>{' '}
                  <Chip label="ACTIVE" size="small" color="success" />
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* RIGHT CONTENT */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            {/* Tabs */}
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTab-root': { textTransform: 'none', minHeight: 48 }
              }}
            >
              <Tab
                icon={<Person fontSize="small" />}
                iconPosition="start"
                label="Personal"
              />
              <Tab
                icon={<Business fontSize="small" />}
                iconPosition="start"
                label="Business"
              />
              <Tab
                icon={<Lock fontSize="small" />}
                iconPosition="start"
                label="KYC"
              />
              <Tab
                icon={<AccountBalance fontSize="small" />}
                iconPosition="start"
                label="Accounts"
              />
              <Tab
                icon={<SettingsIcon fontSize="small" />}
                iconPosition="start"
                label="Service Settings"
              />
            </Tabs>

            {/* Tab Content */}
            <CardContent>
              {/* PERSONAL TAB */}
              {tabValue === 0 && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      First Name:
                    </Typography>
                    <Typography>DEEPAK</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      City:
                    </Typography>
                    <Typography>NAGAUR</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Last Name:
                    </Typography>
                    <Typography>THATHERA</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      District:
                    </Typography>
                    <Typography>-</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      DOB:
                    </Typography>
                    <Typography>05-Jul-2000</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      State:
                    </Typography>
                    <Typography>Rajasthan</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Address:
                    </Typography>
                    <Typography>
                      BEHIND POLICE STATION MERTA ROAD NAGAUR
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Pincode:
                    </Typography>
                    <Typography>341511</Typography>
                  </Grid>
                </Grid>
              )}

              {/* BUSINESS TAB */}
              {tabValue === 1 && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Business Name:
                    </Typography>
                    <Typography>Thathera Enterprises</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      GST No.:
                    </Typography>
                    <Typography>08ABCDE1234F1Z5</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Business Address:
                    </Typography>
                    <Typography>
                      Shop No. 12, Main Market, NAGAUR
                    </Typography>
                  </Grid>
                </Grid>
              )}

              {/* KYC TAB */}
              {tabValue === 2 && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      PAN Number:
                    </Typography>
                    <Typography>BMVPT4454P</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Aadhaar:
                    </Typography>
                    <Typography>xxxxxxxx9688</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Voter ID:
                    </Typography>
                    <Typography>-</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Driving License:
                    </Typography>
                    <Typography>-</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      KYC Status:
                    </Typography>
                    <Chip label="VERIFIED" size="small" color="success" />
                  </Grid>
                </Grid>
              )}

              {/* ACCOUNTS TAB */}
              {tabValue === 3 && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Bank Name:
                    </Typography>
                    <Typography>State Bank of India</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Account Number:
                    </Typography>
                    <Typography>XXXXXXXXXXXX1234</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      IFSC Code:
                    </Typography>
                    <Typography>SBIN0001234</Typography>
                  </Grid>
                </Grid>
              )}

              {/* SERVICE SETTINGS TAB */}
              {tabValue === 4 && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Email Notifications:
                    </Typography>
                    <Typography>Enabled</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      SMS Alerts:
                    </Typography>
                    <Typography>Enabled</Typography>
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
