import { Prisma, PetPicture } from '@prisma/client'
import { PetPicturesRepository } from '../pet-pictures-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetPicturesRepository implements PetPicturesRepository {
  async create(data: Prisma.PetPictureCreateInput): Promise<PetPicture> {
    const petPicture = await prisma.petPicture.create({
      data,
    })

    return petPicture
  }
}
