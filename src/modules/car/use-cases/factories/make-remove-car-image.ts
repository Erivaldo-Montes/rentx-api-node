import { PostgresCarsRepository } from '@car/repositories/postgres/postgres-car-repository'
import { RemoveCarImageUseCase } from '../remove-car-image-use-case'
import { LocalStorageProvider } from '@/shared/provider/storage/local-storage-provider'

export function removeCarImage(): RemoveCarImageUseCase {
  const carsRepository = new PostgresCarsRepository()
  const storage = new LocalStorageProvider()
  const removeCarImage = new RemoveCarImageUseCase(carsRepository, storage)

  return removeCarImage
}
