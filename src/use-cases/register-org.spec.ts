import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterOrgUseCase } from './register-org'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { compare } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Org', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('should be able to register', async () => {
    const { org } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: 'Street something',
      cep: '80801802',
      password: '123456',
      whatsapp: '419998188803',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to register with the same email', async () => {
    const emailTest = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email: emailTest,
      address: 'Street something',
      cep: '80801802',
      password: '123456',
      whatsapp: '419998188803',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email: emailTest,
        address: 'Street something',
        cep: '80801802',
        password: '123456',
        whatsapp: '419998188803',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('should hash user password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: 'Street something',
      cep: '80801802',
      password: '123456',
      whatsapp: '419998188803',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
