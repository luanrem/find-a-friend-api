import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetCreateInput): Promise<Pet>
  findByOrg(orgId: string): Promise<Pet[] | null>
  findByOrgCity(city: string): Promise<Pet[] | null>
}
