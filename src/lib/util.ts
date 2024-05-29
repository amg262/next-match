import { differenceInYears, format } from 'date-fns'
import { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import { ZodIssue } from 'zod'

export function calculateAge (dob: Date) {
  return differenceInYears(new Date(), dob)
}

export function formatShortDateTime (date: Date) {
  return format(date, 'MMM d, yyyy h:mm a')
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

export function transformImageUrl (imageUrl?: string | null) {
  if (!imageUrl) {
    return null
  }

  if (!imageUrl.includes('cloudinary')) {
    return imageUrl
  }

  const uploadIndex = imageUrl.indexOf('/upload/') + '/upload/'.length
  const transformation = 'c_fill,w_300_300,g_faces/'

  return `${imageUrl.slice(0, uploadIndex)}${transformation}${imageUrl.slice(
    uploadIndex)}`
}

export function truncateString (text?: string | null, num: number = 50) {
  if (!text) {
    return null
  }

  if (text.length <= num) {
    return text
  } else {
    return text.slice(0, num) + '...'
  }
}

export function createChatId (a: string, b: string) {
  return a > b ? `${b}-${a}` : `${a}-${b}`
}