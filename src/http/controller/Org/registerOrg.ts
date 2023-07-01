import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { RegisterOrgUseCase } from '@/use-cases/register-org'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerOrg(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    cep: z.string(),
    address: z.string(),
    whatsapp: z.string(),
  })

  const { name, email, password, cep, address, whatsapp } =
    registerBodySchema.parse(request.body)

  try {
    const orgsRepository = new PrismaOrgsRepository()
    const registerOrgUseCase = new RegisterOrgUseCase(orgsRepository)

    await registerOrgUseCase.execute({
      name,
      email,
      password,
      cep,
      address,
      whatsapp,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
