import { Prisma, DogPicture } from '@prisma/client'
import { DogPicturesRepository } from '../dog-pictures-repository'
import { prisma } from '@/lib/prisma'

export class PrismaDogPicturesRepository implements DogPicturesRepository {
  async create(data: Prisma.DogPictureCreateInput): Promise<DogPicture> {
    const dogPicture = await prisma.dogPicture.create({
      data,
    })

    return dogPicture
  }
}
