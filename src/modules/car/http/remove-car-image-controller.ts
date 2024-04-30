import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { removeCarImage } from '@car/use-cases/factories/make-remove-car-image'

export async function removeCarImageController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const removeCarImageBodySchema = z.object({
    filename: z.string(),
  })

  const removeCarImageParamsSchema = z.object({
    car_id: z.string(),
  })

  const { filename } = removeCarImageBodySchema.parse(request.body)
  const { car_id } = removeCarImageParamsSchema.parse(request.params)
  const removeCarImageUseCase = removeCarImage()

  await removeCarImageUseCase.execute({ car_id, image_filename: filename })

  return reply.status(200).send()
}
