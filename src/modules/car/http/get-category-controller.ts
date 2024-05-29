import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeGetCategoryUseCase } from '@car/use-cases/factories/make-get-category-use-case'

export async function getCategoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getCategoryParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = getCategoryParamsSchema.parse(request.params)

  const getCategoryUseCase = makeGetCategoryUseCase()

  const category = await getCategoryUseCase.execute(id)

  return reply.status(200).send(category)
}
