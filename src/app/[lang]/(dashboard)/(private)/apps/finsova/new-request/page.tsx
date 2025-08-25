'use client';

import { Card, CardContent, Typography, Box, Button } from '@mui/material';

export default function PayinAccounts() {
  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        PAYMANT IN
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained">
          Add Account
        </Button>
      </Box>

      <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
        <CardContent>
          <Typography color="text.secondary">No Account Added</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
