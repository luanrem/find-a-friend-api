import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository';
import { GetOrgProfileUseCase } from '@/use-cases/get-org-profile'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  console.log(request.user.sub)

  const orgsRepository = new PrismaOrgsRepository()
  const getOrgProfileUseCase = new GetOrgProfileUseCase(orgsRepository)

  const { org } = await getOrgProfileUseCase.execute({
    orgId: request.user.sub
  })

  return reply.status(200).send({
    org: {
      ...org,
      password_hash: undefined
    }
  })

}
