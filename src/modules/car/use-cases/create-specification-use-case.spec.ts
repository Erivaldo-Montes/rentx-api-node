import { InMemoryCarRepository } from '@car/repositories/in-memory/in-memory-car-repository'
import { InMemorySpecificationRepository } from '@car/repositories/in-memory/in-memory-specifications-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateSpecificationUseCase } from './create-specification-use-case'
import { CarNotExistError } from './errors/car-not-exist-error'
import { SpecificationAlreadyExistError } from './errors/specification-already-exist-error'
let specificationRepository: InMemorySpecificationRepository
let createSpecificationUseCase: CreateSpecificationUseCase
let carsRepository: InMemoryCarRepository

describe('create specification use case', () => {
  beforeEach(() => {
    specificationRepository = new InMemorySpecificationRepository()
    carsRepository = new InMemoryCarRepository()
    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationRepository,
      carsRepository,
    )
  })

  it('Should be able create a new specification', async () => {
    const specification = {
      name: 'velocity',
      description: '120 km/h',
    }

    const car = await carsRepository.create({
      name: 'HB20S 2024',
      brand: ' Hyundai ',
      daily_rate: 120.0,
      category_id: '123',
      license_plate: '1231',
      about: '',
    })

    await createSpecificationUseCase.execute({
      name: specification.name,
      description: specification.description,
      car_id: car.id,
    })

    const specificationResult = await specificationRepository.findByCar(
      car.id,
      specification.name,
    )

    expect(specificationResult?.car_id).toEqual(car.id)
    expect(specificationResult).toHaveProperty('id')
  })

  it('Should not be possible to create a specification on a non-existing car', async () => {
    const specification = {
      name: 'velocity',
      description: '120 km/h',
    }

    await expect(() => {
      return createSpecificationUseCase.execute({
        name: specification.name,
        description: specification.description,
        car_id: 'non-existing car',
      })
    }).rejects.toBeInstanceOf(CarNotExistError)
  })

  it('Should not be possible to create two specification with same name', async () => {
    const car = await carsRepository.create({
      name: 'HB20S 2024',
      brand: ' Hyundai ',
      daily_rate: 120.0,
      category_id: '123',
      license_plate: '1231',
      about: '',
    })

    await createSpecificationUseCase.execute({
      name: 'SUV',
      description: 'description',
      car_id: car.id,
    })

    await expect(() => {
      return createSpecificationUseCase.execute({
        name: 'SUV',
        description: 'description',
        car_id: car.id,
      })
    }).rejects.toBeInstanceOf(SpecificationAlreadyExistError)
  })
})
