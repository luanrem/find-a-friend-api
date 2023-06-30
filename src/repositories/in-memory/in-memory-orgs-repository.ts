import { Prisma, Org } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: data.id ?? randomUUID(),
      address: data.address ?? null,
      cep: data.cep ?? null,
      email: data.email,
      name: data.name,
      password_hash: data.password_hash,
      whatsapp: data.whatsapp,
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }
}