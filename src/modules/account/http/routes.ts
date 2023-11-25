import { FastifyInstance } from 'fastify'
import { authenticateUserController } from './authenticate-user-controller'
import { createUserController } from './create-user-controller'

export async function userRoute(app: FastifyInstance): Promise<void> {
  app.post('/session', authenticateUserController)
  app.post('/user', createUserController)
}
