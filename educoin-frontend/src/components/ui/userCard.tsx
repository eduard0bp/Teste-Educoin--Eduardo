import toast from 'react-hot-toast'
import { Button } from './button'
import { Edit, Trash } from 'lucide-react'
import { User } from '@/app/interfaces/user'

interface UserCardProps {
  user: User
  mutate: any
  storedUser: any
  setIsEdit: () => void
  setOpenUserInfoModal: () => void
  setUserId: () => void
}

export const UserCard = ({
  user,
  mutate,
  storedUser,
  setIsEdit,
  setOpenUserInfoModal,
  setUserId
}: any) => {
  const deleteUser = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/users/${id}`, {
        method: 'DELETE'
      })

      toast.success('Usuário deletado com sucesso!')
      mutate()
    } catch (error) {
      toast.error('Erro ao deletar usuário!')
    }
  }

  return (
    <div
      className={`grid ${
        storedUser.type === 'ADMIN'
          ? 'grid-cols-[1fr_2fr_2fr_2fr_1fr]'
          : 'grid-cols-[1fr_2fr_2fr_1fr]'
      } bg-purple-100 rounded-sm min-h-[80px] items-center p-2 gap-2 shadow-md hover:bg-purple-200 font-semibold text-lg`}
      key={user.id}
    >
      <p>{user.id}</p>
      <p className="justify-self-start">{`${user.name} ${user.surname}`}</p>
      <p className="justify-self-start">{user.email}</p>
      <p>{user.school}</p>
      {storedUser.type === 'ADMIN' && (
        <div className="flex justify-center gap-2">
          <Button
            className="hover:bg-red-500"
            variant={'arrowButton'}
            size={'icon'}
            onClick={() => deleteUser(user.id)}
          >
            <Trash />
          </Button>
          <Button
            type="button"
            className="hover:bg-yellow-300"
            variant={'arrowButton'}
            size={'icon'}
            onClick={() => {
              setIsEdit(true)
              setOpenUserInfoModal(true)
              setUserId(user)
            }}
          >
            <Edit />
          </Button>
        </div>
      )}
    </div>
  )
}
