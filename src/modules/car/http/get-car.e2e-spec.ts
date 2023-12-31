import { app } from '@/app'
import { PostgresCarsRepository } from '@car/repositories/postgres/postgres-car-repository'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('get car', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be possible to get a car', async () => {
    const carsRepository = new PostgresCarsRepository()

    const car = await carsRepository.create({
      name: 'Onix',
      brand: 'Chevrolet',
      about: '',
      daily_rate: 1222,
      category_id: '1234',
      license_plate: '1234',
    })
    const response = await request(app.server).get(`/car/${car.id}`).send()

    expect(response.status).toEqual(200)
    expect(response.body).toEqual(expect.objectContaining({ id: car.id }))
  })
})
