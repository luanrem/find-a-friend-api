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
}
