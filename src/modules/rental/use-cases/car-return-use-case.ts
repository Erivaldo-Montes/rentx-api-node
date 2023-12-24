import { ICarsRepository } from '@car/repositories/ICars-repository'
import { CarNotExistError } from '@car/use-cases/errors/car-not-exist-error'
import { IRentalsRepository } from '@rental/repositories/IRentalsRepository'
import { RentNotFoundError } from './error/rent-not-found-error'

export class ReturnCarUseCase {
  constructor(
    private rentalsRepository: IRentalsRepository,
    private carsRepository: ICarsRepository,
  ) {}

  async execute(rental_id: string) {
    // find rent by id
    const rent = await this.rentalsRepository.findById(rental_id)

    if (!rent) {
      throw new RentNotFoundError()
    }

    // find car by id
    const car = await this.carsRepository.findById(rent.car_id)

    if (!car) {
      throw new CarNotExistError()
    }

    // update car availability
    await this.carsRepository.update({
      id: car.id,
      name: car.name,
      about: car.about ?? '',
      available: true,
      brand: car.brand,
      category_id: car.category_id,
      daily_rate: car.daily_rate,
    })
  }
}
