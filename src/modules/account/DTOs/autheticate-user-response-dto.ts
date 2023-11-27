import { User } from '@prisma/client'

export interface AuthenticateUserResponseDTO {
  user: Omit<User, 'password'>
  refresh_token: string
}
