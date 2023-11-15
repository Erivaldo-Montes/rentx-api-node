import { InMemoryCarRepository } from '@car/repositories/in-memory/in-memory-car-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateCarUseCase } from './create-car-use-case'
import { CarAlreadyExistError } from './errors/car-already-exist-error'

let carsRepository: InMemoryCarRepository
let createCarUseCase: CreateCarUseCase

describe('Car', () => {
  beforeEach(() => {
    carsRepository = new InMemoryCarRepository()
    createCarUseCase = new CreateCarUseCase(carsRepository)
  })

  it('Should be able create a car', async () => {
    const response = await createCarUseCase.execute({
      name: 'car name',
      about: 'car description',
      brand: 'car brand',
      category_id: '1212',
      daily_rate: 123,
      license_plate: '23123'
    })

    expect(response).toHaveProperty('id')
  })

  it("should not be able create two cars with same license plate", async () => {
    await carsRepository.create({
      name: 'car 1',
      brand: 'brand',
      category_id: '123',
      daily_rate: 123.12,
      license_plate: '123d',
      about: '',
    })

    const response = await createCarUseCase.execute({
      name: 'car 2',
      brand: 'brand 2',
      category_id: '1232',
      daily_rate: 1241,
      license_plate: '123d',
      about: 'asdas',
    })

    expect(response).rejects.toBeInstanceOf(CarAlreadyExistError)

  })
})
