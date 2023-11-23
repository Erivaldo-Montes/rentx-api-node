import { FastifyInstance } from 'fastify'
import { createCarController } from './create-car-controller'
import { createCategoryController } from './create-category-controller'
import { createCarSpecificationController } from './create-specification-controller'
import { deleteCarController } from './delete-car-controller'
import { deleteCategoryController } from './delete-category-controller'
import { listCarsController } from './list-car-controller'
import { listCategoriesController } from './list-category-controller'
import { UpdateCarController } from './update-car-controller'



export async function carRoute (app: FastifyInstance): Promise<void> {
  app.get('/car', listCarsController)
  app.post('/car', createCarController)
  app.patch('/car/:carId', UpdateCarController)
  app.delete('/car/:carId',deleteCarController)
  app.get('/category', listCategoriesController)
  app.post('/category', createCategoryController)
  app.delete('/category/:id', deleteCategoryController)
  app.post('/specification/:carId', createCarSpecificationController)
}
