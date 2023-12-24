import { Prisma, Rental } from '@prisma/client'

export interface IRentalsRepository {
  create({
    user_id,
    end_date,
    start_date,
    total,
    car_id,
  }: Prisma.RentalUncheckedCreateInput): Promise<Rental>

  findById(id: string): Promise<Rental | null>
}
