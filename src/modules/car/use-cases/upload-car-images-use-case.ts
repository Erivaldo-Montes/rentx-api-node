import { } from '@fastify/multipart'
import { ICarsRepository } from '../repositories/ICars-repository'

interface IRequest {
  car_id: string
  image: ReadableStream
}

export class UploadCarImagesUseCase {
  constructor(
    private carsRepository: ICarsRepository,
    private storage,
  ) {}

  async execute({ car_id, image }: IRequest) {
    const car = await this.carsRepository.findById(car_id)
  }
}
