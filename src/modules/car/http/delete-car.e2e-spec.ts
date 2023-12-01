import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Delete car', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to delete a car', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const car = await prisma.car.create({
      data: {
        name: 'nama',
        brand: 'brand',
        about: 'car  description',
        daily_rate: 120,
        license_plate: 'ADN-8773',
        category_id: 'asdasd',
      },
    })

    const response = await request(app.server)
      .delete(`/car/${car.id}`)
      .send()
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
  })
})
