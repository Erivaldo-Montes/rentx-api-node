import { InMemoryCarRepository } from '@car/repositories/in-memory/in-memory-car-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteCarUseCase } from './delete-car-use-case'
import { CarNotExistError } from './errors/car-not-exist-error'

let carsRepository: InMemoryCarRepository
let deleteCarUseCase: DeleteCarUseCase

describe('delete car use case', () => {
  beforeEach(() => {
    carsRepository = new InMemoryCarRepository()
    deleteCarUseCase = new DeleteCarUseCase(carsRepository)
  })

  it('Should be able to delete a car', async () => {
    const car = await carsRepository.create({
      name: 'Renault Kwid',
      brand: 'Renault',
      category_id: '123',
      daily_rate: 123,
      license_plate: '123',
      about: `The Renault Kwid is a popular entry-level hatchback produced by the French automaker Renault. It was first introduced in India in 2015 and has since gained popularity in various markets. The Kwid is known for its compact size, stylish design, and affordable pricing, making it a competitive option in the budget-friendly car segment.`
    })

    await deleteCarUseCase.execute(car.id)

    const carDeleted = await carsRepository.findById(car.id)

    expect(carDeleted).toBeNull()
  })

  it("Should not be able to delete a non exist car", async () => {
    await expect(() => {
      return deleteCarUseCase.execute('123')
    }).rejects.toBeInstanceOf(CarNotExistError)
  })
})