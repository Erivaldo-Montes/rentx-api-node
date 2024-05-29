import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeUpdateSpecificationUseCase } from '@car/use-cases/factories/make-update-specification-use-case'

export async function updateSpecificationController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateSpecificationBodySchema = z.object({
    name: z.string(),
    description: z.string(),
  })

  const updateSpecificationParamsSchema = z.object({
    id: z.string(),
  })

  const { description, name } = updateSpecificationBodySchema.parse(
    request.body,
  )
  const { id } = updateSpecificationParamsSchema.parse(request.params)

  const updateSpecification = makeUpdateSpecificationUseCase()

  await updateSpecification.execute({ id, description, name })

  return reply.status(200).send()
}
