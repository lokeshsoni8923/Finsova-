'use client'

import { use, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { GetUserBalance } from '@/app/api-helper'
import { doubleDecryptAES } from '@/utils/crypto'
import { User } from '@/types/globalTypes'

type Props = {
  supportEmail?: string
  tollFree?: string 
}

const TopBarUserInfo = ({ supportEmail = 'help@finsova.com', tollFree = '0909 9820 000' }: Props) => {
  const [showAmounts, setShowAmounts] = useState(false)
  const [availableBalance, setAvailableBalance] = useState<string>('XXXXX')
  const [reserveBalance, setReserveBalance] = useState<string>('XXXXX')
      const [user, setUser] = useState<User | null>(null);
    
      useEffect(() => {
        // This runs only in the browser
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

      useEffect(() => {
        if (user?.id) {
          const fetchBalance = async () => {
            const result = await GetUserBalance(user.id);
            if (result) {
              console.log('User Balance:', result);
              setAvailableBalance(result?.data?.balance);
              // setReserveBalance(result.data.reserve);
            }
          };
          fetchBalance();
        }
      }, [user]);


  

      console.log('User Balance:', availableBalance);
      const masked = (value: string) => 'XXXXX'

  return (
    <Box
      sx={{    
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        gap: 3,
        color: 'text.secondary'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
        <EmailIcon fontSize='small' />
        <Typography variant='body2'>
          Email: <Typography component='span' sx={{ fontWeight: 600 }} variant='body2' color='text.primary'>{supportEmail}</Typography>
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
        <PhoneIcon fontSize='small' />
        <Typography variant='body2'>
          Toll Free No: <Typography component='span' sx={{ fontWeight: 600 }} variant='body2' color='text.primary'>{tollFree}</Typography>
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
        <CurrencyRupeeIcon fontSize='small' />
        <Typography variant='body2'>
          Available Balance:
          <Typography component='span' sx={{ fontWeight: 600, ml: 0.5 }} variant='body2' color='text.primary'>
            {showAmounts ? availableBalance : masked(availableBalance)}
          </Typography>
        </Typography>
        <Tooltip title={showAmounts ? 'Hide amounts' : 'Show amounts'}>
          <IconButton size='small' onClick={() => setShowAmounts(prev => !prev)}>
            {showAmounts ? <VisibilityOffIcon fontSize='small' /> : <VisibilityIcon fontSize='small' />}
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
        <CurrencyRupeeIcon fontSize='small' />
        <Typography variant='body2'>
          Reserve Wallet:
          <Typography component='span' sx={{ fontWeight: 600, ml: 0.5 }} variant='body2' color='text.primary'>
            {showAmounts ? reserveBalance : masked(reserveBalance)}
          </Typography>
        </Typography>
      </Box>
    </Box>
  )
}

export default TopBarUserInfo


