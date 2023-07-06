import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { OrgDoesNotExistsError } from '@/use-cases/errors/org-does-not-exist-error'
import { ListPetByCityUseCase } from '@/use-cases/list-pet-by-city'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function listPets(request: FastifyRequest, reply: FastifyReply) {
  const listPetsParamSchema = z.object({
    city: z.string(),
  })

  const listPetsQuerySchema = z.object({
    size: z.string().optional(),
    energy: z.string().optional()
  })

  const query = listPetsQuerySchema.parse(request.query)

  const { city } = listPetsParamSchema.parse(request.params)

  try {
    const petsRepository = new PrismaPetsRepository()
    const listPetByCityUseCase = new ListPetByCityUseCase(petsRepository)

    const pets = await listPetByCityUseCase.execute({
      city,
      query
    })

    return reply.status(200).send(pets)
  } catch (err) {
    if (err instanceof OrgDoesNotExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

}
