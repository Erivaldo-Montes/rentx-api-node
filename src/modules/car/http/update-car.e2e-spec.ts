import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Update car informations', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be possible to update car', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const car = await prisma.car.create({
      data: {
        name: 'car',
        about: 'description',
        brand: 'brand',
        category_id: '123',
        daily_rate: 123,
        license_plate: 'ERT-2334',
      },
    })

    const response = await request(app.server)
      .patch(`/car/${car.id}`)

      .send({
        name: 'car name',
        about: 'new description',
        category_id: '123',
        brand: 'brand',
        daily_rate: 120,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.id).toEqual(car.id)
    expect(response.body).toEqual(expect.objectContaining({ name: 'car name' }))
  })
})
