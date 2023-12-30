import { ensureAuthenticate } from '@/shared/http/middleware/ensure-authenticate'
import { verifyRole } from '@/shared/http/middleware/verify-user-role'
import { FastifyInstance } from 'fastify'
import { createCarController } from './create-car-controller'
import { createCategoryController } from './create-category-controller'
import { createSpecificationController } from './create-specification-controller'
import { deleteCarController } from './delete-car-controller'
import { deleteCategoryController } from './delete-category-controller'
import { getCarController } from './get-car-controller'
import { getCarImageController } from './get-car-image-controller'
import { listCarsController } from './list-car-controller'
import { listCategoriesController } from './list-category-controller'
import { UpdateCarController } from './update-car-controller'
import { uploadsCarImagesController } from './upload-images-car-controller'

export async function carRoute(app: FastifyInstance): Promise<void> {
  app.get('/car/list', listCarsController)
  app.get('/category', listCategoriesController)

  // admin routes
  app.post(
    '/car',
    { onRequest: [ensureAuthenticate, verifyRole('ADMIN')] },
    createCarController,
  )
  app.patch(
    '/car/:carId',
    { onRequest: [ensureAuthenticate, verifyRole('ADMIN')] },
    UpdateCarController,
  )
  app.delete(
    '/car/:carId',
    { onRequest: [ensureAuthenticate, verifyRole('ADMIN')] },
    deleteCarController,
  )
  app.post(
    '/category',
    { onRequest: [ensureAuthenticate, verifyRole('ADMIN')] },
    createCategoryController,
  )
  app.delete(
    '/category/:id',
    { onRequest: [ensureAuthenticate, verifyRole('ADMIN')] },
    deleteCategoryController,
  )
  app.patch(
    '/car/specification/:carId',
    { onRequest: [ensureAuthenticate, verifyRole('ADMIN')] },
    createSpecificationController,
  )

  app.post(
    '/car/images/:id',
    { onRequest: [ensureAuthenticate, verifyRole('ADMIN')] },
    uploadsCarImagesController,
  )

  app.get('/car/image/:filename', getCarImageController)
  app.get('/car/:id', getCarController)
}
