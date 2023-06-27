import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  cep?: null | string
  address?: null | string
  whatsapp: string
}

export class RegisterUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private orgsRepository: OrgsRepository) { }

  async execute({
    name,
    email,
    password,
    cep,
    address,
    whatsapp,
  }: RegisterUseCaseRequest): Promise<Org> {
    const orgAlreadyExists = await this.orgsRepository.findByEmail(email)

    if (orgAlreadyExists) {
      throw new Error('Organization already exists!')
    }

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash,
      cep,
      address,
      whatsapp,
    })

    return org
  }
}
