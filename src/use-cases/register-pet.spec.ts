import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterPetUseCase } from './register-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { randomUUID } from 'crypto'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: RegisterPetUseCase

describe('Register Pet', () => {

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterPetUseCase(
      orgsRepository,
      petsRepository,
    )

    orgsRepository.items.push({
      id: randomUUID(),
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: 'Street something',
      cep: '80801802',
      password_hash: '123456',
      whatsapp: '419998188803',
      created_at: new Date()
    })
  })

  it('should be possible to register a pet', async () => {
    const { pet } = await sut.execute({
      name: "doginho",
      org_id: orgsRepository.items[0].id
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})