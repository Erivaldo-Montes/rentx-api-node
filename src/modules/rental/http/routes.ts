import { ensureAuthenticate } from '@/shared/http/middleware/ensure-authenticate'
import { FastifyInstance } from 'fastify'
import { carReturnController } from './car-return-controller'
import { createCarRentalController } from './create-car-rental-controller'
import { listRentalsByUserController } from './list-rentals-by-user-controller'

export async function rentRoute(app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', ensureAuthenticate)
  app.post('/rent', createCarRentalController)
  app.patch('/rent', carReturnController)
  app.get('/rent', listRentalsByUserController)
}
