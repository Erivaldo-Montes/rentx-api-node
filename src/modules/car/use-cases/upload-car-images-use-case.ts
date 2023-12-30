import { env } from '@/config/env'
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

    if (!car) {
      throw new CarNotExistError()
    }

    const filename = await this.storage.save(image, 'cars')

    // eslint-disable-next-line prettier/prettier
    const imageUrl = String().concat(env.BASE_URL, "/car/image/", filename )

    await this.carsRepository.addImageUrl(imageUrl, car_id)
  }
}
