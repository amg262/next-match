'use client'

import { messageSchema, MessageSchema } from '@/lib/schemas/messageSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { HiPaperAirplane } from 'react-icons/hi2'

export default function ChatForm () {
  const { register, handleSubmit, reset, formState: { isSubmitting, isValid, errors } } = useForm<MessageSchema>(
    {
      mode: 'onTouched',
      resolver: zodResolver(messageSchema),
    })

  const onSubmit = async (data: MessageSchema) => {
    console.log(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex items-center gap-2">
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
    </form>
  )
}