'use client'

import React, { useState } from 'react'
import { Modal, Button, Box, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

interface KycModalWrapperProps {
  children: React.ReactNode
  onServiceClick: () => void
  isKycDone?: boolean
  languagePreference?: string
}

const KycModalWrapper: React.FC<KycModalWrapperProps> = ({ 
  children, 
  onServiceClick,
  isKycDone = false,
  languagePreference = 'en',
}) => {
  const [openModal, setOpenModal] = useState(false)
  const router = useRouter()


  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    
    if (isKycDone) {
      onServiceClick()
    } else {
      setOpenModal(true)
    }
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  const handleKycRedirect = () => {
    setOpenModal(false)
    router.push(`/en/apps/kyc-verification`)
  }



  return (
    <Box onClick={handleClick}>
      {children}
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="kyc-modal"
      >
        <Box 
          onClick={(e) => e.stopPropagation()}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: 400,
            maxWidth: '90vw'
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            eKYC Verification Required
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Please complete your eKYC verification to access platform services.
         
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button 
              variant="outlined" 
              onClick={handleClose}
              sx={{ minWidth: 100 }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleKycRedirect}
              sx={{ minWidth: 150 }}
            >
              Complete eKYC
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default KycModalWrapper