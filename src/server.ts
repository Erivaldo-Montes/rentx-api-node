import { app } from './app'

app.listen({ port: 3333, host: '0.0.0.0' }, (error, address) => {
  if (error) {
    app.log.error(error)
  }

  console.log(`server is running on address ${address}`)
})
