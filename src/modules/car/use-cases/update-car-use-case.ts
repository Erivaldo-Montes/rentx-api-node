import { UpdateCarDTO } from '@car/DTOs/update-car-dto'
import { Car } from '@prisma/client'
import { ICarsRepository } from '../repositories/ICars-repository'
import { CarNotExistError } from './errors/car-not-exist-error'

export class UpdateCarUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute({
    id,
    name,
    brand,
    about,
    category_id,
    daily_rate,
    available = true,
  }: UpdateCarDTO): Promise<Car> {
    const car = await this.carsRepository.findById(id)

    if (!car) {
      throw new CarNotExistError()
    }

    const carUpdate = await this.carsRepository.update({
      id,
      name,
      about,
      brand,
      category_id,
      daily_rate,
      available,
    })

    return carUpdate
  }
}
