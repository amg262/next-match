'use client'

import { useForm } from 'react-hook-form'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { GiPadlock } from 'react-icons/gi'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { RegisterSchema } from '@/lib/schemas/registerSchema'
import { registerUser } from '@/app/actions/authActions'
import { ZodIssue } from 'zod'

export default function RegisterForm () {
  const { register, handleSubmit, setError, formState: { errors, isValid, isSubmitting } } = useForm<RegisterSchema>(
    {
      // resolver: zodResolver(registerSchema),
      mode: 'onTouched',
    })

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data)

    if (result.status === 'success') {
      console.log('User registered successfully')
    } else {
      if (Array.isArray(result.error)) {
        result.error.forEach((error: ZodIssue) => {
          const fieldName = error.path.join(
            '.') as 'name' | 'email' | 'password'
          setError(fieldName, {
            message: error.message,
          })
        })
      } else {
        setError('root.serverError', { message: result.error })
      }
      // if (Array.isArray(result.error)) {
      //   result.error.forEach((error: ZodIssue) => {
      //     const fieldName = error.path.join('.')
      //     setError(fieldName as keyof RegisterSchema, {
      //       message: error.message,
      //     })
      //   })
      // }
    }
    console.log({ result })
  }
  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-secondary">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30}/>
            <h1 className="text-3xl font-semibold">Register</h1>
          </div>
          <p className="text-neutral-500">Welcome to NextMatch</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              defaultValue=""
              label="Name"
              placeholder="Name"
              variant="bordered"
              {...register('name')}
              isInvalid={!!errors.name} // turns object into boolean
              errorMessage={errors.name?.message}
            />
            <Input
              defaultValue=""
              label="Email"
              placeholder="Email"
              variant="bordered"
              {...register('email')}
              isInvalid={!!errors.email} // turns object into boolean
              errorMessage={errors.email?.message}
            />
            <Input
              defaultValue=""
              label="Password"
              placeholder="Password"
              type="password"
              variant="bordered"
              {...register('password')}
              isInvalid={!!errors.password} // turns object into boolean
              errorMessage={errors.password?.message}
            />
            {errors.root?.serverError && (
              <p className="text-danger text-sm">
                {errors.root.serverError.message}
              </p>
            )}
            <Button isLoading={isSubmitting} isDisabled={!isValid} fullWidth
                    color="secondary"
                    type="submit">Submit</Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}