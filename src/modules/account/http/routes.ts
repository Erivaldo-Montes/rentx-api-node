import { FastifyInstance } from "fastify";
import { createUserController } from './create-user-controller';

export async function userRoute(app: FastifyInstance): Promise<void> {
  app.post('/user', createUserController)
}