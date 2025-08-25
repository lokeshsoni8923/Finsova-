'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Locale } from '@configs/i18n'
import type { ChildrenType } from '@core/types'
import AuthRedirect from '@/components/AuthRedirect'
import GlobalLoader from '@/components/GlobalLoader'

export default function AuthGuard({ children, locale }: ChildrenType & { locale: Locale }) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    setIsAuthenticated(!!token)
  }, [])

  if (isAuthenticated === null) return <GlobalLoader message='Checking session…' />

  return <>{isAuthenticated ? children : <AuthRedirect lang={locale} />}</>
}
