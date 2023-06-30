import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  cep?: null | string
  address?: null | string
  whatsapp: string
}

interface RegisterUseCaseResponse {
  org: Org
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
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const orgAlreadyExists = await this.orgsRepository.findByEmail(email)

    if (orgAlreadyExists) {
      throw new OrgAlreadyExistsError()
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

    return {
      org,
    }
  }
}
