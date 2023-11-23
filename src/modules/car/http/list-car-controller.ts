import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';
import { makeListCarsUseCase } from '../use-cases/factories/make-list-cars-use-case';

export async function listCarsController (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>{
  const listCarsSchemaQuery =  z.object({
    page: z.coerce.number().min(1).default(1)
  }) 

  const { page } = listCarsSchemaQuery.parse(request.query)

  const listCarsUseCase = makeListCarsUseCase()

  const cars = await listCarsUseCase.execute({page})

  return reply.status(200).send(cars)
}