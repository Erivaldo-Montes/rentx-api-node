import { ICarsRepository } from '@car/repositories/ICars-repository'
import { type ISpecificationsRepository } from '@car/repositories/ISpecifications-repository'
import { CarNotExistError } from './errors/car-not-exist-error'
import { SpecificationAlreadyExistError } from './errors/specification-already-exist-error'

interface IRequest {
  car_id: string
  name: string
  description: string
}

export class CreateSpecificationUseCase {
  constructor(
    private specificationsRepository: ISpecificationsRepository,
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ name, description, car_id }: IRequest): Promise<void> {
    const car = await this.carsRepository.findById(car_id)

    if (!car) {
      throw new CarNotExistError()
    }

    const specificationAlreadyExist =
      await this.specificationsRepository.findByCar(car.id, name)

    if (specificationAlreadyExist) {
      throw new SpecificationAlreadyExistError()
    }

    await this.specificationsRepository.create({ name, description, car_id })
  }
}
