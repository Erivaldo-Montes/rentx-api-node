import { ICarsRepository } from '@car/repositories/ICars-repository'
import { Car } from '@prisma/client'
import { CarNotExistError } from './errors/car-not-exist-error'

export class GetCarUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute(id: string): Promise<Car> {
    const car = await this.carsRepository.findById(id)

    if (!car) {
      throw new CarNotExistError()
    }

    return car
  }
}
