import { FastifyInstance } from 'fastify'
import { registerOrg } from './controller/Org/registerOrg'
import { registerPet } from './controller/Pet/registerPet'
import { authenticate } from './controller/Org/authenticate'
import { profile } from './controller/Org/profile'
import { verifyJWT } from './middlewares/verify-jwt'
import { listPets } from './controller/Pet/listPets'
import { listPetById } from './controller/Pet/listPetById'

export async function appRoutes(app: FastifyInstance) {
  app.post('/org/new', registerOrg)
  app.post('/org/sessions', authenticate)
  app.get('/pet/city/:city', listPets)
  app.get('/pet/id/:id', listPetById)


  /** Authenticated */
  app.post('/pet/new', { onRequest: [verifyJWT] }, registerPet)
  app.get('/org/me', { onRequest: [verifyJWT] }, profile)
}
