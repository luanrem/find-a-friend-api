import { AdoptionRequirement, Prisma } from '@prisma/client'

export interface AdoptionRequirementRepository {
  create(
    data: Prisma.AdoptionRequirementCreateInput,
  ): Promise<AdoptionRequirement>
}
