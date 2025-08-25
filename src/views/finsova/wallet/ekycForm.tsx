'use client'

import { useState } from 'react'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import { IconUser, IconBuilding, IconPhone, IconMail, IconId } from '@tabler/icons-react'

const documentTypes = [
  { value: 'aadhaar', label: 'Aadhaar Card' },
  { value: 'pan', label: 'PAN Card' },
  { value: 'passport', label: 'Passport' },
  { value: 'voter', label: 'Voter ID' }
]

const userTypes = [
  { value: 'individual', label: 'Individual' },
  { value: 'corporate', label: 'Corporate' }
]

const EKYCPage = () => {
  const [userType, setUserType] = useState('individual')
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    documentType: '',
    documentNumber: '',
    companyName: '',
    contactPerson: '',
    gstin: '',
    cin: ''
  })

  const [errors, setErrors] = useState<any>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' }) // Clear error on input
  }

  const validateFields = () => {
    const newErrors: any = {}

    if (userType === 'individual') {
      if (!formData.fullName) newErrors.fullName = 'Full Name is required'
      if (!formData.mobile) newErrors.mobile = 'Mobile Number is required'
      if (!formData.email) newErrors.email = 'Email is required'
      if (!formData.documentType) newErrors.documentType = 'Document Type is required'
      if (!formData.documentNumber) newErrors.documentNumber = 'Document Number is required'
    } else {
      if (!formData.companyName) newErrors.companyName = 'Company Name is required'
      if (!formData.contactPerson) newErrors.contactPerson = 'Contact Person is required'
      if (!formData.email) newErrors.email = 'Email is required'
      if (!formData.mobile) newErrors.mobile = 'Phone Number is required'
      if (!formData.gstin) newErrors.gstin = 'GSTIN is required'
      if (!formData.cin) newErrors.cin = 'CIN is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateFields()) return
    console.log('eKYC Submitted:', { userType, ...formData })
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent>
            <Typography variant='h6' mb={4}>
              eKYC Verification ({userType === 'individual' ? 'Individual' : 'Corporate'})
            </Typography>

            <Grid container spacing={4}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  label='User Type'
                  name='userType'
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                >
                  {userTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Individual Fields */}
              {userType === 'individual' && (
                <>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label='Full Name'
                      name='fullName'
                      value={formData.fullName}
                      onChange={handleChange}
                      error={!!errors.fullName}
                      helperText={errors.fullName}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label='Mobile Number'
                      name='mobile'
                      value={formData.mobile}
                      onChange={handleChange}
                      error={!!errors.mobile}
                      helperText={errors.mobile}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label='Email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      select
                      fullWidth
                      label='Document Type'
                      name='documentType'
                      value={formData.documentType}
                      onChange={handleChange}
                      error={!!errors.documentType}
                      helperText={errors.documentType}
                    >
                      {documentTypes.map((doc) => (
                        <MenuItem key={doc.value} value={doc.value}>
                          {doc.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label='Document Number'
                      name='documentNumber'
                      value={formData.documentNumber}
                      onChange={handleChange}
                      error={!!errors.documentNumber}
                      helperText={errors.documentNumber}
                    />
                  </Grid>
                </>
              )}

              {/* Corporate Fields */}
              {userType === 'corporate' && (
                <>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label='Company Name'
                      name='companyName'
                      value={formData.companyName}
                      onChange={handleChange}
                      error={!!errors.companyName}
                      helperText={errors.companyName}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label='Contact Person'
                      name='contactPerson'
                      value={formData.contactPerson}
                      onChange={handleChange}
                      error={!!errors.contactPerson}
                      helperText={errors.contactPerson}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label='GSTIN'
                      name='gstin'
                      value={formData.gstin}
                      onChange={handleChange}
                      error={!!errors.gstin}
                      helperText={errors.gstin}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label='CIN'
                      name='cin'
                      value={formData.cin}
                      onChange={handleChange}
                      error={!!errors.cin}
                      helperText={errors.cin}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label='Email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label='Phone Number'
                      name='mobile'
                      value={formData.mobile}
                      onChange={handleChange}
                      error={!!errors.mobile}
                      helperText={errors.mobile}
                    />
                  </Grid>
                </>
              )}
            </Grid>

            <Stack direction='row' justifyContent='flex-end' mt={6}>
              <Button variant='contained' onClick={handleSubmit}>
                Submit
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default EKYCPage
