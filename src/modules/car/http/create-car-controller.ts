import { makeCreateCarUseCase } from '@car/use-cases/factories/make-create-car-use-case'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createCarController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const createCarBodySchema = z.object({
    name: z.string(),
    brand: z.string(),
    about: z.string(),
    daily_rate: z.number(),
    license_plate: z.string(),
    category_id: z.string(),
  })
  const { name, brand, about, daily_rate, category_id, license_plate } =
    createCarBodySchema.parse(request.body)

  const createCarUseCase = makeCreateCarUseCase()

  const car = await createCarUseCase.execute({
    name,
    brand,
    about,
    daily_rate,
    license_plate,
    category_id,
  })

  return await reply.status(201).send(car)
}
