import { makeCreateCarRentalUseCase } from '@rental/use-cases/factories/create-car-rental-use-case-factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createCarRentalController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const createCarRentalBodySchema = z.object({
    car_id: z.string(),
    end_date: z.string(),
    start_date: z.string(),
  })

  const { sub } = request.user

  const { car_id, end_date, start_date } = createCarRentalBodySchema.parse(
    request.body,
  )

  const createCarRentalUseCase = makeCreateCarRentalUseCase()

  const rental = await createCarRentalUseCase.execute({
    car_id,
    end_date,
    start_date,
    user_id: sub,
  })

  return reply.status(201).send(rental)
}
