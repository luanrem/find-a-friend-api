import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authtenticate Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)

    await orgsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: 'Street something',
      cep: '80801802',
      password_hash: await hash('123456', 6),
      whatsapp: '419998188803',
    })
  })

  it('should be able to authenticate', async () => {
    const { org } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {

    await expect(() => sut.execute({
      email: 'johndoe_wrong@example.com',
      password: '123456',
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {

    await expect(() => sut.execute({
      email: 'johndoe@example.com',
      password: '1234567',
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
