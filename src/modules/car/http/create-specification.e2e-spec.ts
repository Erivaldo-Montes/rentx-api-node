import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create specification', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a specification for a car', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const category = await prisma.category.create({
      data: {
        name: 'category',
        description: 'description',
      },
    })

    const car = await prisma.car.create({
      data: {
        name: 'name',
        brand: 'brand',
        about: 'car description',
        category_id: category.id,
        daily_rate: 120,
        license_plate: 'RTY-3442',
        available: true,
      },
    })

    const response = await request(app.server)
      .patch(`/car/specification/${car.id}`)
      .send({
        name: 'speed',
        description: '120 km/h',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(201)
  })
})
