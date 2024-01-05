import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import fs from 'fs'
import { resolve } from 'path'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('update avatar controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be possible to update avatar profile', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const path = resolve(__dirname, '..', '..', '..', 'utils', 'test')

    const avatar = fs.readFileSync(`${path}/avatar-test.jpg`)

    const response = await request(app.server)
      .post('/user/avatar')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', avatar)
    console.log('upload', response.body)

    expect(response.statusCode).toEqual(201)
  })
})
