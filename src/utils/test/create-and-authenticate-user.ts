import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

interface Response {
  token: string
}

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
): Promise<Response> {
  const user = await prisma.user.create({
    data: {
      name: 'user',
      email: 'user@email.com',
      driver_license: '123',
      password: await hash('123', 8),
      role: isAdmin ? 'ADMIN' : 'USER',
    },
  })

  const response = await request(app.server).post('/session').send({
    email: user.email,
    password: '123',
  })

  return {
    token: response.body.token,
  }
}
