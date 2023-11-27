import { makeGetUserProfileUseCase } from '@account/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function GetUserProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const { sub } = request.user

  console.log('controller -------------------', sub)

  const getUserProfileUseCase = makeGetUserProfileUseCase()

  const user = await getUserProfileUseCase.execute(sub)

  return reply.status(201).send(user)
}
