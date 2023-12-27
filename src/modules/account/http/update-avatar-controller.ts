import { makeUpdateAvatarUseCase } from '@account/use-cases/factories/make-update-avatar-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function updateAvatar(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const avatar = await request.file()

  const { sub } = request.user

  if (avatar) {
    const updateAvatarUseCase = makeUpdateAvatarUseCase()
    updateAvatarUseCase.execute({ avatar_file: avatar, user_id: sub })
  }

  return reply.status(201).send()
}
