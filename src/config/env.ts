import 'dotenv/config'
import { z } from 'zod'

const schema = z.object({
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
  REFRESH_TOKEN_EXPIRES_IN_DAYS: z.coerce.number(),
})

const _env = schema.safeParse(process.env)

if (_env.success === false) {
  console.log('Invalid environment variable', _env.error.format())
  throw new Error('Invalid environment variable')
}

export const env = _env.data
