import { Button } from './button'

export const UserInfoModal = ({
  userId,
  isEdit,
  setOpenUserInfoModal,
  setUserId,
  setIsEdit
}: any) => {
  const closeModal = () => {
    setOpenUserInfoModal(false)
    setUserId(null)
    setIsEdit(false)
  }

  return (
    <div>
      {isEdit ? <p>Editando Modal de {userId}</p> : <p>Criando Usuário</p>}
      <Button onClick={() => closeModal()}>Fechar</Button>
    </div>
  )
}
