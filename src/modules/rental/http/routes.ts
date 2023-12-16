import { ensureAuthenticate } from '@/shared/http/middleware/ensure-authenticate'
import { FastifyInstance } from 'fastify'
import { createCarRentalController } from './create-car-rental-controller'

export async function rentRoute(app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', ensureAuthenticate)
  app.post('/rent', createCarRentalController)
}
