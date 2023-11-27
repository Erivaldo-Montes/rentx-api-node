import { makeAuthenticateUserUseCase } from '@account/use-cases/factories/make-authenticate-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AuthenticateError } from '../use-cases/errors/authenticate-error'

export async function authenticateUserController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const authenticateUserBodySchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  try {
    const { email, password } = authenticateUserBodySchema.parse(request.body)

    const authenticateUserUseCase = makeAuthenticateUserUseCase()

    const { user, refresh_token } = await authenticateUserUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '15m',
        },
      },
    )

    return reply.status(200).send({
      token,
      refresh_token,
    })
  } catch (error) {
    if (error instanceof AuthenticateError) {
      return reply.status(401).send({ message: error.message })
    }
    throw error
  }
}
