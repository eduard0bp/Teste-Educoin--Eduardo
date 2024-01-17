'use client'

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { useContext, useEffect } from 'react'
import { ModalContext } from './modal.context'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '../input'
import { Button } from '../button'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../select'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export const Modal = ({ user, isEdit, setUserId, setIsEdit, mutate }: any) => {
  const { data: userInfo } = useSWR(
    `http://localhost:3001/users/${user?.id}`,
    fetcher
  )

  const { open, setOpen } = useContext(ModalContext)

  const formSchema = z.object({
    school: z.string().min(2, {
      message: 'Instituição Escolar deve ter pelo menos 2 caracteres.'
    }),
    email: z.string().min(2, {
      message: 'Digite um e-mail válido.'
    }),
    password: z.string().min(2, {
      message: 'Senha deve ter pelo menos 2 caracteres.'
    }),
    type: z.string().min(2, {
      message: 'Tipo de Usuário deve ter pelo menos 2 caracteres.'
    }),
    name: z.string().min(2, {
      message: 'Nome deve ter pelo menos 2 caracteres.'
    }),
    surname: z.string().min(2, {
      message: 'Sobrenome deve ter pelo menos 2 caracteres.'
    })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      school: '',
      email: '',
      password: '',
      type: '',
      name: '',
      surname: ''
    }
  })

  useEffect(() => {
    if (!open) {
      setIsEdit(false)
      setUserId(null)
      form.reset({
        school: '',
        email: '',
        password: '',
        type: '',
        name: '',
        surname: ''
      })
      mutate()
    }
  }, [open, form, setIsEdit, setUserId, mutate])

  useEffect(() => {
    if (userInfo) {
      form.reset({
        ...userInfo
      })
    }
  }, [userInfo, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          school: values.school,
          email: values.email,
          password: values.password,
          type: values.type,
          name: values.name,
          surname: values.surname
        })
      })

      toast.success('Usurário criado com sucesso!')
      setOpen(false)
    } catch (error) {
      toast.error('Erro ao criar usuário!')
    }
  }

  async function updateUser(values: z.infer<typeof formSchema>) {
    try {
      await fetch(`http://localhost:3001/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          school: values.school,
          email: values.email,
          password: values.password,
          type: values.type,
          name: values.name,
          surname: values.surname
        })
      })

      toast.success('Usurário atualizado com sucesso!')
      setOpen(false)
    } catch (error) {
      toast.error('Erro ao atualizar usurário!')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="font-bold text-2xl">
          {isEdit ? (
            `Editando informações de ${user.name}`
          ) : (
            <p>Cadastrar usuário</p>
          )}
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(isEdit ? updateUser : onSubmit)}
            className="space-y-4 w-full"
          >
            <div className="max-h-[400px] overflow-auto pr-2">
              <FormField
                control={form.control}
                name="school"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instituição escolar</FormLabel>
                    <FormControl>
                      <Input
                        className="border-2 border-[#6D048C]"
                        placeholder="Digite o nome da escola do usuário"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        className="border-2 border-[#6D048C]"
                        placeholder="Digite o e-mail do usuário"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-[10px] font-bold">
                      Ex: nomesobrenome@escola.com.br
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        className="border-2 border-[#6D048C]"
                        placeholder="Digite a senha do usuário"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-[10px] font-bold">
                      A é composta pelo nome mãe + data de nascimento do usuário
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Usuário</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full border-2 border-[#6D048C]">
                          <SelectValue placeholder="Escolha o tipo de usuário" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ADMIN">Administrador</SelectItem>
                          <SelectItem value="CLIENT">Cliente</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        className="border-2 border-[#6D048C]"
                        placeholder="Digite o nome do usuário"
                        type="name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input
                        className="border-2 border-[#6D048C]"
                        placeholder="Digite o sobrenome do usuário"
                        type="surname"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-4 items-center w-full">
              <div className="flex justify-between w-full gap-2">
                <Button
                  type="button"
                  variant={'default'}
                  onClick={() => {
                    setOpen(false)
                    setIsEdit(false)
                    setUserId(null)
                  }}
                  className="bg-transparent text-[#6D048C] hover:bg-transparent hover:text-[#6D048C]/50 border border-[#6D048C] hover:border-[#6D048C]/50"
                >
                  Fechar
                </Button>
                <Button type="submit" variant={'default'}>
                  {isEdit ? 'Salvar' : 'Criar'}
                </Button>
              </div>
              <Image
                src="./logo-educoin.svg"
                width={181}
                height={53}
                alt="logo"
              />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
