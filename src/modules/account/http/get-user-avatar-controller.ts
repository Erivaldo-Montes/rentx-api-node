import { makeGetUserAvatarUseCase } from '@account/use-cases/factories/make-get-user-avatar-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getUserAvatarController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserAvatarUseCase = makeGetUserAvatarUseCase()

  const { sub } = request.user

  const avatar = await getUserAvatarUseCase.execute(sub)

  return reply.status(200).send(avatar)
}
