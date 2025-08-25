'use client'

import { useState } from 'react'
import { 
  Box, 
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import {
  Upload as UploadIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material'

interface DocumentUploadProps {
  companyType: string
  onComplete: (documents: Record<string, File>) => void
}

const getRequiredDocuments = (companyType: string) => {
  const baseDocuments = ['PAN Card', 'Certificate of Incorporation']
  
  const additionalDocuments: Record<string, string[]> = {
    'Private Ltd.': ['MOA', 'AOA', 'Board Resolution'],
    'Public Ltd.': ['MOA', 'AOA', 'Board Resolution', 'Prospectus'],
    'OPC': ['MOA', 'AOA'],
    // Add more as needed
  }

  return [...baseDocuments, ...(additionalDocuments[companyType] || [])]
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ companyType, onComplete }) => {
  const [documents, setDocuments] = useState<Record<string, File>>({})
  const requiredDocuments = getRequiredDocuments(companyType)

  const handleFileUpload = (documentType: string, file: File) => {
    setDocuments(prev => ({ ...prev, [documentType]: file }))
  }

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    if (Object.keys(documents).length === requiredDocuments.length) {
      onComplete(documents)
    }
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Required Documents for {companyType}
      </Typography>

      <List>
        {requiredDocuments.map((doc) => (
          <ListItem key={doc}>
            <ListItemIcon>
              {documents[doc] ? <CheckCircleIcon color="success" /> : <UploadIcon />}
            </ListItemIcon>
            <ListItemText 
              primary={doc}
              secondary={documents[doc]?.name || 'No file uploaded'}
            />
            <Button
              variant="outlined"
              component="label"
            >
              Upload
              <input
                type="file"
                hidden
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileUpload(doc, file)
                }}
              />
            </Button>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={requiredDocuments.length !== Object.keys(documents).length}
        >
          Submit Documents
        </Button>
      </Box>
    </Box>
  )
}

export default DocumentUpload