import { FastifyInstance } from 'fastify'
import { registerOrg } from './controller/Org/registerOrg'
import { registerPet } from './controller/Pet/registerPet'
import { authenticate } from './controller/Org/authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/org/new', registerOrg)
  app.post('/org/sessions', authenticate)
  app.post('/pet/new', registerPet)
}
