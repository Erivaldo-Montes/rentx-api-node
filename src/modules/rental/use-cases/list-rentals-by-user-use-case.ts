import { Rental } from '@prisma/client'
import { IRentalsRepository } from '@rental/repositories/IRentalsRepository'

export class ListRentalsByUserUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute(user_id: string): Promise<Rental[]> {
    // find rentals

    return await this.rentalsRepository.findAllRentalsByUser(user_id)
  }
}
