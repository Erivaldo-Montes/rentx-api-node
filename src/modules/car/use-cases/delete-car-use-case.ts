import { ICarsRepository } from '@car/repositories/ICars-repository'
import { CarNotExistError } from './errors/car-not-exist-error'

export class DeleteCarUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute(car_id: string): Promise<void> {
    const carAlreadyExist = await this.carsRepository.findById(car_id)

    if (!carAlreadyExist) {
      throw new CarNotExistError()
    }

    this.carsRepository.delete(car_id)
  }
}
