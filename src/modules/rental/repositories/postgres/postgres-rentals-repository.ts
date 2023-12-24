import { prisma } from '@/lib/prisma'
import { Prisma, Rental } from '@prisma/client'
import { IRentalsRepository } from '../IRentalsRepository'

export class PostgresRentalsRepository implements IRentalsRepository {
  async create({
    user_id,
    end_date,
    start_date,
    total,
    car_id,
  }: Prisma.RentalUncheckedCreateInput): Promise<Rental> {
    return await prisma.rental.create({
      data: {
        end_date,
        start_date,
        total,
        user_id,
        car_id,
        update_at: new Date(),
      },
    })
  }

  async findById(id: string): Promise<Rental | null> {
    return await prisma.rental.findFirst({
      where: {
        id,
      },
    })
  }
}
