import { differenceInYears } from 'date-fns'
import { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import { ZodIssue } from 'zod'

export function calculateAge (dob: Date) {
  return differenceInYears(new Date(), dob)
}

export function handleFormServerErrors<TFieldValues extends FieldValues> (
  errorResponse: { error: string | ZodIssue[] },
  setError: UseFormSetError<TFieldValues>,
) {
  if (Array.isArray(errorResponse.error)) {
    errorResponse.error.forEach((error: ZodIssue) => {
      const fieldName = error.path.join('.') as Path<TFieldValues>
      setError(fieldName, {
        message: error.message,
      })
    })
  } else {
    setError('root.serverError', { message: errorResponse.error })
  }
}