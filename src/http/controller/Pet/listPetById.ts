import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { ListPetByIdUseCase } from '@/use-cases/list-pet-by-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function listPetById(request: FastifyRequest, reply: FastifyReply) {
  const listPetsParamSchema = z.object({
    id: z.string(),
  })

  const { id } = listPetsParamSchema.parse(request.params)

  try {
    const petsRepository = new PrismaPetsRepository()
    const listPetByIdUseCase = new ListPetByIdUseCase(petsRepository)

    const pet = await listPetByIdUseCase.execute({
      id
    })

    return reply.status(200).send(pet)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

}
