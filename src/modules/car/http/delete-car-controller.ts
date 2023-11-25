import { makeDeleteCarUseCase } from '@car/use-cases/factories/make-delete-car-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteCarController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const deleteCarSchemaParams = z.object({
    carId: z.string(),
  })

  const { carId } = deleteCarSchemaParams.parse(request.params)

  const deleteCarUseCase = makeDeleteCarUseCase()

  await deleteCarUseCase.execute(carId)

  return reply.status(200).send()
}
