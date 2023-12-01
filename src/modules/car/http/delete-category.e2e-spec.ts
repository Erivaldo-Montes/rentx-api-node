import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Delete category', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be possible to delete a category', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const category = await prisma.category.create({
      data: {
        name: 'category',
        description: 'description',
      },
    })

    const response = await request(app.server)
      .delete(`/category/${category.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
  })
})
