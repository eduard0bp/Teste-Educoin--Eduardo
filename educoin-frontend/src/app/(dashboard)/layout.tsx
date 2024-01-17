'use client'

import React, { useState, useEffect, ReactNode } from 'react'
import Sidebar, { SidebarItem } from '@/components/ui/sidebar'
import { Gauge } from 'lucide-react'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [user, setUser] = useState({ name: '', email: '' })

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
    setUser({ name: storedUser.name || '', email: storedUser.email || '' })
  }, [])

  return (
    <>
      <main className="flex h-screen w-screen gap-2 items-center overflow-hidden">
        <Sidebar name={user.name} email={user.email}>
          <SidebarItem icon={<Gauge />} text="Dashboard" active />
        </Sidebar>
        {children}
      </main>
    </>
  )
}
