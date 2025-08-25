'use client';

import { Card, CardContent, Typography, Grid, Button, Box, Chip, Link } from '@mui/material';

export default function PayoutAccounts() {
  const payoutData = {
    bankName: 'BANK OF BARODA',
    ifsc: 'BARBOMERTAR',
    status: 'BLOCKED',
    accountHolder: 'DEEPAK',
    accountNumber: '57230100001376',
    remarks: 'Account Block on approval',
    chequeImage: '#', // Link for cheque image
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        PAYMNT OUT
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained">
          Add Account
        </Button>
      </Box>

      <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Bank Name</Typography>
              <Typography>{payoutData.bankName}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">A/c Holder's Name</Typography>
              <Typography>{payoutData.accountHolder}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">IFSC</Typography>
              <Typography>{payoutData.ifsc}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">A/c Number</Typography>
              <Typography>{payoutData.accountNumber}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Status</Typography>
              <Chip label={payoutData.status} color="error" size="small" />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2" color="text.secondary">Cheque Image</Typography>
              <Link href={payoutData.chequeImage} underline="hover" target="_blank">
                View Image
              </Link>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">Remarks</Typography>
              <Typography>{payoutData.remarks}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
