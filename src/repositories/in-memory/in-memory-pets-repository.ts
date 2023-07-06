import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {

  public items: Pet[] = []

  async create(data: Prisma.PetCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about ?? null,
      age: data.age ?? null,
      ambient: data.ambient ?? null,
      size: data.size ?? null,
      energy: data.energy ?? null,
      org_id: data.org.connect?.id ?? '',
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findByOrg(orgId: string): Promise<Pet[] | null> {
    const pet = this.items.filter((item) => item.org_id === orgId)

    if (!pet) {
      return null
    }

    return pet
  }

  findByOrgCity(city: string): Promise<Pet[] | null> {
    throw new Error('Method not implemented.')
  }
}
