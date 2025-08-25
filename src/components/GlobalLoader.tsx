'use client'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

export default function GlobalLoader({ message = 'Loading...' }: { message?: string }) {
  return (
    <Box
      sx={{
        minHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2
      }}
    >
      <CircularProgress size={48} />
      <Typography variant='body2' color='text.secondary'>
        {message}
      </Typography>
    </Box>
  )
}


