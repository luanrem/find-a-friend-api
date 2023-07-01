import { DogPicture, Prisma } from '@prisma/client'

export interface DogPicturesRepository {
  create(data: Prisma.DogPictureCreateInput): Promise<DogPicture>
}
