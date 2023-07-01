import { PetPicture, Prisma } from '@prisma/client'

export interface PetPicturesRepository {
  create(data: Prisma.PetPictureUncheckedCreateInput): Promise<PetPicture>
}
