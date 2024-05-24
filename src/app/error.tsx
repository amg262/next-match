'use client' // Error components must be Client Components

import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { BiSolidErrorCircle } from 'react-icons/bi'
import { CardFooter } from '@nextui-org/react'
import { Button } from '@nextui-org/button'

export default function Error ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

  return (
    <div className="flex items-center justify-center vertical-center">
      <Card className="w-2/5 mx-auto">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-row gap-2 items-center text-secondary">
            <BiSolidErrorCircle size={30}/>
            <h1 className="text-3xl font-semibold">Error</h1>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex justify-center text-danger">
            {error.message}
          </div>
        </CardBody>
        <CardFooter className="flex justify-center">
          <Button onClick={() => reset()} color="secondary" variant="bordered">
            Try again
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}