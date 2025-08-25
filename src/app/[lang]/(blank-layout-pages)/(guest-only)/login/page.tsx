// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Login from '@views/Login'
import Home from '@/views/landing'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account'
}

const LoginPage = async () => {
  // Vars
  const mode = await getServerMode()

  return <Home mode={mode} />
}

export default LoginPage
