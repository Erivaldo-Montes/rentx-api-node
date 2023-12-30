import { IStorageProvider } from '@/shared/provider/storage/IStorageProvider'
import { Readable } from 'node:stream'

export class GetCarImageUseCase {
  constructor(private storage: IStorageProvider) {}

  async execute(filename: string): Promise<Readable | undefined> {
    return await this.storage.get(filename, 'cars')
  }
}
