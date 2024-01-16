import Sidebar, { SidebarItem } from '@/components/ui/sidebar'
import { Gauge } from 'lucide-react'

export default function Layout({ children }: any) {
  return (
    <>
      <main className="flex h-screen w-screen gap-2 items-center overflow-hidden">
        <Sidebar name="Educoin" email="Eduardo@educoin.com">
          <SidebarItem icon={<Gauge />} text="Dashboard" active />
        </Sidebar>
        {children}
      </main>
    </>
  )
}
