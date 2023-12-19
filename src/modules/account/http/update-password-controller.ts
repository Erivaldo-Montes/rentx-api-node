import { makeUpdatePasswordUseCase } from '@account/use-cases/factories/make-update-password-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updatePasswordController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const updatePasswordBodySchema = z.object({
    currentPassword: z.string(),
    newPassword: z.string(),
  })

  const { sub } = request.user

  const { newPassword, currentPassword } = updatePasswordBodySchema.parse(
    request.body,
  )

  const updatePasswordUseCase = makeUpdatePasswordUseCase()

  await updatePasswordUseCase.execute({
    currentPassword,
    newPassword,
    user_id: sub,
  })

  return reply.status(200).send()
}
