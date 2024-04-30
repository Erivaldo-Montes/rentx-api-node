import { ICarsRepository } from '@car/repositories/ICars-repository'
import { CarNotExistError } from './errors/car-not-exist-error'
import { IStorageProvider } from '@/shared/provider/storage/IStorageProvider'

export class DeleteCarUseCase {
  constructor(
    private carsRepository: ICarsRepository,
    private storage: IStorageProvider,
  ) {}

  async execute(car_id: string): Promise<void> {
    const carAlreadyExist = await this.carsRepository.findById(car_id)

    if (!carAlreadyExist) {
      throw new CarNotExistError()
    }

    if (carAlreadyExist.images_filenames.length !== 0) {
      for (const filename of carAlreadyExist.images_filenames) {
        console.log('file', filename)
        await this.storage.delete(filename, 'cars')
      }
    }

    this.carsRepository.delete(car_id)
  }
}
