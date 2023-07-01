import { Prisma, AdoptionRequirement } from '@prisma/client'
import { AdoptionRequirementRepository } from '../adoption-requirement-repository'
import { prisma } from '@/lib/prisma'

export class PrismaAdoptionRequirementRepository
  // eslint-disable-next-line prettier/prettier
  implements AdoptionRequirementRepository {
  async create(
    data: Prisma.AdoptionRequirementCreateInput,
  ): Promise<AdoptionRequirement> {
    const adoptionRequirement = await prisma.adoptionRequirement.create({
      data,
    })

    return adoptionRequirement
  }
}
