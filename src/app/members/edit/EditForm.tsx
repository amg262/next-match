'use client'

import { Member } from '@prisma/client'
import { useForm } from 'react-hook-form'
import {
  MemberEditSchema,
  memberEditSchema,
} from '@/lib/schemas/memberEditSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Textarea } from '@nextui-org/input'
import { useEffect } from 'react'
import { Button } from '@nextui-org/button'
import { updateMemberProfile } from '@/app/actions/userActions'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { handleFormServerErrors } from '@/lib/util'

type Props = {
  member: Member
}
export default function EditForm ({ member }: Props) {
  const router = useRouter()
  const {
    register, handleSubmit, reset, setError,
    formState: { isValid, isDirty, isSubmitting, errors },
  } = useForm<MemberEditSchema>(
    {
      resolver: zodResolver(memberEditSchema),
      mode: 'onTouched',
    })

  useEffect(() => {
    if (member) {
      reset({
        name: member.name,
        description: member.description,
        city: member.city,
        country: member.country,
      })
    }
  }, [member, reset])
  const onSubmit = async (data: MemberEditSchema) => {
    const nameUpdated = data.name !== member.name
    const result = await updateMemberProfile(data, nameUpdated)

    if (result.status === 'success') {
      toast.success('Member profile updated successfully')
      router.refresh()
      reset({ ...data })
      console.log('Member profile updated successfully')
    } else {
      handleFormServerErrors(result, setError)
      console.error(result.error)
    }

    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <Input
        {...register('name')}
        label="Name"
        variant="bordered"
        defaultValue={member.name}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />
      <Textarea
        {...register('description')}
        label="Description"
        variant="bordered"
        defaultValue={member.description}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
        minRows={6}
      />
      <div className="flex flex-row gap-3">
        <Input
          {...register('city')}
          label="City"
          variant="bordered"
          defaultValue={member.city}
          isInvalid={!!errors.city}
          errorMessage={errors.city?.message}
        />
        <Input
          {...register('country')}
          label="Country"
          variant="bordered"
          defaultValue={member.country}
          isInvalid={!!errors.country}
          errorMessage={errors.country?.message}
        />
      </div>
      {errors.root?.serverError && (
        <p className="text-danger text-sm">
          {errors.root.serverError.message}
        </p>
      )}
      <Button
        type="submit"
        color="secondary"
        className="flex self-end"
        variant="solid"
        isLoading={isSubmitting}
        isDisabled={!isValid || !isDirty}
      >
        Update Profile
      </Button>
    </form>
  )
}