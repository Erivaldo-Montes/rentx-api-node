import { makeRefreshTokenUseCase } from '@account/use-cases/factories/refresh-token-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
export async function refreshTokenController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const refreshTokenBodySchema = z.object({
    refresh_token: z.string(),
  })

  const { refresh_token } = refreshTokenBodySchema.parse(request.body)

  const refreshTokenUseCase = makeRefreshTokenUseCase()

  const { user_id, role } = await refreshTokenUseCase.execute(refresh_token)

  try {
    const token = await reply.jwtSign(
      {
        role,
      },
      {
        sign: {
          sub: user_id,
          expiresIn: '15m',
        },
      },
    )

    return reply.status(200).send({ token })
  } catch (error) {
    return reply.status(401).send({ message: 'error when updating token ' })
  }
}
