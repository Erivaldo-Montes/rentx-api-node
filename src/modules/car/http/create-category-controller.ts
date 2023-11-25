import { makeCreateCategoryUseCase } from '@car/use-cases/factories/make-create-category-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createCategoryController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const createCategorySchemaBody = z.object({
    name: z.string(),
    description: z.string(),
  })

  const { name, description } = createCategorySchemaBody.parse(request.body)

  const createCategoryUseCase = makeCreateCategoryUseCase()
  await createCategoryUseCase.execute({ name, description })

  return reply.status(201).send()
}
