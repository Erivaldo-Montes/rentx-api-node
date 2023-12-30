import { makeGetCarUseCase } from '@car/use-cases/factories/make-get-car-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getCarController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const getCarParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = getCarParamsSchema.parse(request.params)

  const getCarUseCase = makeGetCarUseCase()

  const car = await getCarUseCase.execute(id)

  return reply.status(200).send(car)
}
