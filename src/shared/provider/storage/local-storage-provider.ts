import { MultipartFile } from '@fastify/multipart'
import { randomBytes } from 'crypto'
import fs from 'node:fs'
import { pipeline } from 'node:stream'
import util from 'node:util'
import { resolve } from 'path'
import { Readable } from 'stream'
import { IStorageProvider } from './IStorageProvider'

export class LocalStorageProvider implements IStorageProvider {
  async save(avatar_file: MultipartFile, folder: string): Promise<string> {
    const pump = util.promisify(pipeline)
    const tmp_folder = resolve(__dirname, '..', '..', '..', '..', 'tmp', folder)

    const hash_name = randomBytes(16).toString('hex')

    avatar_file.filename = `${hash_name}-${avatar_file.filename}`

    await pump(
      avatar_file.file,
      fs.createWriteStream(`${tmp_folder}/${avatar_file.filename}`),
    )

    return avatar_file.filename
  }

  async delete(file: string, folder: string): Promise<void> {
    const tmp_folder = resolve(__dirname, '..', '..', '..', '..', 'tmp', folder)
    const filename = resolve(`${tmp_folder}`, file)
    console.log('filename', filename)
    try {
      await fs.promises.stat(filename)
    } catch (error) {
      console.log(error)
      return
    }

    await fs.promises.unlink(filename)
  }

  async get(filename: string, folder: string): Promise<Readable | undefined> {
    const tmp_folder = resolve(__dirname, '..', '..', '..', '..', 'tmp', folder)

    try {
      await fs.promises.stat(`${tmp_folder}/${filename}`)
      const file = fs.createReadStream(`${tmp_folder}/${filename}`)
      return file
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
