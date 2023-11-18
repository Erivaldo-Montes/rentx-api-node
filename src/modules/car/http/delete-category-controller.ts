import { makeDeleteCategoryUseCase } from '@car/use-cases/factories/make-delete-category-use-case';
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';

export async function deleteCategoryController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const deleteCategorySchemaParams = z.object({
    id: z.string()
  })

  const {id} = deleteCategorySchemaParams.parse(request.params)

  const deleteCategoryUseCase = makeDeleteCategoryUseCase()

  await deleteCategoryUseCase.execute(id)

  return reply.status(200).send()
}