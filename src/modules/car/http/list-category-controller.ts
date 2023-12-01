import { makeListCategoriesUseCase } from '@car/use-cases/factories/make-list-categories-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listCategoriesController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const listCategoriesUseCase = makeListCategoriesUseCase()

  const categories = await listCategoriesUseCase.execute()

  return reply.status(200).send({ categories })
}
