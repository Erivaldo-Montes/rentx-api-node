import { PostgresCarsRepository } from '@car/repositories/postgres/postgres-car-repository'
import { DeleteCarUseCase } from '../delete-car-use-case'
import { LocalStorageProvider } from '@/shared/provider/storage/local-storage-provider'

export function makeDeleteCarUseCase(): DeleteCarUseCase {
  const carsRepository = new PostgresCarsRepository()
  const storage = new LocalStorageProvider()
  const deleteCarUseCase = new DeleteCarUseCase(carsRepository, storage)

  return deleteCarUseCase
}
