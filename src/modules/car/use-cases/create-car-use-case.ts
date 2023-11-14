import { type ICarsRepository } from '@car/repositories/ICars-repository'
import { Car } from '@prisma/client'
import { CarAlreadyExistError } from './errors/car-already-exist-error'

interface IRequest {
  brand: string
  name: string
  about: string
  daily_rate: number
  license_plate: string
  category_id: string
}

export class CreateCarUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute({
    name,
    about,
    brand,
    category_id,
    daily_rate,
    license_plate,
  }: IRequest): Promise<Car> {
    const carAlreadyExist =
      await this.carsRepository.findByLicensePlate(license_plate)

    if (carAlreadyExist) {
      throw new CarAlreadyExistError()
    }

    const car = await this.carsRepository.create({
      name,
      about,
      brand,
      category_id,
      daily_rate,
      license_plate,
    })

    return car
  }
}
