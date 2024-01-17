'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const storedUser =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || '{}')
      : null

  const formSchema = z.object({
    school: z.string().min(2, {
      message: 'Instituição Escolar deve ter pelo menos 2 caracteres.'
    }),
    email: z.string().min(2, {
      message: 'Digite um e-mail válido.'
    }),
    password: z.string().min(2, {
      message: 'Senha deve ter pelo menos 2 caracteres.'
    })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      school: '',
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          school: values.school,
          email: values.email,
          password: values.password
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'E-mail ou senha inválidos!')
      }

      const data = await response.json()
      localStorage.setItem('user', JSON.stringify(data.user))

      router.push('/dashboard')
      toast.success('Login realizado com sucesso!')
    } catch (error) {
      toast.error('Erro ao realizar login!')
    }
  }

  useEffect(() => {
    if (Object.keys(storedUser).length !== 0) {
      router.push('/dashboard')
    }
  }, [router, storedUser])

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black bg-[url('/background.svg')] bg-no-repeat bg-cover relative">
      <Button
        type="submit"
        className="absolute top-5 left-5"
        variant={'arrowButton'}
        size={'icon'}
        onClick={() => {
          toast.error('Em desenvolvimento...')
        }}
      >
        <Image src="/arrow-left.svg" alt="" width={36} height={36} />
      </Button>
      <div className=" relative h-fit w-[437px] flex flex-col rounded-3xl border-4 bg-white/50 backdrop-blur-sm border-white px-10 pt-14 pb-7 items-center justify-center">
        <Image
          src="/achievements.svg"
          alt=""
          width={284}
          height={46}
          className="absolute top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full "
          >
            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instituição escolar</FormLabel>
                  <FormControl>
                    <Input
                      className="border-2 border-[#6D048C]"
                      placeholder="Digite o nome da sua escola"
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
                      placeholder="Digite seu e-mail"
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
                      placeholder="Digite sua senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-[10px] font-bold">
                    Sua senha é composta pelo nome da sua mãe + sua data de
                    nascimento
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-4 items-center w-full">
              <Button type="submit" variant={'default'}>
                Iniciar aventura
              </Button>
              <Link
                href="#"
                className="underline text-white text-sm"
                onClick={() => {
                  toast.error('Em desenvolvimento...')
                }}
              >
                Esqueci minha senha
              </Link>
              <Image
                src="./logo-educoin.svg"
                width={181}
                height={53}
                alt="logo"
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
