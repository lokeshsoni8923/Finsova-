"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import type { ChildrenType } from '@core/types'
import type { Locale } from '@configs/i18n'

import themeConfig from '@configs/themeConfig'
import { getLocalizedUrl } from '@/utils/i18n'

const GuestOnlyRoute = ({ children, lang }: ChildrenType & { lang: Locale }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Example: Assume you store session token or user info in localStorage under 'session'
    const session = localStorage.getItem('session')

    if (session) {
      setIsLoggedIn(true)
      // Redirect to home page localized URL
      router.push(getLocalizedUrl(themeConfig.homePageUrl, lang))
    } else {
      setIsLoggedIn(false)
    }

    setIsLoading(false)
  }, [lang, router])

  // While checking localStorage, don't render children (or render a loader if you want)
  if (isLoading) return null

  if (!isLoggedIn) return <>{children}</>

  // If logged in, you already triggered redirect, so can return null here
  return null
}

export default GuestOnlyRoute
