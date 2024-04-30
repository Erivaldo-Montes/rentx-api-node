import { Car, Prisma } from '@prisma/client'
import { ListCarsDTO } from '../DTOs/list-cars-dto'
import { UpdateCarDTO } from '../DTOs/update-car-dto'

export interface ICarsRepository {
  create: (car: Omit<Prisma.CarCreateInput, 'available'>) => Promise<Car>
  update: ({
    id,
    name,
    about,
    brand,
    daily_rate,
    category_id,
    available,
  }: UpdateCarDTO) => Promise<Car>
  findByLicensePlate: (license_plate: string) => Promise<Car | null>
  findById(id: string): Promise<Car | null>
  delete(id: string): Promise<void>
  list({ page }: ListCarsDTO): Promise<Car[]>
  addImageFilename(image_filename: string, id: string): Promise<void>
  removeImage(image_filename: string, car_id: string): Promise<void>
}
