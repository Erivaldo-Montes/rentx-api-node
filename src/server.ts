import './app'
import { app } from './app'

app.listen({ port: 3333, host: '0.0.0.0' }, async (error, address) => {
  if (error) {
    throw(error)
  }
  console.log(`server is running on address ${address}`)
})
