import { FastifyReply, FastifyRequest } from 'fastify'
import { makeListRentalsByUser } from '../use-cases/factories/list-rentals-by-user'

export async function listRentalsByUserController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const { sub } = request.user

  const listRentalsByUserUseCase = makeListRentalsByUser()

  const rentals = await listRentalsByUserUseCase.execute(sub)

  return reply.status(200).send(rentals)
}
