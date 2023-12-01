import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('list category', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be possible to list categories', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await prisma.category.create({
      data: {
        name: 'SUV',
        description: 'description',
      },
    })
    await prisma.category.create({
      data: {
        name: 'sedan',
        description: 'description',
      },
    })

    const response = await request(app.server)
      .get('/category')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.body.categories).toHaveLength(2)
    expect(response.statusCode).toEqual(200)
    expect(response.body.categories).toEqual([
      expect.objectContaining({ name: 'SUV' }),
      expect.objectContaining({ name: 'sedan' }),
    ])
  })
})
