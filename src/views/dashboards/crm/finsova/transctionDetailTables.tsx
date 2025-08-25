'use client';

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Grid,
  Card,
} from '@mui/material';

export default function AccountDetailsPage() {
  return (
    <Box sx={{ p: 4, backgroundColor: '#fafafa', minHeight: '100vh' }}>
      {/* Transaction Account Details */}
      <Card sx={{ mb: 4 ,p:5 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Transaction Account Details
        </Typography>
        <Grid container spacing={2}>
          {[
            {
              name: 'FINRELIABLE MOBILITY PVT LTD',
              bank: 'BOI-0353',
              ifsc: 'BKID0006736',
              acc: '673620110000353',
              type: 'Current Account',
            },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <TableContainer component={Paper} sx={{ border: '1px solid #ddd' }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ border: '1px solid #ddd' }}>
                        Name: {item.name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: '1px solid #ddd' }}>
                        Bank Name: {item.bank}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: '1px solid #ddd' }}>
                        IFSC Code: {item.ifsc}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: '1px solid #ddd' }}>
                        Account Number: {item.acc}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: '1px solid #ddd' }}>
                        Account Type: {item.type}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          ))}
        </Grid>
      </Card>

      {/* Cash Deposit */}
      <Card  sx={{ mb: 4, p: 5 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Cash Deposit
        </Typography>
        <Grid container spacing={2}>
          {[
            {
              name: 'FINRELIABLE MOBILITY PVT LTD',
              bank: 'BANK OF BARODA',
              ifsc: 'BARB0SOHNAR',
              acc: '33710200000304',
              type: 'Current Account',
            },
            {
              name: 'FINRELIABLE DIGITECH PVT LTD',
              bank: 'SBI BANK-4900',
              ifsc: 'SBIN0016474',
              acc: '41974554900',
              type: 'Current Account',
            },
            {
              name: 'FINRELIABLE MOBILITY PVT LTD',
              bank: 'BOI-0353',
              ifsc: 'BKID0006736',
              acc: '673620110000353',
              type: 'Current Account',
            },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <TableContainer component={Paper} sx={{ border: '1px solid #ddd' }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ border: '1px solid #ddd' }}>
                        Name: {item.name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: '1px solid #ddd' }}>
                        Bank Name: {item.bank}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: '1px solid #ddd' }}>
                        IFSC Code: {item.ifsc}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: '1px solid #ddd' }}>
                        Account Number: {item.acc}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: '1px solid #ddd' }}>
                        Account Type: {item.type}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          ))}
        </Grid>
      </Card>

      <Card sx={{ mb: 4 ,p:5 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Online Transfer (IMPS/NEFT/RTGS)
        </Typography>
      <Grid container spacing={2}>
          {[
            {
              name: 'FINRELIABLE MOBILITY PVT LTD',
              bank: 'BANK OF BARODA',
              ifsc: 'BARB0SOHNAR',
              acc: '33710200000304',
              type: 'Current Account',
            },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <TableContainer component={Paper} sx={{ border: '1px solid #ddd' }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ border: '1px solid #ddd' }}>
                        Bank Name: {item.bank}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: '1px solid #ddd' }}>
                        IFSC Code: {item.ifsc}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: '1px solid #ddd' }}>
                        Account Number: {item.acc}
                      </TableCell>
                    </TableRow>
                   
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
}
