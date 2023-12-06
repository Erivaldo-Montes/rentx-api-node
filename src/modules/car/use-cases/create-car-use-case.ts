import { ICarsRepository } from '@car/repositories/ICars-repository'
import { ICategoriesRepository } from '@car/repositories/ICategories-repository'
import { Car } from '@prisma/client'
import { CarAlreadyExistError } from './errors/car-already-exist-error'
import { CategoryNotExistError } from './errors/category-not-exist-error'

interface IRequest {
  brand: string
  name: string
  about: string
  daily_rate: number
  license_plate: string
  category_id: string
}

export class CreateCarUseCase {
  constructor(
    private carsRepository: ICarsRepository,
    private categoriesRepository: ICategoriesRepository,
  ) {}

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

    const categoryAlreadyExist =
      await this.categoriesRepository.findById(category_id)

    if (!categoryAlreadyExist) {
      throw new CategoryNotExistError()
    }

    const DAILY_RATE_IN_CENTS = daily_rate * 100

    const car = await this.carsRepository.create({
      name,
      about,
      brand,
      category_id,
      daily_rate: DAILY_RATE_IN_CENTS,
      license_plate,
    })

    return car
  }
}
