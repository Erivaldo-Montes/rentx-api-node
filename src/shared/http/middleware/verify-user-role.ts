import { PostgresUsersRepository } from '@account/repositories/postgres/postgres-users-repository'
import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyRole(verifyRole: 'ADMIN' | 'USER') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role, sub } = request.user

    const usersRepository = new PostgresUsersRepository()
    const user = await usersRepository.findById(sub)

    if (role !== verifyRole || !user) {
      return reply.status(401).send({ message: 'Unauthorized' })
    }
  }
}
