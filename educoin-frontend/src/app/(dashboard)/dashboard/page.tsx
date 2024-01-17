'use client'
import { User } from '@/app/interfaces/user'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal/modal'
import { ModalContext } from '@/components/ui/modal/modal.context'
import { UserCard } from '@/components/ui/userCard'
import { Cross } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function DashboardPage() {
  const { setOpen } = useContext(ModalContext)
  const [isEdit, setIsEdit] = useState(false)
  const [userId, setUserId] = useState(0)

  const router = useRouter()
  const storedUser =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || '{}')
      : null

  const HEADERS = ['ID', 'Nome', 'Email', 'Instituição Escolar']

  const {
    data: users,
    mutate,
    isLoading
  } = useSWR('http://localhost:3001/users', fetcher)

  useEffect(() => {
    if (Object.keys(storedUser).length === 0) {
      router.push('/')
    }
  }, [router, storedUser])

  return (
    <div className="w-full h-full flex flex-col items-center p-4 gap-2">
      <div className="flex justify-between items-center w-full">
        <h1 className="font-bold text-2xl">Usuários</h1>
        {storedUser?.type === 'ADMIN' && (
          <Button
            type="button"
            className="bg-[#a05bb2] text-white hover:bg-[#a05bb2]/50 hover:text-white gap-2 max-w-[200px]"
            variant={'default'}
            onClick={() => setOpen(true)}
          >
            Cadastrar usuário
            <Cross />
          </Button>
        )}
      </div>
      <header
        className={`grid ${
          storedUser?.type === 'ADMIN'
            ? 'grid-cols-[1fr_2fr_2fr_2fr_1fr]'
            : 'grid-cols-[1fr_2fr_2fr_1fr]'
        } p-2 gap-2 items-center text-center border-b-2 font-bold w-full`}
      >
        {HEADERS.map(header => (
          <p className="justify-self-start" key={header}>
            {header}
          </p>
        ))}

        {storedUser?.type === 'ADMIN' && <p>Ações</p>}
      </header>
      <div className="flex-1 w-full overflow-auto p-2 flex flex-col gap-2">
        <div className="w-full space-y-4">
          {storedUser?.type === 'ADMIN'
            ? users?.map((user: User) => (
                <UserCard
                  key={user.id}
                  mutate={mutate}
                  storedUser={storedUser}
                  user={user}
                  setIsEdit={setIsEdit}
                  setOpenUserInfoModal={setOpen}
                  setUserId={setUserId}
                />
              ))
            : users
                ?.filter((user: User) => user.type === 'CLIENT')
                .map((user: User) => (
                  <UserCard
                    key={user.id}
                    mutate={mutate}
                    storedUser={storedUser}
                    user={user}
                  />
                ))}
        </div>
      </div>

      <Modal
        user={userId}
        isEdit={isEdit}
        setUserId={setUserId}
        setIsEdit={setIsEdit}
        mutate={mutate}
      />
    </div>
  )
}
