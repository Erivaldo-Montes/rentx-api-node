import { makeCarReturnRentalUseCase } from '@rental/use-cases/factories/car-return-rental-factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function carReturnController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const carReturnBodySchema = z.object({
    rent_id: z.string(),
  })

  const { rent_id } = carReturnBodySchema.parse(request.body)

  const carReturnUseCase = makeCarReturnRentalUseCase()

  await carReturnUseCase.execute(rent_id)

  return reply.status(200).send()
}
