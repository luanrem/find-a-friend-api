import { FastifyInstance } from 'fastify'
import { registerOrg } from './controller/Org/registerOrg'
import { registerPet } from './controller/Pet/registerPet'
import { authenticate } from './controller/Org/authenticate'
import { profile } from './controller/Org/profile'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/org/new', registerOrg)
  app.post('/org/sessions', authenticate)
  app.post('/pet/new', registerPet)

  /** Authenticated */
  app.get('/org/me', { onRequest: [verifyJWT] }, profile)
}
