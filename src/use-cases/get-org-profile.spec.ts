import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { GetOrgProfileUseCase } from './get-org-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgProfileUseCase

describe('Get Org Profile', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgProfileUseCase(orgsRepository)

    await orgsRepository.create({
      id: '99b8dc47-4fc5-4284-ac7d-169e0b70041d',
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: 'Street something',
      cep: '80801802',
      password_hash: await hash('123456', 6),
      whatsapp: '419998188803',
    })
  })

  it('should be able to get org profile', async () => {
    const { org } = await sut.execute({
      orgId: '99b8dc47-4fc5-4284-ac7d-169e0b70041d'
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not e able to get org profile with the wrong orgId', async () => {
    await expect(() =>
      sut.execute({
        orgId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

})
