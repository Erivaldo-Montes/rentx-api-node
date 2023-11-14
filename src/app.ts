import Fastify from 'fastify'

import { carRoute } from '@car/http/routes'
import { ZodError } from 'zod'

export const app = Fastify({
  logger: true
})

// eslint-disable-next-line @typescript-eslint/no-floating-promises
app.register(carRoute)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'validation error', issue: error.format() })
  }if(error instanceof Error){
    return reply.status(400).send({message: error.message})
  }else {
    return reply.status(500).send({ message: 'internal server error' })
  }
})
