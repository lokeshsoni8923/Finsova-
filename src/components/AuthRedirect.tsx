'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type { Locale } from '@configs/i18n'
import { getLocalizedUrl } from '@/utils/i18n'
import themeConfig from '@configs/themeConfig'

// Util to get token from localStorage
const getTokenFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userToken')
  }
  return null
}

const AuthRedirect = ({ lang }: { lang: Locale }) => {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const token = getTokenFromLocalStorage()

    // If user is NOT authenticated
    if (!token) {
      const loginUrl = `/${lang}/login`
      const redirectUrl = `${loginUrl}?redirectTo=${pathname}`

      // Redirect only if NOT already on login page
      if (pathname !== loginUrl) {
        router.replace(redirectUrl)
      }
    }

    // If token exists, do nothing — user is authenticated
  }, [lang, pathname, router])

  return null
}

export default AuthRedirect
