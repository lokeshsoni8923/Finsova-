// 'use client'

// import { Card, CardContent, Typography, List, ListItem, ListItemText, Button, Box } from '@mui/material'

// const documents = [
//   {
//     title: 'UnderTaking Letter',
//     file: '/docs/d41d8cd98f00b204e9800998ecf8427e.pdf'
//   }
// ]

// export default function DocumentsDownloadsPage() {
//   return (
//     <Card>
//       <CardContent>
//         <Typography variant='h5' gutterBottom>
//           Documents
//         </Typography>
//         <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
//           Click download to save the document to your device.
//         </Typography>

//         <List>
//           {documents.map((doc, idx) => (
//             <ListItem
//               key={idx}
//               secondaryAction={
//                 <Button variant='contained' component='a' href={doc.file} download>
//                   Download
//                 </Button>
//               }
//             >
//               <ListItemText primary={doc.title} secondary={doc.file} />
//             </ListItem>
//           ))}
//         </List>

//         {documents.length === 0 && (
//           <Box sx={{ py: 6, textAlign: 'center' }}>
//             <Typography variant='body2' color='text.secondary'>No documents available.</Typography>
//           </Box>
//         )}
//       </CardContent>
//     </Card>
//   )
// }

'use client'
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Alert
} from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function LetterOfUndertaking() {
  const [formData, setFormData] = useState({
    partnerName: 'Deepak Thakera',
    date: new Date(),
    bankLimited: '',
    letterOfUndertaking: 'DEBIT PAY - Personal Consent',
    dearSir: '',
    email: 'Deepakthakera5@gmail.com',
    phoneNo: '9414010856',
    personalConsent: true,
    creditPay: false,
    debitPay: true,
    personalGateway: false
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field:any, value:any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    
    // Header
    pdf.setFontSize(16);
    pdf.setFont("", 'bold');
    pdf.text('Letter of Undertaking', 105, 20, { align: 'center' });
    
    // Form content
    pdf.setFontSize(12);
    pdf.setFont("", 'normal');
    
    let yPosition = 40;
    
    // Partner details
    pdf.text(`Partner Name: ${formData.partnerName}`, 20, yPosition);
    pdf.text(`Date: ${formData.date.toLocaleDateString()}`, 150, yPosition);
    yPosition += 20;
    
    pdf.text('Bank Limited:', 20, yPosition);
    pdf.text(formData.bankLimited || '_________________', 70, yPosition);
    yPosition += 15;
    
    pdf.text('Letter of Undertaking (DEBIT PAY - Personal Consent)', 20, yPosition);
    yPosition += 15;
    
    pdf.text('Dear Sir,', 20, yPosition);
    yPosition += 20;
    
    // Contact details
    pdf.text(`Email ID: ${formData.email}`, 20, yPosition);
    pdf.text(`Phone No.: ${formData.phoneNo}`, 120, yPosition);
    yPosition += 20;
    
    // Main content
    const mainText = `I the undersigned, do hereby undertake that the funds that you pay using DEBIT/UPI which are available for Personal Consent , Gym, the UPI, DEBIT PAY, I am liable will be duly safeguarded and I assure that all the transactions done with my debit and personal to send knowledge. And found in this transaction there are no DEBIT which are I shall be held responsible.`;
    
    const splitText = pdf.splitTextToSize(mainText, 170);
    pdf.text(splitText, 20, yPosition);
    yPosition += splitText.length * 7 + 10;
    
    const additionalText = `All bills that is furthermore must not be held liable on any process or entry for this line, facilities, details, notices, damages, or expenses arising out of or in connections with anything there we proceed to allow for it further assurance that this have been attentive of his understanding information and my DEBIT.`;
    
    const splitText2 = pdf.splitTextToSize(additionalText, 170);
    pdf.text(splitText2, 20, yPosition);
    yPosition += splitText2.length * 7 + 20;
    
    // Service selection
    pdf.text('Kindly select the service which you want to activate:', 20, yPosition);
    yPosition += 15;
    
    pdf.text(`Credit Pay: ${formData.creditPay ? '☑' : '☐'}`, 20, yPosition);
    pdf.text(`E-mail Pay: ${formData.debitPay ? '☑' : '☐'}`, 70, yPosition);
    pdf.text(`UPI Credit Pay: ${formData.personalGateway ? '☑' : '☐'}`, 120, yPosition);
    pdf.text('Personal Gateway: ☐', 170, yPosition);
    
    // Save PDF
    pdf.save('Letter_of_Undertaking.pdf');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
        {showSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            PDF generated and downloaded successfully!
          </Alert>
        )}
        
        <Paper elevation={3} sx={{ p: 4 }}>
          {/* Header */}
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
            Letter of Undertaking
          </Typography>
          
          {/* Partner Name and Date */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Partner Name"
                value={formData.partnerName}
                onChange={(e) => handleInputChange('partnerName', e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              {/* <DatePicker
                label="Date"
                value={formData.date}
                onChange={(date) => handleInputChange('date', date)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              /> */}
            </Grid>
          </Grid>
          
          {/* Bank Limited */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Bank Limited"
              value={formData.bankLimited}
              onChange={(e) => handleInputChange('bankLimited', e.target.value)}
              variant="outlined"
            />
          </Box>
          
          {/* Letter of Undertaking Type */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Letter of Undertaking"
              value={formData.letterOfUndertaking}
              onChange={(e) => handleInputChange('letterOfUndertaking', e.target.value)}
              variant="outlined"
              disabled
            />
          </Box>
          
          {/* Dear Sir */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Dear Sir"
              value={formData.dearSir}
              onChange={(e) => handleInputChange('dearSir', e.target.value)}
              variant="outlined"
              placeholder="Enter salutation"
            />
          </Box>
          
          {/* Contact Information */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Email ID"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Phone No."
                value={formData.phoneNo}
                onChange={(e) => handleInputChange('phoneNo', e.target.value)}
                variant="outlined"
              />
            </Grid>
          </Grid>
          
          {/* Main Content */}
          <Box sx={{ mb: 4, p: 3, bgcolor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="body1" paragraph>
              I the undersigned, do hereby undertake that the funds that you pay using <strong>DEBIT/UPI</strong> which are available for <strong>Personal Consent</strong>, Gym, the <strong>UPI, DEBIT PAY</strong>, I am liable will be duly safeguarded and I assure that all the transactions done with my debit and personal to send knowledge. And found in this transaction there are no <strong>DEBIT</strong> which are I shall be held responsible.
            </Typography>
            <Typography variant="body1" paragraph>
              I the said will provide required necessary ID proofs to the same account Against per Terms, Guidelines, money-transfers, financial, time-reach and expenses missing and doing all transactions.
            </Typography>
            <Typography variant="body1">
              All bills that is furthermore must not be held liable on any process or entry for this line, facilities, details, notices, damages, or expenses arising out of or in connections with anything there we proceed to allow for it further assurance that this have been attentive of his understanding information and my <strong>DEBIT</strong>.
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          {/* Service Selection */}
          <Typography variant="h6" gutterBottom>
            Kindly select the service which you want to activate:
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.creditPay}
                    onChange={(e) => handleInputChange('creditPay', e.target.checked)}
                  />
                }
                label="Credit Pay"
              />
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.debitPay}
                    onChange={(e) => handleInputChange('debitPay', e.target.checked)}
                  />
                }
                label="E-mail Pay"
              />
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.personalGateway}
                    onChange={(e) => handleInputChange('personalGateway', e.target.checked)}
                  />
                }
                label="UPI Credit Pay"
              />
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                control={<Checkbox />}
                label="Personal Gateway"
              />
            </Grid>
          </Grid>
          
          <Divider sx={{ mb: 3 }} />
          
          {/* Form Fields */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Received behalf of"
                defaultValue="Deepak Thakera"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Proprietor - Company Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Authorized Signature"
                variant="outlined"
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Place"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Date"
                variant="outlined"
              />
            </Grid>
          </Grid>
          
          {/* Additional Details */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="GSTIN Number"
                defaultValue="Sheartix Singh"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Contact Number"
                defaultValue="9414010856"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
              />
            </Grid>
          </Grid>
          
          {/* Download Section */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              YE DOWNLOAD SE UPAR VALE DROPDOWN ME PHR PDF DOWNLOAD
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={generatePDF}
              sx={{ mt: 2, px: 4, py: 1.5 }}
            >
            Create Pdf
            </Button>
          </Box>
          
         

        </Paper>
      </Container>
  );
}