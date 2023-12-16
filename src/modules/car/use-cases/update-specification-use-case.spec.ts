import { beforeEach, describe, expect, it } from 'vitest'
import { InMemorySpecificationRepository } from '../repositories/in-memory/in-memory-specifications-repository'
import { SpecificationNotExistingError } from './errors/specification-not-existing-error'
import { UpdateSpecificationUseCase } from './update-specification-use-case'

let updateSpecificationUseCase: UpdateSpecificationUseCase
let specificationsRepository: InMemorySpecificationRepository

describe('Update specification use case', () => {
  beforeEach(() => {
    specificationsRepository = new InMemorySpecificationRepository()
    updateSpecificationUseCase = new UpdateSpecificationUseCase(
      specificationsRepository,
    )
  })

  it('Should be possible to update specification', async () => {
    await specificationsRepository.create({
      name: 'velocity',
      description: '120 km/h',
      car_id: '123',
    })

    const specification = await specificationsRepository.findByCar(
      '123',
      'velocity',
    )

    await updateSpecificationUseCase.execute({
      id: specification!.id,
      name: 'speed',
      description: '120 km/h',
    })

    const specificationUpdated = await specificationsRepository.findById(
      specification!.id,
    )

    expect(specificationUpdated).toEqual(
      expect.objectContaining({ name: 'speed' }),
    )
    expect(specificationUpdated).toEqual(
      expect.objectContaining({ description: '120 km/h' }),
    )
    expect(specificationUpdated?.id).toEqual(specification?.id)
  })

  it('Should not be possible to update non-existing specification', async () => {
    await specificationsRepository.create({
      name: 'velocity',
      description: '120 km/h',
      car_id: '12ad-das23-sda3-b341',
    })

    await expect(() => {
      return updateSpecificationUseCase.execute({
        id: '0000-000-000-0000',
        name: 'speed',
        description: '120 km/h',
      })
    }).rejects.toBeInstanceOf(SpecificationNotExistingError)
  })
})
