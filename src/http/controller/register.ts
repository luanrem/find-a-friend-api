import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterUseCase } from '@/use-cases/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    cep: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    whatsapp: z.string(),
  })

  const { name, email, password, cep, address, whatsapp } =
    registerBodySchema.parse(request.body)

  try {
    const orgsRepository = new PrismaOrgsRepository()
    const registerUseCase = new RegisterUseCase(orgsRepository)

    await registerUseCase.execute({
      name,
      email,
      password,
      cep,
      address,
      whatsapp,
    })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
