import { ensureAuthenticate } from '@/shared/http/middleware/ensure-authenticate'
import { FastifyInstance } from 'fastify'
import { authenticateUserController } from './authenticate-user-controller'
import { createUserController } from './create-user-controller'
import { GetUserProfileController } from './get-user-profile-controller'

export async function userRoute(app: FastifyInstance): Promise<void> {
  app.post('/user', createUserController)
  app.post('/session', authenticateUserController)
  app.get('/me', { onRequest: [ensureAuthenticate] }, GetUserProfileController)
}
