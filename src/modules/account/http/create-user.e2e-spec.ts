import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('create profile e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a user', async () => {
    const createUserResponse = await request(app.server).post('/user').send({
      name: 'jhon doe',
      email: 'jhon@email.com',
      driver_license: '1234567',
      password: 'password',
    })

    expect(createUserResponse.statusCode).toEqual(201)
    expect(createUserResponse.body.id).toEqual(expect.any(String))
  })
})
