import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { AuthenticateUseCase } from './../../../use-cases/authenticate';
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } =
    authenticateBodySchema.parse(request.body)

  try {
    const orgsRepository = new PrismaOrgsRepository()
    const authenticateUseCase = new AuthenticateUseCase(orgsRepository)

    await authenticateUseCase.execute({
      email,
      password
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}
