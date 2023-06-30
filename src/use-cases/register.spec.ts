import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('Register Org', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })

  it('should be able to register', async () => {
    const { org } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      whatsapp: '419998188803',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
