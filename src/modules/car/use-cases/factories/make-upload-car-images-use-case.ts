import { LocalStorageProvider } from '@/shared/provider/storage/local-storage-provider'
import { PostgresCarsRepository } from '@car/repositories/postgres/postgres-car-repository'
import { UploadCarImagesUseCase } from '../upload-car-images-use-case'

export function makeUploadsCarImages() {
  const carsRepository = new PostgresCarsRepository()
  const storage = new LocalStorageProvider()
  const uploadCarImagesUseCase = new UploadCarImagesUseCase(
    carsRepository,
    storage,
  )

  return uploadCarImagesUseCase
}
