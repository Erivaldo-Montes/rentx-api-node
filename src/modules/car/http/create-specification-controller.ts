import { makeCreateSpecificationUseCase } from '@car/use-cases/factories/make-create-specification-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createCarSpecificationController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const createSpecificationBodySchema = z.object({
    name: z.string(),
    description: z.string(),
  })

  const createSpecificationParamsSchema = z.object({
    carId: z.string(),
  })

  const { name, description } = createSpecificationBodySchema.parse(
    request.body,
  )

  const { carId } = createSpecificationParamsSchema.parse(request.params)

  const createCarSpecificationUseCase = makeCreateSpecificationUseCase()

  await createCarSpecificationUseCase.execute({
    name,
    description,
    car_id: carId,
  })

  return reply.status(201).send()
}
