'use client'

export interface AdminUser {
  id: string
  name: string
  email: string
  role: 'admin' | 'superadmin'
}

const TOKEN_KEY = 'samch_admin_token'
const USER_KEY = 'samch_admin_user'

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export function getStoredUser(): AdminUser | null {
  if (typeof window === 'undefined') return null
  const user = localStorage.getItem(USER_KEY)
  if (!user) return null
  try {
    return JSON.parse(user) as AdminUser
  } catch {
    return null
  }
}

export function setAdminSession(token: string, user: AdminUser): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  // Also store in cookie for server-friendly detection if needed
  document.cookie = `samch_admin_token=${token}; path=/; max-age=604800; SameSite=Lax`
}

export function clearAdminSession(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
  document.cookie = 'samch_admin_token=; path=/; max-age=0'
}

export function isAuthenticated(): boolean {
  return Boolean(getStoredToken())
}
