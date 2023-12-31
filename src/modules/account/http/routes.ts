import { ensureAuthenticate } from '@/shared/http/middleware/ensure-authenticate'
import { FastifyInstance } from 'fastify'
import { authenticateUserController } from './authenticate-user-controller'
import { createUserController } from './create-user-controller'
import { getUserAvatarController } from './get-user-avatar-controller'
import { GetUserProfileController } from './get-user-profile-controller'
import { refreshTokenController } from './refresh-token-controller'
import { updateAvatar } from './update-avatar-controller'
import { updatePasswordController } from './update-password-controller'

export async function userRoute(app: FastifyInstance): Promise<void> {
  app.post('/user', createUserController)
  app.post('/session', authenticateUserController)
  app.get('/me', { onRequest: [ensureAuthenticate] }, GetUserProfileController)
  app.post('/refresh-token', refreshTokenController)
  app.post(
    '/user/update-password',
    { onRequest: [ensureAuthenticate] },
    updatePasswordController,
  )
  app.post('/user/avatar', { onRequest: [ensureAuthenticate] }, updateAvatar)
  app.get(
    '/user/avatar',
    { onRequest: [ensureAuthenticate] },
    getUserAvatarController,
  )
}
