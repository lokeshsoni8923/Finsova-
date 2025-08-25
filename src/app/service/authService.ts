let cachedAccessToken: string | null = null
let tokenExpiryTime: number | null = null

export async function getAccessTokenIfNeeded(): Promise<string> {
  const now = Date.now()

  if (cachedAccessToken && tokenExpiryTime && now < tokenExpiryTime) {
    return cachedAccessToken
  }

  const response = await fetch('https://api.finsova.app/api/auth/getAccess', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiKey: 'FINSOVA-BBPS-KEY',
      userName: 'Finsova',
      password: 'Finsova@2025'
    })
  })

  const data = await response.json()

  if (!response.ok || !response.status || !data.token) {
    throw new Error(data.message || 'Unable to retrieve access token')
  }

  // Assume token expires in 1 hour
  cachedAccessToken = data.token
  tokenExpiryTime = now + 60 * 60 * 1000
  localStorage.setItem('accessToken', data.token)

  return cachedAccessToken ?? ''
}
