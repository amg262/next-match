'use client'

import { messageSchema, MessageSchema } from '@/lib/schemas/messageSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { HiPaperAirplane } from 'react-icons/hi2'
import { useParams, useRouter } from 'next/navigation'
import { createMessage } from '@/app/actions/messageActions'
import { handleFormServerErrors } from '@/lib/util'

export default function ChatForm () {
  const router = useRouter()
  const params = useParams<{ userId: string }>()
  const {
    register, handleSubmit,
    reset, setError,
    formState: {
      isSubmitting, isValid, errors,
    },
  } = useForm<MessageSchema>(
    {
      mode: 'onTouched',
      resolver: zodResolver(messageSchema),
    })

  const onSubmit = async (data: MessageSchema) => {
    const result = await createMessage(params.userId, data)
    if (result.status === 'error') {
      handleFormServerErrors(result, setError)
      console.error(result.error)
      return
    } else {
      reset()
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex items-center gap-2">
        <Input
          fullWidth
          placeholder="Type a message..."
          variant="faded"
          isInvalid={!!errors.text}
          errorMessage={errors.text?.message}
          {...register('text')}
        />
        <Button
          type="submit"
          color="secondary"
          radius="full"
          isIconOnly={true}
          isLoading={isSubmitting}
          isDisabled={!isValid || isSubmitting}
        >
          <HiPaperAirplane size={18}/>
        </Button>
      </div>
      <div className="flex flex-col">
        {errors.root?.serverError && (
          <p className="text-danger text-sm">
            {errors.root.serverError.message}
          </p>
        )}
      </div>
    </form>
  )
}