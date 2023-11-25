import { ensureAuthenticate } from '@/shared/http/middleware/ensure-authenticate'
import { verifyRole } from '@/shared/http/middleware/verify-user-role'
import { FastifyInstance } from 'fastify'
import { createCarController } from './create-car-controller'
import { createCategoryController } from './create-category-controller'
import { createCarSpecificationController } from './create-specification-controller'
import { deleteCarController } from './delete-car-controller'
import { deleteCategoryController } from './delete-category-controller'
import { listCarsController } from './list-car-controller'
import { listCategoriesController } from './list-category-controller'
import { UpdateCarController } from './update-car-controller'

export async function carRoute(app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', ensureAuthenticate)
  app.get('/car', listCarsController)
  app.get('/category', listCategoriesController)

  // admin routes
  app.post('/car', { onError: [verifyRole('ADMIN')] }, createCarController)
  app.patch(
    '/car/:carId',
    { onError: [verifyRole('ADMIN')] },
    UpdateCarController,
  )
  app.delete(
    '/car/:carId',
    { onError: [verifyRole('ADMIN')] },
    deleteCarController,
  )
  app.post(
    '/category',
    { onError: [verifyRole('ADMIN')] },
    createCategoryController,
  )
  app.delete(
    '/category/:id',
    { onError: [verifyRole('ADMIN')] },
    deleteCategoryController,
  )
  app.post(
    '/specification/:carId',
    { onError: [verifyRole('ADMIN')] },
    createCarSpecificationController,
  )
}
