import { MultipartFile } from '@fastify/multipart'
export interface IStorageProvider {
  save(avatar_file: MultipartFile, folder: string): Promise<string>
  delete(file: string, folder: string): Promise<void>
}
