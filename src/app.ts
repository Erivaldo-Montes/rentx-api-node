import { userRoute } from '@account/http/routes'
import { carRoute } from '@car/http/routes'
import fastifyJwt from '@fastify/jwt'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import Fastify from 'fastify'
import { ZodError } from 'zod'
import { jwtConfig } from './config/auth'

export const app = Fastify({
  logger: true
})

app.register(fastifyJwt, {
  secret: jwtConfig.secret
})

// swagger
app.register(swagger, {
  mode: 'static',
  specification: {
    path: './src/shared/documentation/swagger.json',
    postProcessor: (swaggerObject) => {
      return swaggerObject
    },
    baseDir: './src/shared/documentation/category.json',
  },
})

app.register(swaggerUI, {
  routePrefix: '/docs',
  
})

// eslint-disable-next-line @typescript-eslint/no-floating-promises
// routes
app.register(carRoute)
app.register(userRoute)

// error handler
app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'validation error', issue: error.format() })
  }if(error instanceof Error){
    console.error(error)
    return reply.status(400).send({message: error.message})
  }else {
    return reply.status(500).send({ message: 'internal server error' })
  }
})










