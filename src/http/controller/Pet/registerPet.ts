import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { OrgDoesNotExistsError } from '@/use-cases/errors/org-does-not-exist-error'
import { RegisterPetUseCase } from '@/use-cases/register-pet'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerPet(request: FastifyRequest, reply: FastifyReply) {
  const registerPetBodySchema = z.object({
    name: z.string(),
    about: z.string().nullish(),
    org_id: z.string().uuid(),
    age: z.enum(["NEWBORN", "PUPPY", "YOUNG", "ADULT", "OLD"]).nullable(),
    size: z.enum(["SMALL", "MEDIUM", "LARGE", "EXTRALARGE", "EXTRASMALL"]).nullable(),
    energy: z.enum(["MEDIUM", "LOW", "HIGH"]).nullable(),
    ambient: z.enum(["SMALL", "MEDIUM", "LARGE", "EXTRALARGE"]).nullable(),
    petPicturesUrl: z.array(z.object({ url: z.string() })).nullish(),
    adoptionRequirement: z.array(z.object({ requirement: z.string() })).nullable(),
  })

  const { name, about, org_id, age, size, energy, ambient, petPicturesUrl, adoptionRequirement } =
    registerPetBodySchema.parse(request.body)

  try {
    const orgsRepository = new PrismaOrgsRepository()
    const petsRepository = new PrismaPetsRepository()
    const registerPetUseCase = new RegisterPetUseCase(orgsRepository, petsRepository)

    await registerPetUseCase.execute({
      name,
      about,
      org_id,
      age,
      size,
      energy,
      ambient,
      petPicturesUrl,
      adoptionRequirement
    })
  } catch (err) {
    if (err instanceof OrgDoesNotExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
