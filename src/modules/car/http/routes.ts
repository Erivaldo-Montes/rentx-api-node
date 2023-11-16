import { FastifyInstance } from 'fastify'
import { createCarController } from './create-car-controller'
import { createCategoryController } from './create-category-controller'
import { createCarSpecificationController } from './create-specification-controller'
import { deleteCarController } from './delete-car-controller'

export async function carRoute (app: FastifyInstance): Promise<void> {
  app.post('/car', createCarController)
  app.post('/specification/:carId', createCarSpecificationController)
  app.post('/category', createCategoryController)
  app.delete('/car/:carId',deleteCarController )
}
