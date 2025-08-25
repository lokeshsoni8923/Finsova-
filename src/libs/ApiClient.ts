import { getAccessTokenIfNeeded } from '../app/service/authService'
import { doubleEncryptAES, doubleDecryptAES } from '@/utils/crypto'

const API_BASE = 'https://api.finsova.app/api';
// const API_BASE = 'http://localhost:5000/api'

export async function encryptedPost<T>(endpoint: string, body?: any): Promise<T> {
  const token = await getAccessTokenIfNeeded()
  if (!body) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const json = await res.json()
    if (json.data) {
      json.data = JSON.parse(doubleDecryptAES(json.data))
    }
    return json
  } else {
    const encryptedBody = doubleEncryptAES(JSON.stringify(body))
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ data: encryptedBody })
    })
    const json = await res.json()
    if (json.data) {
      json.data = JSON.parse(doubleDecryptAES(json.data))
    }
    return json
  }
}
export async function encryptedGet<T>(endpoint: string, body?: any): Promise<T> {
  const token = await getAccessTokenIfNeeded()
  if (!body) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const json = await res.json()
    if (json.data) {
      json.data = JSON.parse(doubleDecryptAES(json.data))
    }
    return json
  } else {
    const encryptedBody = doubleEncryptAES(JSON.stringify(body))
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ data: encryptedBody })
    })
    const json = await res.json()
    if (json.data) {
      json.data = JSON.parse(doubleDecryptAES(json.data))
    }
    return json
  }
}
export async function encryptedPatch<T>(endpoint: string, body?: any): Promise<T> {
  const token = await getAccessTokenIfNeeded()
  if (!body) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const json = await res.json()
    if (json.data) {
      json.data = JSON.parse(doubleDecryptAES(json.data))
    }
    return json
  } else {
    const encryptedBody = doubleEncryptAES(JSON.stringify(body))
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ data: encryptedBody })
    })
    const json = await res.json()
    if (json.data) {
      json.data = JSON.parse(doubleDecryptAES(json.data))
    }
    return json
  }
}
