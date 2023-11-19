import { makeUpdateUseCase } from '@car/use-cases/factories/make-update-car-use-case';
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';

export async function UpdateCarController(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const updateCarSchemaBody = z.object({
    name: z.string(),
    brand: z.string(),
    about: z.string(),
    category_id: z.string(),
    daily_rate: z.number()
  })

  const updateCarSchemaParams = z.object({
    carId: z.string()
  })

  const {name, brand, about, category_id, daily_rate} = updateCarSchemaBody.parse(request.body)
  const {carId} = updateCarSchemaParams.parse(request.params)

  const updateCarUseCase = makeUpdateUseCase()

  const car = await updateCarUseCase.execute({
    id: carId,
    name,
    brand,
    about,
    category_id,
    daily_rate
  })

  return reply.status(200).send({car})
}