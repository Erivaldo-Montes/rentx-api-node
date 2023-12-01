import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate user', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('Should be able authenticate user', async () => {
    await request(app.server).post('/user').send({
      name: 'user',
      email: 'user@email.com',
      driver_license: '123',
      password: '123',
    })

    const response = await request(app.server).post('/session').send({
      email: 'user@email.com',
      password: '123',
    })

    expect(response.status).toEqual(200)
    expect(response.body.token).toEqual(expect.any(String))
    expect(response.body.refresh_token).toEqual(expect.any(String))
  })
})
