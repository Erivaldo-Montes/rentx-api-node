import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCarRepository } from '../repositories/in-memory/in-memory-car-repository'
import { CarNotExistError } from './errors/car-not-exist-error'
import { UpdateCarUseCase } from './update-car-use-case'

let carsRepository: InMemoryCarRepository
let updateCarUseCase: UpdateCarUseCase

describe('update car use case', () => {
  beforeEach(() => {
    carsRepository = new InMemoryCarRepository()
    updateCarUseCase = new UpdateCarUseCase(carsRepository)
  })

  it('Should be possible update car', async () => {
    const car = {
      name: 'Volkswagen Polo',
      brand: 'Volkswagen',
      about: '',
      category_id: '111',
      daily_rate: 120,
      license_plate: 'HAV-1231',
    }

    const carCreated = await carsRepository.create(car)

    await updateCarUseCase.execute({
      id: carCreated.id,
      name: 'Polo',
      brand: car.brand,
      about: car.about,
      category_id: car.category_id,
      daily_rate: car.daily_rate,
    })

    const carUpdated = await carsRepository.findById(carCreated.id)

    expect(carUpdated).toEqual(expect.objectContaining({ name: 'Polo' }))
    expect(carUpdated).toEqual(expect.objectContaining({ id: carCreated.id }))
  })

  it('Should not be possible update non-existing', async () => {
    await expect(() => {
      return updateCarUseCase.execute({
        id: 'non-existing',
        name: 'non-existing name',
        brand: 'non-existing brand',
        about: 'non-exiting about',
        category_id: 'non-existing category',
        daily_rate: 1,
      })
    }).rejects.toBeInstanceOf(CarNotExistError)
  })
})
