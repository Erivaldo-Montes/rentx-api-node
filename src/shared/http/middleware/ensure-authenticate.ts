import { FastifyReply, FastifyRequest } from 'fastify'

interface jwtPayload {
  role: 'USER' | 'ADMIN'
  sub: 'string'
}

export async function ensureAuthenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    console.log(request.headers.authorization)
    const user = (await request.jwtVerify()) as jwtPayload
    request.user.role = user.role
    request.user.sub = user.sub
    if (!user.sub) {
      throw new Error()
    }
  } catch (error) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}
