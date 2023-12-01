import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('list car', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able possible list car', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await prisma.car.create({
      data: {
        name: 'car 2',
        about: 'about car',
        brand: 'brand',
        category_id: 'category id',
        daily_rate: 122,
        license_plate: 'ABC_1234',
      },
    })

    await prisma.car.create({
      data: {
        name: 'car 1',
        about: 'about car',
        brand: 'brand',
        category_id: 'category id',
        daily_rate: 122,
        license_plate: 'ABC_1234',
      },
    })

    const response = await request(app.server)
      .get('/car/list')
      .set('Authorization', `Bearer ${token}`)
      .query({ page: 1 })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.cars).toHaveLength(2)
    expect(response.body.cars).toEqual([
      expect.objectContaining({ name: 'car 1' }),
      expect.objectContaining({ name: 'car 2' }),
    ])
  })
})
