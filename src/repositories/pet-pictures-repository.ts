import { PetPicture, Prisma } from '@prisma/client'

export interface PetPicturesRepository {
  create(data: Prisma.PetPictureCreateInput): Promise<PetPicture>
}
