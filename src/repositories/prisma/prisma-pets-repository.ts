import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data })

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findFirst({
      where: {
        id
      }
    })

    if (!pet) {
      return null
    }

    return pet
  }

  async findByOrg(orgId: string): Promise<Pet[] | null> {
    const pets = await prisma.pet.findMany({
      where: {
        org_id: orgId
      }
    })

    if (!pets) {
      return null
    }

    return pets
  }

  async findByOrgCity(city: string): Promise<Pet[] | null> {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city
        }
      }
    })

    return pets
  }
}
