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

export default function LoginPage() {
  const formSchema = z.object({
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.'
    }),
    email: z.string().min(2, {
      message: 'Email must be at least 2 characters.'
    }),
    password: z.string().min(2, {
      message: 'Password must be at least 2 characters.'
    })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

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
      <div className=" relative h-[532px] w-[437px] flex flex-col rounded-3xl border-4 bg-white/50 backdrop-blur-sm border-white px-10 pt-14 pb-7 items-center justify-center">
        <Image
          src="/achievements.svg"
          alt=""
          width={284}
          height={46}
          className="absolute top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
        <Form {...form}>
          <form onSubmit={() => {}} className="space-y-4 w-full ">
            <FormField
              control={form.control}
              name="username"
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
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-[10px]">
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
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-[10px]">
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
              <Link href="#" className="underline text-white text-sm">
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
