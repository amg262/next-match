import { getMemberPhotosByUserId } from '@/app/actions/memberActions'
import { notFound } from 'next/navigation'
import { CardBody, CardHeader, Divider, Image } from '@nextui-org/react'

export default async function PhotosPage ({ params }: {
  params: { userId: string }
}) {
  const photos = await getMemberPhotosByUserId(params.userId)
  if (!photos) {
    return notFound()
  }

  return (
    <div>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Photos
      </CardHeader>
      <Divider/>
      <CardBody>
        <div className="grid grid-cols-5 gap-3">
          {photos && photos.map(photo => (
            <div key={photo.id}>
              <Image
                src={photo.url || '/images/user.png'}
                alt="Image of memeber"
                width={300}
                height={300}
                className="object-cover aspect-square"
              />
            </div>
          ))}
        </div>
      </CardBody>
    </div>
  )
}
