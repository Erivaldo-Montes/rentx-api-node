import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { PostgresCarsRepository } from '@car/repositories/postgres/postgres-car-repository'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Upload images car', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be possible to upload many car images', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const carsRepository = new PostgresCarsRepository()
    const car = await carsRepository.create({
      name: 'Onix',
      brand: 'Chevrolet',
      about: '',
      license_plate: '12345',
      daily_rate: 1233,
      category_id: '1234',
    })

    const files = ['car_1.jpg', 'car_2.jpeg']

    const server = request(app.server).post(`/car/images/${car.id}`)

    for (const file of files) {
      server.attach('images', `src/utils/test/${file}`)
    }

    const response = await server.set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(201)
  })
})
