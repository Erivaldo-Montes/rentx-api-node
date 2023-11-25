import { app } from './app'
import { env } from './config/env'

app.listen({ port: env.PORT, host: '0.0.0.0' }, async (error, address) => {
  if (error) {
    throw error
  }
  console.log(`server is running on address ${address}`)
})
