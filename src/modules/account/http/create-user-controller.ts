import { makeCreateUserUseCase } from '@account/use-cases/factories/make-create-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    driver_license: z.string(),
    password: z.string(),
  })

  const { name, email, driver_license, password } = createUserBodySchema.parse(
    request.body,
  )

  const createUserUseCase = makeCreateUserUseCase()

  const user = await createUserUseCase.execute({
    name,
    email,
    driver_license,
    password,
  })

  return reply.status(201).send(user)
}
