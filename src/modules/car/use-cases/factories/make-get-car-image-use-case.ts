import { LocalStorageProvider } from '@/shared/provider/storage/local-storage-provider'
import { GetCarImageUseCase } from '../get-car-image-use-case'

export function makeGetCarImageUseCase() {
  const storage = new LocalStorageProvider()
  const getCarImageUseCase = new GetCarImageUseCase(storage)
  return getCarImageUseCase
}
