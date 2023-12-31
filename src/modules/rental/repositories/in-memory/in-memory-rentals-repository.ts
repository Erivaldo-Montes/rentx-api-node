import { Prisma, Rental } from '@prisma/client'
import { randomUUID } from 'crypto'
import dayjs from 'dayjs'
import { IRentalsRepository } from '../IRentalsRepository'

export class InMemoryRentalsRepository implements IRentalsRepository {
  rentals: Rental[] = []

  async create({
    user_id,
    end_date,
    start_date,
    total,
    car_id,
  }: Prisma.RentalUncheckedCreateInput): Promise<Rental> {
    const rental: Rental = {
      id: randomUUID(),
      car_id,
      user_id,
      start_date: dayjs(start_date).toDate(),
      end_date: dayjs(end_date).toDate(),
      total,
      created_at: dayjs().toDate(),
      update_at: dayjs().toDate(),
    }

    this.rentals.push(rental)

    return rental
  }

  async findByUserId(id: string): Promise<Rental | null> {
    const rent = this.rentals.find((item) => item.user_id === id)

    if (!rent) {
      return null
    }

    return rent
  }

  async findById(id: string): Promise<Rental | null> {
    const rent = this.rentals.find((item) => item.id === id)

    if (!rent) {
      return null
    }

    return rent
  }

  async findAllRentalsByUser(user_id: string): Promise<Rental[]> {
    return this.rentals.filter((items) => items.user_id === user_id)
  }
}
