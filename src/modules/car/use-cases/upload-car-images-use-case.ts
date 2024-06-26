import { IStorageProvider } from '@/shared/provider/storage/IStorageProvider'
import { MultipartFile } from '@fastify/multipart'
import { ICarsRepository } from '../repositories/ICars-repository'
import { CarNotExistError } from './errors/car-not-exist-error'

interface IRequest {
  car_id: string
  image: MultipartFile
}

export class UploadCarImagesUseCase {
  constructor(
    private carsRepository: ICarsRepository,
    private storage: IStorageProvider,
  ) {}

  async execute({ car_id, image }: IRequest): Promise<void> {
    const car = await this.carsRepository.findById(car_id)

    console.log(image)
    if (!car) {
      throw new CarNotExistError()
    }

    const filename = await this.storage.save(image, 'cars')

    await this.carsRepository.addImageFilename(filename, car_id)
  }
}
