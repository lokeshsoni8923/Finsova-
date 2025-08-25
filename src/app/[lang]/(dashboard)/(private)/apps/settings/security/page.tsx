import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const Page = () => {
    
  return (
    <>
         <Box sx={{ p: 2 }}>
    {/* Breadcrumb */}
    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
      Settings / <strong>Change Password</strong>
    </Typography>

    {/* Form Card */}
    <Card sx={{ borderRadius: 2, boxShadow: 2, maxWidth: 1000 }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography>
              Old Password : <span style={{ color: 'red' }}>*</span>
            </Typography>
            <input
              type="password"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
          </Box>

          <Box>
            <Typography>
              New Password : <span style={{ color: 'red' }}>*</span>
            </Typography>
            <input
              type="password"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
          </Box>

          <Box>
            <Typography>
              Confirm Password : <span style={{ color: 'red' }}>*</span>
            </Typography>
            <input
              type="password"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
          </Box>

          <Button
            variant="contained"
            sx={{
              width: 'fit-content',
            }}
          >
            Update Password
          </Button>

          {/* Password Rule */}
          <Typography
            sx={{
              color: 'red',
              fontSize: '0.85rem',
              lineHeight: 1.4,
              mt: 1,
            }}
          >
            Password must be alphanumeric and special character.
            (It expects at least 1 Capital letter, 1 small-case letter,
            1 digit, 1 special character (!@$%*--.) and the length should
            be between 6-25 characters.)
          </Typography>
        </Box>
      </CardContent>
    </Card>
  </Box>      
    </>
  )
}

export default Page