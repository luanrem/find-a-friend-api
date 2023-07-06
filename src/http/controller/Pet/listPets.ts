import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { OrgDoesNotExistsError } from '@/use-cases/errors/org-does-not-exist-error'
import { ListPetByCityUseCase } from '@/use-cases/list-pet-by-city'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function listPets(request: FastifyRequest, reply: FastifyReply) {
  const listPetsParamSchema = z.object({
    city: z.string(),
  })

  const { city } = listPetsParamSchema.parse(request.params)

  try {
    const orgsRepository = new PrismaOrgsRepository()
    const petsRepository = new PrismaPetsRepository()
    const listPetByCityUseCase = new ListPetByCityUseCase(petsRepository, orgsRepository)

    const pets = await listPetByCityUseCase.execute({
      city
    })

    return reply.status(200).send(pets)
  } catch (err) {
    if (err instanceof OrgDoesNotExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

}
