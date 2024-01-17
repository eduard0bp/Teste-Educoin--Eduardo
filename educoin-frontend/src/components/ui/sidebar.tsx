'use client'
import {
  MoreVertical,
  ChevronLast,
  ChevronFirst,
  User,
  LogOut
} from 'lucide-react'
import { useContext, createContext, useState, ReactNode } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const SidebarContext = createContext({ expanded: true })

interface SidebarProps {
  name: string
  email: string
  children: ReactNode
}

export default function Sidebar({ children, name, email }: SidebarProps) {
  const router = useRouter()
  const [expanded, setExpanded] = useState(true)

  const handleLogout = async () => {
    localStorage.removeItem('user')

    await router.push('/')
    toast.success('Logout realizado com sucesso!')
  }

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Image
            src="/logo-educoin.svg"
            alt="Logo"
            width={150}
            height={150}
            className={`overflow-hidden transition-all ${
              expanded ? 'w-32' : 'w-0'
            }`}
          />
          <button
            onClick={() => setExpanded(curr => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <User className="w-10 h-10 rounded-sm" />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{name}</h4>
              <span className="text-xs text-gray-600">{email}</span>
            </div>
            <LogOut
              size={20}
              className="cursor-pointer"
              onClick={() => handleLogout()}
            />
          </div>
        </div>
      </nav>
    </aside>
  )
}

interface SidebarItemProps {
  icon: ReactNode
  text: string
  active: boolean
  alert?: boolean
}

export function SidebarItem({ icon, text, active, alert }: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext)

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? 'bg-gradient-to-tr from-purple-200 to-purple-100 text-[#a05bb2]'
            : 'hover:bg-indigo-50 text-gray-600'
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? 'w-52 ml-3' : 'w-0'
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-[#a05bb2] ${
            expanded ? '' : 'top-2'
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-[#a05bb2] text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}
