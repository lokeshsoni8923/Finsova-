'use client'
import React, { useEffect, useState, useCallback } from 'react'
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Card,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Alert,
  FormControl,
  Paper,
  IconButton,
  Select,
  Divider,
  FormHelperText,
  LinearProgress,
  Chip,
  SelectChangeEvent,
  InputAdornment,
  Collapse,
  Skeleton,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody
} from '@mui/material'
import {
  Upload as UploadIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Business as BusinessIcon,
  Description as DescriptionIcon,
  Error as ErrorIcon,
  CloudUpload as CloudUploadIcon,
  Verified as VerifiedIcon,
  Phone as PhoneIcon,
  Send as SendIcon
} from '@mui/icons-material'
import { uploadFile } from '@/utils/uploadFile'
import { useRouter } from 'next/navigation'
import { encryptedPost } from '@/libs/ApiClient'
import { doubleDecryptAES, doubleEncryptAES } from '@/utils/crypto'
import { User } from '@/types/globalTypes'
import { z } from 'zod'
import { debounce } from 'lodash'

// Zod Schemas
const directorSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces'),
  din: z.string()
    .regex(/^\d{8}$/, 'DIN must be exactly 8 digits')
    .refine(val => !val.startsWith('0'), 'DIN cannot start with 0'),
  contact: z.string()
    .regex(/^[6-9]\d{9}$/, 'Invalid mobile number format'),
  email: z.string()
    .email('Invalid email format')
    .toLowerCase()
})

const formSchema = z.object({
  companyType: z.string().min(1, 'Company type is required'),
  companyName: z.string().min(2, 'Company name must be at least 2 characters').optional(),
  cinOrRegistrationNo: z.string().min(1, 'CIN/Registration number is required'),
  panNo: z.string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format (e.g., ABCDE1234F)'),
  gstNo: z.string().optional(),
  incorporationDate: z.string().min(1, 'Incorporation date is required'),
  registeredAddress: z.string().min(10, 'Address must be at least 10 characters'),
  directorDetails: z.array(directorSchema).min(1, 'At least one director is required'),
  aadhaarNumber: z.string()
    .regex(/^\d{12}$/, 'Aadhaar must be 12 digits')
    .optional(),
  aadhaarOtp: z.string()
    .regex(/^\d{6}$/, 'OTP must be 6 digits')
    .optional()
})

// TypeScript interfaces
interface CompanyType {
  value: string
  label: string
  description: string
  requiredDocs: string[]
  minDirectors: number
  maxMembers: number | null
}

interface DocumentType {
  label: string
  required: boolean
  maxSize: number
}

interface DirectorDetail {
  name: string
  din: string
  contact: string
  email: string
}

interface FormData {
  companyType: string
  companyName: string
  cinOrRegistrationNo: string
  panNo: string
  gstNo: string
  incorporationDate: string
  registeredAddress: string
  directorDetails: DirectorDetail[]
  aadhaarNumber?: string
}

interface UploadedDocument {
  name: string
  size: number
  uploaded: boolean
  path: string
  url: string
  uploadedAt: string
}

interface VerificationStatus {
  pan: boolean
  gst: boolean
  aadhaar: boolean
}

interface VerificationData {
  pan: any
  gst: any
  aadhaar: any
}

interface ApiResponse {
  success: boolean
  data?: any
  message?: string
  error?: string
}

type KycStatus = 'in_progress' | 'processing' | 'completed' | 'failed'

// Company types with detailed information
const companyTypes: CompanyType[] = [
  {
    value: 'Private Ltd.',
    label: 'Private Limited Company',
    description: 'For private businesses with limited members',
    requiredDocs: ['COI', 'MOA', 'AOA', 'PAN', 'GST'],
    minDirectors: 2,
    maxMembers: 200
  },
  {
    value: 'Public Ltd.',
    label: 'Public Limited Company',
    description: 'Can raise funds from the public',
    requiredDocs: ['COI', 'MOA', 'AOA', 'PAN', 'GST', 'SEBI_REG'],
    minDirectors: 3,
    maxMembers: null
  },
  {
    value: 'OPC',
    label: 'One Person Company',
    description: 'One owner with limited liability',
    requiredDocs: ['COI', 'MOA', 'AOA', 'PAN'],
    minDirectors: 1,
    maxMembers: 1
  },
  {
    value: 'Section 8',
    label: 'Section 8 Company',
    description: 'Non-profit goals',
    requiredDocs: ['COI', 'MOA', 'AOA', 'PAN', 'LICENSE_SEC8'],
    minDirectors: 2,
    maxMembers: null
  },
  {
    value: 'LLP',
    label: 'Limited Liability Partnership',
    description: 'Partnership with limited liability',
    requiredDocs: ['COI', 'LLP_AGREEMENT', 'PAN', 'GST'],
    minDirectors: 2,
    maxMembers: null
  }
]

// Document types
const documentTypes: Record<string, DocumentType> = {
  COI: { label: 'Certificate of Incorporation', required: true, maxSize: 10 },
  MOA: { label: 'Memorandum of Association', required: false, maxSize: 10 },
  AOA: { label: 'Articles of Association', required: true, maxSize: 10 },
  PAN: { label: 'PAN Card', required: true, maxSize: 10 },
  GST: { label: 'GST Certificate', required: false, maxSize: 10},
  LLP_AGREEMENT: { label: 'LLP Agreement', required: true, maxSize: 10 },
  SEBI_REG: { label: 'SEBI Registration', required: false, maxSize: 10 },
  LICENSE_SEC8: { label: 'Section 8 License', required: true, maxSize: 10 }
}

const KycVerificationPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitError, setSubmitError] = useState<string>('')
  const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(null)
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, UploadedDocument>>({})
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [kycStatus, setKycStatus] = useState<KycStatus>('in_progress')
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [user, setUser] = useState<User | null>(null)
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>({
    pan: false,
    gst: false,
    aadhaar: false
  })
  const [verificationData, setVerificationData] = useState<VerificationData>({
    pan: null,
    gst: null,
    aadhaar: null
  })
  const [isVerifying, setIsVerifying] = useState<Record<string, boolean>>({})

  const router = useRouter()

  // Form state
  const [formData, setFormData] = useState<FormData>({
    companyType: '',
    companyName: '',
    cinOrRegistrationNo: '',
    panNo: '',
    gstNo: '',
    incorporationDate: '',
    registeredAddress: '',
    directorDetails: [{ name: '', din: '', contact: '', email: '' }],
    aadhaarNumber: ''
  })

  // API Functions
  const verifyPAN = async (panNumber: string): Promise<ApiResponse> => {
    try {
      const response:any = await encryptedPost('/sprintVerify/pan/verify', { pan_no:panNumber })
      return response
    } catch (error) {
      console.error('PAN verification error:', error)
      return { success: false, error: 'PAN verification failed' }
    }
  }

  const verifyGST = async (gstNumber: string): Promise<ApiResponse> => {
    try {
      const response:any     = await encryptedPost('/sprintVerify/gst/verify', { gstNUmber:gstNumber })
      return response
    } catch (error) {
      console.error('GST verification error:', error)
      return { success: false, error: 'GST verification failed' }
    }
  }

  // Debounced validation functions
  const debouncedPANVerification = useCallback(
    debounce(async (panNumber: string) => {
      if (!panNumber || panNumber.length !== 10) return

      setIsVerifying(prev => ({ ...prev, pan: true }))
      const result = await verifyPAN(panNumber)
      
      if (result.success && result.data) {
        setVerificationStatus(prev => ({ ...prev, pan: true }))
        setVerificationData(prev => ({ ...prev, pan: result.data }))
        // Auto-fill company name if available
        if (result.data.companyName && !formData.companyName) {
          setFormData(prev => ({ ...prev, companyName: result.data.companyName }))
        }
      } else {
        setVerificationStatus(prev => ({ ...prev, pan: false }))
        setFormErrors(prev => ({ ...prev, panNo: result.error || 'PAN verification failed' }))
      }
      setIsVerifying(prev => ({ ...prev, pan: false }))
    }, 1000),
    [formData.companyName]
  )

  const debouncedGSTVerification = useCallback(
    debounce(async (gstNumber: string) => {
      if (!gstNumber || gstNumber.length !== 15) return

      setIsVerifying(prev => ({ ...prev, gst: true }))
      const result = await verifyGST(gstNumber)
      
      if (result.success && result.data) {
        setVerificationStatus(prev => ({ ...prev, gst: true }))
        setVerificationData(prev => ({ ...prev, gst: result.data }))
        
        // Auto-fill company details from GST data
        setFormData(prev => ({ 
          ...prev, 
          // Set company name from business_name or legal_name
          companyName: result.data.data.business_name || result.data.data.legal_name || prev.companyName,
          // Set registered address from GST data
          registeredAddress: result.data.data.address || prev.registeredAddress
        }))
      } else {
        setVerificationStatus(prev => ({ ...prev, gst: false }))
        setFormErrors(prev => ({ ...prev, gstNo: result.error || 'GST verification failed' }))
      }
      setIsVerifying(prev => ({ ...prev, gst: false }))
    }, 1000),
    [formData.companyName, formData.registeredAddress]
  )

  // New Aadhaar verification function
  const debouncedAadhaarVerification = useCallback(
    debounce(async (aadhaarNumber: string) => {
      if (!aadhaarNumber || aadhaarNumber.length !== 12) return

      setIsVerifying(prev => ({ ...prev, aadhaar: true }))
      try {
        const result:any = await encryptedPost('/sprintVerify/aadhaar/send-otp ', {
          id_number: aadhaarNumber,
          refid: "REF123456789"
        })

        if (result.success && result.data) {
          setVerificationStatus(prev => ({ ...prev, aadhaar: true }))
          setVerificationData(prev => ({ ...prev, aadhaar: result.data }))
          setFormErrors(prev => {
            const newErrors = { ...prev }
            delete newErrors.aadhaarNumber
            return newErrors
          })
        } else {
          setVerificationStatus(prev => ({ ...prev, aadhaar: false }))
          setFormErrors(prev => ({ 
            ...prev, 
            aadhaarNumber: result.error || 'Aadhaar verification failed' 
          }))
        }
      } catch (error) {
        setVerificationStatus(prev => ({ ...prev, aadhaar: false }))
        setFormErrors(prev => ({ 
          ...prev, 
          aadhaarNumber: 'Verification failed. Please try again.' 
        }))
      }
      setIsVerifying(prev => ({ ...prev, aadhaar: false }))
    }, 1000),
    []
  )

  // Validation function using Zod
  const validateForm = (): boolean => {
    try {
      // Dynamic GST and CIN validation using superRefine
      const gstRequiredTypes = ['Private Ltd.', 'Public Ltd.', 'LLP']
      const cinValidationMap: Record<string, RegExp> = {
        'LLP': /^[A-Z]{3}-[0-9]{4}$/,
        'OPC': /^[UL][0-9]{5}[A-Z]{2}[0-9]{4}[O][P][C][0-9]{6}$/,
        'Private Ltd.': /^[UL][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/,
        'Public Ltd.': /^[UL][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/,
        'Section 8': /^[UL][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/
      }
      const minDirectors = selectedCompany?.minDirectors || 1

      const schema = formSchema.superRefine((data, ctx) => {
        // GST validation
        if (gstRequiredTypes.includes(data.companyType)) {
          if (!data.gstNo || data.gstNo.length !== 15) {
            ctx.addIssue({
              path: ['gstNo'],
              code: z.ZodIssueCode.custom,
              message: 'GST number is required for this company type'
            })
          } else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(data.gstNo)) {
            ctx.addIssue({
              path: ['gstNo'],
              code: z.ZodIssueCode.custom,
              message: 'Invalid GST format'
            })
          }
        } else if (data.gstNo) {
          if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(data.gstNo)) {
            ctx.addIssue({
              path: ['gstNo'],
              code: z.ZodIssueCode.custom,
              message: 'Invalid GST format'
            })
          }
        }

        // CIN validation
        const cinRegex = cinValidationMap[data.companyType]
        if (cinRegex) {
          if (!data.cinOrRegistrationNo || !cinRegex.test(data.cinOrRegistrationNo)) {
            ctx.addIssue({
              path: ['cinOrRegistrationNo'],
              code: z.ZodIssueCode.custom,
              message: 'Invalid CIN/Registration format for selected company type'
            })
          }
        }

        // Date validation
        if (!data.incorporationDate) {
          ctx.addIssue({
            path: ['incorporationDate'],
            code: z.ZodIssueCode.custom,
            message: 'Incorporation date is required'
          })
        } else if (new Date(data.incorporationDate) > new Date()) {
          ctx.addIssue({
            path: ['incorporationDate'],
            code: z.ZodIssueCode.custom,
            message: 'Incorporation date cannot be in the future'
          })
        }

        // Director count validation
        if (!data.directorDetails || data.directorDetails.length < minDirectors) {
          ctx.addIssue({
            path: ['directorDetails'],
            code: z.ZodIssueCode.custom,
            message: `At least ${minDirectors} director(s) required`
          })
        }
      })

      const validatedData = schema.parse(formData)
      setFormErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.issues.forEach(err => {
          const path = err.path.join('.')
          newErrors[path] = err.message
        })
        setFormErrors(newErrors)
      }
      return false
    }
  }

  // Handle input changes with real-time validation
  const handleInputChange = useCallback((field: keyof FormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }

    // Trigger verification for specific fields
    if (field === 'panNo' && value.length === 10) {
      debouncedPANVerification(value.toUpperCase())
    } else if (field === 'gstNo' && value.length === 15) {
      debouncedGSTVerification(value.toUpperCase())
    } else if (field === 'aadhaarNumber' && value.length === 12) {
      debouncedAadhaarVerification(value)
    }
  }, [formErrors, debouncedPANVerification, debouncedGSTVerification, debouncedAadhaarVerification])

  const handleCompanyTypeChange = (event: SelectChangeEvent<string>): void => {
    const companyTypeValue = event.target.value
    const company = companyTypes.find(c => c.value === companyTypeValue)
    setSelectedCompany(company || null)
    setFormData(prev => ({ 
      ...prev, 
      companyType: companyTypeValue,
      gstNo: '',
      cinOrRegistrationNo: ''
    }))

    // Reset verification status
    setVerificationStatus({ pan: false, gst: false, aadhaar: false })
    setVerificationData({ pan: null, gst: null, aadhaar: null })

    // Adjust directors based on company requirements
    if (company) {
      const minDirectors = company.minDirectors
      const currentDirectors = formData.directorDetails

      if (currentDirectors.length < minDirectors) {
        const newDirectors = [...currentDirectors]
        while (newDirectors.length < minDirectors) {
          newDirectors.push({ name: '', din: '', contact: '', email: '' })
        }
        setFormData(prev => ({ ...prev, directorDetails: newDirectors }))
      }
    }
  }

  const handleDirectorChange = (index: number, field: keyof DirectorDetail, value: string): void => {
    const newDirectors = [...formData.directorDetails]
    newDirectors[index] = { ...newDirectors[index], [field]: value }
    setFormData(prev => ({ ...prev, directorDetails: newDirectors }))

    // Clear director error when user starts typing
    const errorKey = `directorDetails.${index}.${field}`
    if (formErrors[errorKey]) {
      setFormErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[errorKey]
        return newErrors
      })
    }
  }

  const handleAddDirector = (): void => {
    const newDirectors = [...formData.directorDetails, { name: '', din: '', contact: '', email: '' }]
    setFormData(prev => ({ ...prev, directorDetails: newDirectors }))
  }

  const handleRemoveDirector = (index: number): void => {
    const newDirectors = formData.directorDetails.filter((_, i) => i !== index)
    setFormData(prev => ({ ...prev, directorDetails: newDirectors }))
  }

  // Handle file upload with progress tracking
  const handleFileUpload = async (docType: string, file: File): Promise<void> => {
    const docTypeConfig = documentTypes[docType]
    if (!docTypeConfig) return

    const maxSize = docTypeConfig.maxSize
    
    // File size validation
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size should not exceed ${maxSize}MB`)
      return
    }

    // File type validation
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
    if (!allowedTypes.includes(file.type)) {
      alert('Only PDF, JPG, JPEG, and PNG files are allowed')
      return
    }

    try {
      // Set upload progress
      setUploadProgress(prev => ({ ...prev, [docType]: 0 }))

      // Simulate progress updates for UX while using fetch upload
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => ({
          ...prev,
          [docType]: Math.min((prev[docType] || 0) + Math.random() * 30, 95)
        }))
      }, 200)

      const res = await uploadFile(file)

      clearInterval(progressInterval)
      if (!res.success || !res.filePath) {
        throw new Error(res.error || 'Upload failed')
      }

      setUploadProgress(prev => ({ ...prev, [docType]: 100 }))
      const filePath = res.filePath as string
      setUploadedDocs(prev => ({
        ...prev,
        [docType]: {
          name: file.name,
          size: file.size,
          uploaded: true,
          path: filePath,
          url: filePath, // served from public/uploads
          uploadedAt: new Date().toISOString()
        }
      }))

      // Clear progress after success
      setTimeout(() => {
        setUploadProgress(prev => {
          const newProgress = { ...prev }
          delete newProgress[docType]
          return newProgress
        })
      }, 800)
    } catch (error) {
      console.error('Upload error:', error)
      setUploadProgress(prev => {
        const newProgress = { ...prev }
        delete newProgress[docType]
        return newProgress
      })
      alert(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleNextStep = (): void => {
    if (validateForm()) {
      setActiveStep(1)
      setSubmitError('')
    } else {
      setSubmitError('Please fix the validation errors above')
    }
  }

  const handleBack = (): void => {
    setActiveStep(prev => prev - 1)
    setSubmitError('')
  }

  const getRequiredDocuments = (): string[] => {
    return selectedCompany?.requiredDocs || []
  }

  const allRequiredDocsUploaded = (): boolean => {
    if (!selectedCompany) return false
    const requiredDocs = getRequiredDocuments().filter(
      doc => documentTypes[doc]?.required
    )
    return requiredDocs.every(doc => uploadedDocs[doc]?.uploaded)
  }

  const handleDocumentSubmit = async (): Promise<void> => {
    try {
      setIsSubmitting(true)
      setKycStatus('processing')

      const submissionData = {
        ...formData,
        id: user?.id,
        verificationData,
        images: Object.entries(uploadedDocs).map(([type, doc]) => ({
          type,
          name: doc.name,
          size: doc.size,
          path: doc.path,
          uploadedAt: doc.uploadedAt
        }))
      }

      const resp = await encryptedPost<any>('/users/kyc/update', submissionData)
      if (resp?.success) {
        setKycStatus('completed')
        // Update localStorage userData to reflect KYC completion
        try {
          if (resp.user) {
            localStorage.setItem('userData', doubleEncryptAES(JSON.stringify(resp.user)))
            setUser(resp.user)
          } else {
            const existing = localStorage.getItem('userData')
            if (existing) {
              const parsed = JSON.parse(doubleDecryptAES(existing))
              const updated = { ...parsed, isKycCompleted: true }
              localStorage.setItem('userData', doubleEncryptAES(JSON.stringify(updated)))
              setUser(updated)
            }
          }
        } catch (e) {
          console.error('Failed to update local userData after KYC:', e)
        }
      } else {
        throw new Error(resp?.error || resp?.message || 'Verification failed')
      }
    } catch (error) {
      console.error('KYC submission error:', error)
      setKycStatus('failed')
    } finally {
      setIsSubmitting(false)
      setActiveStep(2)
    }
  }

  const fillDemoData = (): void => {
    setSelectedCompany(companyTypes[0])
    setFormData({
      companyType: 'Private Ltd.',
      companyName: 'Demo Tech Solutions Pvt Ltd',
      cinOrRegistrationNo: 'U72900DL2020PTC123456',
      panNo: 'ABCDE1234F',
      gstNo: '07ABCDE1234F1Z5',
      incorporationDate: '2020-01-15',
      registeredAddress: '123, Tech Park, Sector 62, Noida, Uttar Pradesh - 201301',
      directorDetails: [
        { name: 'John Doe', din: '12345678', contact: '9876543210', email: 'john@demo.com' },
        { name: 'Jane Smith', din: '87654321', contact: '9876543211', email: 'jane@demo.com' }
      ],
      aadhaarNumber: '123456789012'
    })
    setFormErrors({})
  }

  // Render verification data cards
  const renderVerificationCard = (type: 'pan' | 'gst' | 'aadhaar', title: string): JSX.Element | null => {
    const data = verificationData[type]
    if (!data) return null

    // Format GST data to show only important fields
    const formatGSTData = (gstData: any) => {
      return {
        "Business Name": gstData?.data?.legal_name || gstData?.data?.trade_name,
        "GSTIN Status": gstData?.data?.status,
        "Registration Date": gstData?.data?.registration_date,
        "Business Type": gstData?.data?.business_type,
        "State": gstData?.data?.principal_place_address?.state,
        "Address": gstData?.data?.principal_place_address?.address,
        "Last Updated": gstData?.data?.last_updated
      }
    }

    // Format different verification data based on type
    const getFormattedData = () => {
      switch (type) {
        case 'gst':
          return formatGSTData(data)
        case 'pan':
          return data // Keep PAN data as is
        case 'aadhaar':
          return data // Keep Aadhaar data as is
        default:
          return {}
      }
    }

    const formattedData = getFormattedData()

    return (
      <Collapse in={verificationStatus[type]}>
        <Card sx={{ mt: 2, p: 2, bgcolor: 'success.50', borderLeft: 3, borderColor: 'success.main' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <VerifiedIcon color="success" fontSize="small" />
            <Typography variant="subtitle2" color="success.main">
              {title} Verified Successfully
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {Object.entries(formattedData).map(([key, value]) =>
              value ? (
                <Grid item xs={12} sm={6} key={key}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {key}
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {String(value)}
                  </Typography>
                </Grid>
              ) : null
            )}
          </Grid>
        </Card>
      </Collapse>
    )
  }

  const renderCompanyTypeSelector = (): JSX.Element => (
    <Grid item xs={12}>
      <Typography variant='h6' gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <BusinessIcon color='primary' />
        Select Company Type
      </Typography>
      <FormControl fullWidth error={!!formErrors.companyType}>
        <Select
          value={selectedCompany?.value || ''}
          onChange={handleCompanyTypeChange}
          displayEmpty
          renderValue={(value) => {
            if (!value) return <Typography color='text.secondary'>Select a company type</Typography>
            const company = companyTypes.find(c => c.value === value)
            return company?.label
          }}
        >
          <MenuItem value='' disabled>
            <em>Select a company type</em>
          </MenuItem>
          {companyTypes.map(company => (
            <MenuItem key={company.value} value={company.value}>
              <Box>
                <Typography variant='subtitle1'>{company.label}</Typography>
                <Typography variant='caption' color='text.secondary'>
                  {company.description}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
        {formErrors.companyType && (
          <FormHelperText>{formErrors.companyType}</FormHelperText>
        )}
        {selectedCompany && !formErrors.companyType && (
          <FormHelperText>
            Selected: {selectedCompany.label} - Requires minimum {selectedCompany.minDirectors} director(s)
          </FormHelperText>
        )}
      </FormControl>
    </Grid>
  )

  const renderCompanyDetails = (): JSX.Element => (
    <>
      {/* PAN Number Field with Verification */}
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label='PAN Number'
          value={formData.panNo}
          onChange={(e) => handleInputChange('panNo', e.target.value.toUpperCase())}
          error={!!formErrors.panNo}
          helperText={formErrors.panNo}
          placeholder='ABCDE1234F'
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {isVerifying.pan ? (
                  <CircularProgress size={20} />
                ) : verificationStatus.pan ? (
                  <CheckCircleIcon color="success" />
                ) : null}
              </InputAdornment>
            )
          }}
        />
      </Grid>

      {/* GST Number Field with Verification */}
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label={
            ['Private Ltd.', 'Public Ltd.', 'LLP'].includes(selectedCompany?.value || '')
              ? 'GST Number (Required)'
              : 'GST Number (Optional)'
          }
          value={formData.gstNo}
          onChange={(e) => handleInputChange('gstNo', e.target.value.toUpperCase())}
          error={!!formErrors.gstNo}
          helperText={formErrors.gstNo}
          placeholder='22AAAAA0000A1Z5'
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {isVerifying.gst ? (
                  <CircularProgress size={20} />
                ) : verificationStatus.gst ? (
                  <CheckCircleIcon color="success" />
                ) : null}
              </InputAdornment>
            )
          }}
        />
      </Grid>

      {/* Auto-filled Company Name (if verified data available) */}
      {!verificationData.pan?.data?.companyName && 
 !verificationData.gst?.data?.business_name && 
 !verificationData.gst?.data?.legal_name && (
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label='Company Name'
      value={formData.companyName}
      onChange={(e) => handleInputChange('companyName', e.target.value)}
      error={!!formErrors.companyName}
      helperText={formErrors.companyName}
      placeholder='Enter your company name'
    />
  </Grid>
)}

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label={selectedCompany?.value === 'LLP' ? 'LLP Registration Number' : 'CIN/Registration Number'}
          value={formData.cinOrRegistrationNo}
          onChange={(e) => handleInputChange('cinOrRegistrationNo', e.target.value.toUpperCase())}
          error={!!formErrors.cinOrRegistrationNo}
          helperText={formErrors.cinOrRegistrationNo}
          placeholder={selectedCompany?.value === 'LLP' ? 'AAB-1234' : 'U72900DL2020PTC123456'}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          type='date'
          label='Incorporation Date'
          value={formData.incorporationDate}
          onChange={(e) => handleInputChange('incorporationDate', e.target.value)}
          error={!!formErrors.incorporationDate}
          helperText={formErrors.incorporationDate}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      {/* Registered Address Field */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={3}
          label='Registered Address'
          value={formData.registeredAddress}
          onChange={(e) => handleInputChange('registeredAddress', e.target.value)}
          error={!!formErrors.registeredAddress}
          helperText={formErrors.registeredAddress}
          placeholder='Enter complete registered address'
          disabled={!!verificationData.gst?.data?.address} // Disable if we have GST address
          InputProps={{
            endAdornment: verificationData.gst?.data?.address && (
              <InputAdornment position="end">
                <CheckCircleIcon color="success" />
              </InputAdornment>
            )
          }}
        />
      </Grid>

      {/* Aadhaar Verification Section */}
      <Grid item xs={12}>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Aadhaar Verification (Optional)
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label='Aadhaar Number'
          value={formData.aadhaarNumber}
          onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
          error={!!formErrors.aadhaarNumber}
          helperText={formErrors.aadhaarNumber}
          placeholder='Enter 12-digit Aadhaar number'
          inputProps={{ maxLength: 12 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {isVerifying.aadhaar ? (
                  <CircularProgress size={20} />
                ) : verificationStatus.aadhaar ? (
                  <CheckCircleIcon color="success" />
                ) : null}
              </InputAdornment>
            )
          }}
        />
      </Grid>
    </>
  )

  const renderDirectorDetails = (): JSX.Element => (
    <Grid item xs={12}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='h6'>Director Details (Minimum: {selectedCompany?.minDirectors || 1})</Typography>
        <Button
          variant='outlined'
          onClick={handleAddDirector}
          disabled={
            selectedCompany?.maxMembers !== null &&
            selectedCompany?.maxMembers !== undefined &&
            formData.directorDetails.length >= selectedCompany.maxMembers
          }
        >
          Add Director
        </Button>
      </Box>

      {formErrors['directorDetails'] && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {formErrors['directorDetails']}
        </Alert>
      )}

      {formData.directorDetails.map((director, index) => (
        <Card key={index} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant='subtitle1'>Director {index + 1}</Typography>
            {formData.directorDetails.length > (selectedCompany?.minDirectors || 1) && (
              <IconButton onClick={() => handleRemoveDirector(index)} color='error'>
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label='Full Name'
                value={director.name}
                onChange={(e) => handleDirectorChange(index, 'name', e.target.value)}
                error={!!formErrors[`directorDetails.${index}.name`]}
                helperText={formErrors[`directorDetails.${index}.name`]}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label='DIN (8 digits)'
                value={director.din}
                onChange={(e) => handleDirectorChange(index, 'din', e.target.value)}
                error={!!formErrors[`directorDetails.${index}.din`]}
                helperText={formErrors[`directorDetails.${index}.din`]}
                inputProps={{ maxLength: 8 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label='Contact Number'
                value={director.contact}
                onChange={(e) => handleDirectorChange(index, 'contact', e.target.value)}
                error={!!formErrors[`directorDetails.${index}.contact`]}
                helperText={formErrors[`directorDetails.${index}.contact`]}
                inputProps={{ maxLength: 10 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type='email'
                label='Email Address'
                value={director.email}
                onChange={(e) => handleDirectorChange(index, 'email', e.target.value)}
                error={!!formErrors[`directorDetails.${index}.email`]}
                helperText={formErrors[`directorDetails.${index}.email`]}
              />
            </Grid>
          </Grid>
        </Card>
      ))}
    </Grid>
  )

  const renderDocumentUpload = (): JSX.Element => (
    <Box>
      <Typography variant='h6' gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <DescriptionIcon color='primary' />
        Required Documents for {selectedCompany?.label}
      </Typography>

      <Grid container spacing={2}>
        {getRequiredDocuments().map(docType => (
          <Grid item xs={12} md={4} key={docType}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant='subtitle2'>
                  {documentTypes[docType]?.label}
                  {documentTypes[docType]?.required && <span style={{ color: 'red' }}> *</span>}
                </Typography>
                {uploadedDocs[docType]?.uploaded && <CheckCircleIcon color='success' />}
              </Box>

              <Typography variant='caption' display='block' color='text.secondary' sx={{ mb: 2 }}>
                Max size: {documentTypes[docType]?.maxSize}MB | Format: PDF, JPG, PNG
              </Typography>

              {/* Upload Progress */}
              {uploadProgress[docType] !== undefined && (
                <Box sx={{ mb: 2 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={uploadProgress[docType]} 
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Uploading... {Math.round(uploadProgress[docType])}%
                  </Typography>
                </Box>
              )}

              {/* File Input */}
              <input
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ display: 'none' }}
                id={`upload-${docType}`}
                type='file'
                disabled={uploadProgress[docType] !== undefined}
                onChange={(e) => {
                  const files = e.target.files
                  if (files && files[0]) {
                    handleFileUpload(docType, files[0])
                  }
                  e.target.value = '' // Reset input
                }}
              />  
              <label htmlFor={`upload-${docType}`}>
                <Button
                  variant={uploadedDocs[docType]?.uploaded ? 'outlined' : 'contained'}
                  component='span'
                  startIcon={uploadProgress[docType] !== undefined ? <CircularProgress size={16} /> : <CloudUploadIcon />}
                  fullWidth
                  disabled={uploadProgress[docType] !== undefined}
                >
                  {uploadProgress[docType] !== undefined 
                    ? 'Uploading...' 
                    : uploadedDocs[docType]?.uploaded 
                      ? 'Re-upload' 
                      : 'Upload'
                  }
                </Button>
              </label>

              {/* Uploaded File Info */}
              {uploadedDocs[docType]?.uploaded && (
                <Box sx={{ mt: 2, p: 1, borderRadius: 1 }}>
                  <Typography  variant='caption' display='block'  color="text.secondary" >
                    ✓ {uploadedDocs[docType].name}
                  </Typography>
                  <Typography sx={{ mt: 2}} variant='caption' display='block' color='text.secondary'>
                    {(uploadedDocs[docType].size / 1024 / 1024).toFixed(2)} MB
                  </Typography>
                  {uploadedDocs[docType].url && (
                    <Button 
                      size="small" 
                      onClick={() => window.open(uploadedDocs[docType].url)}
                      sx={{ mt: 1 }}
                    >
                      Preview
                    </Button>
                  )}
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Upload Summary */}
      <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant='subtitle2' gutterBottom>
          Upload Summary
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {getRequiredDocuments().map(docType => (
            <Chip
              key={docType}
              label={documentTypes[docType]?.label}
              color={uploadedDocs[docType]?.uploaded ? 'success' : 'default'}
              variant={uploadedDocs[docType]?.uploaded ? 'filled' : 'outlined'}
              size="small"
              icon={uploadedDocs[docType]?.uploaded ? <CheckCircleIcon /> : undefined}
            />
          ))}
        </Box>
        <Typography variant='caption' color='text.secondary' sx={{ mt: 1, display: 'block' }}>
          {Object.keys(uploadedDocs).length} of {getRequiredDocuments().length} documents uploaded
        </Typography>
      </Box>
    </Box>
  )

  const renderStepContent = (): JSX.Element => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={3}>
            {renderCompanyTypeSelector()}

            {selectedCompany && (
              <>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Alert severity='info'>
                    Selected: {selectedCompany.label} - {selectedCompany.description}
                  </Alert>
                </Grid>
                {renderCompanyDetails()}
                {renderDirectorDetails()}
              </>
            )}

            {submitError && (
              <Grid item xs={12}>
                <Alert severity='error'>{submitError}</Alert>
              </Grid>
            )}
          </Grid>
        )

      case 1:
        return renderDocumentUpload()

      case 2:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            {kycStatus === 'processing' && (
              <>
                <CircularProgress size={64} sx={{ mb: 2 }} />
                <Typography variant='h6' gutterBottom color='primary'>
                  KYC Verification In Progress
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Processing documents with verification service...
                </Typography>
              </>
            )}

            {kycStatus === 'completed' && (
              <>
                <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
                <Typography variant='h6' gutterBottom color='success.main'>
                  KYC Verification Completed Successfully!
                </Typography>
                <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                  Your company verification has been approved. You now have access to all platform services.
                </Typography>
                <Button
                  variant='contained'
                  onClick={() => router.push('/')}
                >
                  Continue to services
                </Button>
              </>
            )}

            {kycStatus === 'failed' && (
              <>
                <ErrorIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
                <Typography variant='h6' gutterBottom color='error'>
                  KYC Verification Failed
                </Typography>
                <Alert severity='error' sx={{ mb: 2, textAlign: 'left' }}>
                  Verification failed. This could be due to:
                  <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                    <li>Invalid or unclear document images</li>
                    <li>Document information mismatch</li>
                    <li>Network connectivity issues</li>
                  </ul>
                  Please check your documents and try again.
                </Alert>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button
                    variant='outlined'
                    onClick={() => {
                      setActiveStep(1)
                      setKycStatus('in_progress')
                    }}
                  >
                    Retry Verification
                  </Button>
                  <Button
                    variant='text'
                    onClick={() => {
                      setActiveStep(0)
                      setKycStatus('in_progress')
                    }}
                  >
                    Edit Information
                  </Button>
                </Box>
              </>
            )}
          </Box>
        )

      default:
        return <div>Unknown step</div>
    }
  }

  useEffect(() => {
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

  return (
    <Box sx={{ p: 4, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant='h4' gutterBottom>
        KYC Verification Process
      </Typography>

      <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
        Complete your company verification to access all platform services
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        <Step>
          <StepLabel>Company Information</StepLabel>
        </Step>
        <Step>
          <StepLabel>Document Upload</StepLabel>
        </Step>
        <Step>
          <StepLabel>Verification</StepLabel>
        </Step>
      </Stepper>

      <Card sx={{ p: 4 }}>
        {renderStepContent()}

        {activeStep !== 2 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 4,
              gap: 2
            }}
          >
            <Box>
              {activeStep > 0 && (
                <Button variant='outlined' onClick={handleBack} disabled={isSubmitting}>
                  Back
                </Button>
              )}
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              {activeStep === 0 && (
                <>
                  <Button
                    variant='outlined'
                    onClick={fillDemoData}
                    disabled={isSubmitting}
                  >
                    Fill Demo Data
                  </Button>
                  <Button 
                    variant='contained' 
                    onClick={handleNextStep}
                    disabled={isSubmitting || !selectedCompany}
                  >
                    {isSubmitting ? <CircularProgress size={24} /> : 'Next: Upload Documents'}
                  </Button>
                </>
              )}

              {activeStep === 1 && (
                <Button
                  variant='contained'
                  onClick={handleDocumentSubmit}
                  disabled={isSubmitting || !allRequiredDocsUploaded()}
                  startIcon={isSubmitting ? <CircularProgress size={16} /> : undefined}
                >
                  {isSubmitting ? 'Submitting for Verification...' : 'Submit for Verification'}
                </Button>
              )}
            </Box>
          </Box>
        )}
      </Card>
    </Box>
  )
}

export default KycVerificationPage