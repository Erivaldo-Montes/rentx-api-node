import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import dayjs from 'dayjs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('create car rental', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be possible to create a rent for a car', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const car = await prisma.car.create({
      data: {
        name: 'Onix',
        brand: 'Chevrolet',
        about: '',
        category_id: '123',
        available: true,
        daily_rate: 120,
        license_plate: '233e',
      },
    })
    const response = await request(app.server)
      .post('/rent')
      .set('Authorization', `Bearer ${token}`)
      .send({
        car_id: car.id,
        start_date: dayjs().toString(),
        end_date: dayjs().add(7, 'days').toString(),
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(expect.objectContaining({ car_id: car.id }))
  })
})
