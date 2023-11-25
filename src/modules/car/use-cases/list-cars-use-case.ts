import { ListCarsDTO } from '@car/DTOs/list-cars-dto'
import { Car } from '@prisma/client'
import { ICarsRepository } from '../repositories/ICars-repository'

export class ListCarsUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute({ page }: ListCarsDTO): Promise<Car[]> {
    return await this.carsRepository.list({ page })
  }
}
