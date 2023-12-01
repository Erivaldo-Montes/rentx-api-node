import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('create car controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a car', async () => {
    const auth = await createAndAuthenticateUser(app, true)

    const category = await prisma.category.create({
      data: {
        name: 'category',
        description: 'description',
      },
    })

    const response = await request(app.server)
      .post('/car')
      .send({
        name: 'car name',
        brand: 'car brand',
        about: 'car description',
        daily_rate: 100,
        license_plate: '123',
        category_id: category.id,
      })
      .set('Authorization', `Bearer ${auth.token}`)

    expect(response.body).toEqual(
      expect.objectContaining({ id: expect.any(String) }),
    )
    expect(response.status).toEqual(201)
  })
})
