import { MultipartFile } from '@fastify/multipart'
import { Readable } from 'node:stream'

export interface IStorageProvider {
  save(avatar_file: MultipartFile, folder: string): Promise<string>
  delete(file: string, folder: string): Promise<void>
  get(filename: string, folder: string): Promise<Readable | undefined>
}
