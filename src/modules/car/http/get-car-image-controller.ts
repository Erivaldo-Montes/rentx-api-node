import { makeGetCarImageUseCase } from '@car/use-cases/factories/make-get-car-image-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getCarImageController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const getImageParamsSchema = z.object({
    filename: z.string(),
  })

  const { filename } = getImageParamsSchema.parse(request.params)

  console.log('=================== filename', request.params)

  const getCarImageUseCase = makeGetCarImageUseCase()
  const image = await getCarImageUseCase.execute(filename)

  return reply.status(200).send(image)
}
