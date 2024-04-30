import { IStorageProvider } from '@/shared/provider/storage/IStorageProvider'
import { ICarsRepository } from '../repositories/ICars-repository'
import { CarNotExistError } from './errors/car-not-exist-error'

interface IRequest {
  car_id: string
  image_filename: string
}

export class RemoveCarImageUseCase {
  constructor(
    private carsRepository: ICarsRepository,
    private storage: IStorageProvider,
  ) {}

  async execute({ car_id, image_filename }: IRequest) {
    const car = await this.carsRepository.findById(car_id)

    if (!car) {
      throw new CarNotExistError()
    }

    await this.storage.delete(image_filename, 'cars')

    await this.carsRepository.removeImage(image_filename, car_id)
  }
}
