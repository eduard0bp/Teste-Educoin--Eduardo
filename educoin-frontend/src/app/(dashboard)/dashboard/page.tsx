import { Button } from '@/components/ui/button'
import { Cross, Edit, Trash } from 'lucide-react'

interface User {
  id: number
  name: string
  email: string
  userType: string
}

export default function DashboardPage() {
  const usersMock: User[] = [
    {
      id: 1,
      name: 'Alice Smith',
      email: 'alice.smith@example.com',
      userType: 'Admin'
    },
    {
      id: 2,
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      userType: 'Editor'
    },
    {
      id: 3,
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      userType: 'Subscriber'
    },
    {
      id: 4,
      name: 'Diana Prince',
      email: 'diana.prince@example.com',
      userType: 'Moderator'
    },
    {
      id: 5,
      name: 'Edward King',
      email: 'edward.king@example.com',
      userType: 'Member'
    }
  ]

  return (
    <div className="w-full h-full flex flex-col items-center p-4 gap-2">
      <div className="flex justify-between items-center w-full">
        <h1 className="font-bold text-2xl">Usuários</h1>

        <Button
          type="submit"
          className="bg-[#a05bb2] text-white hover:bg-[#a05bb2]/50 hover:text-white gap-2 max-w-[200px]"
          variant={'default'}
        >
          Cadastrar usuário
          <Cross />
        </Button>
      </div>
      <div className="flex-1 w-full overflow-auto p-2 flex flex-col gap-2">
        <div className="w-full space-y-4">
          <header className="grid grid-cols-[1fr_2fr_2fr_2fr_1fr] p-2 gap-2 items-center text-center border-b-2 font-bold">
            <p className="justify-self-start">ID</p>
            <p className="justify-self-start">Nome</p>
            <p className="justify-self-start">E-mail</p>
            <p className="justify-self-start">Tipo de usuário</p>
            <p>Ações</p>
          </header>

          {usersMock.map(user => (
            <div
              className="grid grid-cols-[1fr_2fr_2fr_2fr_1fr] bg-purple-100 rounded-sm min-h-[80px] items-center p-2 gap-2 shadow-md hover:bg-purple-200 font-semibold text-lg"
              key={user.id}
            >
              <p>{user.id}</p>
              <p className="justify-self-start">{user.name}</p>
              <p className="justify-self-start">{user.email}</p>
              <p>{user.userType}</p>
              <div className="flex justify-center gap-2">
                <Button
                  type="submit"
                  className="hover:bg-red-500"
                  variant={'arrowButton'}
                  size={'icon'}
                >
                  <Trash />
                </Button>
                <Button
                  type="submit"
                  className="hover:bg-yellow-300"
                  variant={'arrowButton'}
                  size={'icon'}
                >
                  <Edit />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
