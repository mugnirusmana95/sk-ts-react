import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FiEye, FiEyeOff } from "react-icons/fi"

import FormInput from '~/components/formInput'
import { parseApiError } from '~/lib/api-error'
import { useLogin } from '~/features/auth/hook'
import { loginSchema, type TLoginSchema } from '~/validators/auth'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const onLogin = useLogin()

  const methods = useForm<TLoginSchema>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = methods.handleSubmit((values) => {
    const username = String(values?.username)
    const password = String(values?.password)

    onLogin.mutate({ username, password })
  })

  useEffect(() => {
    if (onLogin.error) {
      const parsedError = parseApiError(onLogin?.error)
      if (parsedError?.field) {
        for (const item of parsedError?.field?.array) {
          const { field, message } = item
          methods.setError(field as keyof TLoginSchema, { type: 'server', message })
        }
      }
    }
  }, [onLogin.error])

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="flex w-full flex-col gap-5 p-5">
        <span>Login Page</span>

        <FormInput name="username" label="Username" placeholder="Username" required />

        <FormInput
          name="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="Password"
          iconRight={showPassword ? <FiEye /> : <FiEyeOff />}
          onClickIconRight={() => setShowPassword(!showPassword)}
          required
        />

        <button
          type="submit"
          disabled={onLogin.isPending}
          className="w-fit rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {onLogin.isPending ? 'Loading...' : 'Login'}
        </button>
      </form>
    </FormProvider>
  )
}

export default LoginPage
