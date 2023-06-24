import { prisma } from '@/lib/prisma'
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

  await prisma.org.create({
    data: {
      name,
      email,
      password_hash: password,
      cep,
      address,
      whatsapp,
    },
  })

  return reply.status(201).send()
}
