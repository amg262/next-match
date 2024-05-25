import { CardBody, CardHeader, Divider, Image } from '@nextui-org/react'
import { getAuthUserId } from '@/app/actions/authActions'
import {
  getMemberByUserId,
  getMemberPhotosByUserId,
} from '@/app/actions/memberActions'

export default async function PhotosPage () {
  const userId = await getAuthUserId()
  const member = await getMemberByUserId(userId)
  const photos = await getMemberPhotosByUserId(userId)

  return (
    <div>
      <div>
        <CardHeader className="text-2xl font-semibold text-secondary">
          Edit Profile
        </CardHeader>
        <Divider/>
        <CardBody>
          <div className="grid grid-cols-5 gap-3 p-5">
            {photos && photos.map((photo) => (
              <div key={photo.id} className="relative">
                <Image
                  width={220}
                  height={220}
                  src={photo.url}
                  alt="Image of user"
                />
              </div>
            ))}
          </div>
        </CardBody>
      </div>
    </div>
  )
}
