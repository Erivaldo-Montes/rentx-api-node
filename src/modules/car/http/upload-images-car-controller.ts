import { makeUploadsCarImages } from '@car/use-cases/factories/make-upload-car-images-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function uploadsCarImagesController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const uploadCarImagesParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = uploadCarImagesParamsSchema.parse(request.params)

  const images = request.files()

  for await (const image of images) {
    const uploadCarImagesUseCase = makeUploadsCarImages()
    uploadCarImagesUseCase.execute({ car_id: id, image })
  }

  return reply.status(201).send()
}
