import { FastifyInstance } from 'fastify'
import { createCarController } from './create-car-controller'
import { createCategoryController } from './create-category-controller'
import { createCarSpecificationController } from './create-specification-controller'
import { deleteCarController } from './delete-car-controller'
import { deleteCategoryController } from './delete-category-controller'
import { listCategoriesController } from './list-category-controller'
import { UpdateCarController } from './update-car-controller'

export async function carRoute (app: FastifyInstance): Promise<void> {
  app.post('/specification/:carId', createCarSpecificationController)
  app.post('/car', createCarController)
  app.delete('/car/:carId',deleteCarController )
  app.patch('/car/:id', UpdateCarController)
  app.post('/category', createCategoryController)
  app.get('/category', listCategoriesController)
  app.delete('/category/:id', deleteCategoryController)
}
