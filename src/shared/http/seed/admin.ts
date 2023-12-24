import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt'

async function createAdmin() {
  await prisma.$connect()

  const hash_password = await hash('password', 8)

  await prisma.user.create({
    data: {
      name: 'admin',
      email: 'admin@email.com',
      driver_license: '',
      password: hash_password,
      avatar: '',
      role: 'ADMIN',
    },
  })

  await prisma.$disconnect()
}
createAdmin().then(() => console.log('admin created'))
