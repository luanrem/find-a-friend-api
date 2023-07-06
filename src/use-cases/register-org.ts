import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { SearchCityByCep } from '@/utils/search-city-by-cep'
import { InvalidCepError } from './errors/invalid-cep-error'

interface RegisterOrgUseCaseRequest {
  name: string
  email: string
  password: string
  cep: string
  address: string
  whatsapp: string
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) { }

  async execute({
    name,
    email,
    password,
    cep,
    address,
    whatsapp,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const orgAlreadyExists = await this.orgsRepository.findByEmail(email)

    if (orgAlreadyExists) {
      throw new OrgAlreadyExistsError()
    }

    const { city } = await SearchCityByCep(cep)

    if (!city) {
      throw new InvalidCepError()
    }

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash,
      cep,
      city,
      address,
      whatsapp,
    })

    return {
      org,
    }
  }
}
