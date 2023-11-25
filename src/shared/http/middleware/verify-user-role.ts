import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyRole(verifyRole: 'ADMIN' | 'USER') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (role !== verifyRole) {
      return reply.status(401).send({ message: 'Unauthorized' })
    }
  }
}
