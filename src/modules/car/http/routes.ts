import { type FastifyInstance } from 'fastify'
import { createCarSpecificationController } from './create-specification'
import { createCar } from './createCar'

export async function carRoute (app: FastifyInstance): Promise<void> {
  app.post('/car', createCar)
  app.post('/specification/:carId', createCarSpecificationController)
}
