'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated } from '@/lib/admin-auth'

export default function AdminRootPage() {
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/admin/dashboard')
    } else {
      router.replace('/admin/login')
    }
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4F8FA]">
      <div className="size-8 animate-spin rounded-full border-4 border-[#005F6B]/20 border-t-[#005F6B]" />
    </div>
  )
}
