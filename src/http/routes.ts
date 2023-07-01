import { FastifyInstance } from 'fastify'
import { registerOrg } from './controller/Org/registerOrg'
import { registerPet } from './controller/Pet/registerPet'

export async function appRoutes(app: FastifyInstance) {
  app.post('/org/new', registerOrg)
  app.post('/pet/new', registerPet)
}
