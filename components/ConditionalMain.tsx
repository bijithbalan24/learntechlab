'use client'

import { usePathname } from 'next/navigation'

export default function ConditionalMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Dashboard routes don't need the top padding since they handle their own layout
  const isDashboardRoute = pathname.startsWith('/dashboard')
  
  if (isDashboardRoute) {
    return <>{children}</>
  }
  
  return <main className="pt-16">{children}</main>
} 