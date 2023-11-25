import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCarRepository } from '../repositories/in-memory/in-memory-car-repository'
import { ListCarsUseCase } from './list-cars-use-case'

let carsRepository: InMemoryCarRepository
let listCarsUseCase: ListCarsUseCase

describe('List car use case', () => {
  beforeEach(() => {
    carsRepository = new InMemoryCarRepository()
    listCarsUseCase = new ListCarsUseCase(carsRepository)
  })

  it('Should be possible to list car', async () => {
    await carsRepository.create({
      name: 'car 1',
      brand: 'brand 1',
      about: '',
      category_id: '1',
      daily_rate: 122,
      license_plate: 'AGF-8874',
    })
    await carsRepository.create({
      name: 'car 2',
      brand: 'brand 2',
      about: '',
      category_id: '1',
      daily_rate: 122,
      license_plate: 'AGF-8234',
    })

    const cars = await listCarsUseCase.execute({ page: 1 })

    console.log(cars)

    expect(cars).toEqual([
      expect.objectContaining({ name: 'car 1' }),
      expect.objectContaining({ name: 'car 2' }),
    ])
  })

  it('Should be possible to list car by page', async () => {
    await carsRepository.create({
      name: 'car 1',
      brand: 'brand 1',
      about: '',
      category_id: '1',
      daily_rate: 122,
      license_plate: 'AGF-8874',
    })
    await carsRepository.create({
      name: 'car 2',
      brand: 'brand 2',
      about: '',
      category_id: '1',
      daily_rate: 122,
      license_plate: 'AGF-8234',
    })

    await carsRepository.create({
      name: 'car 3',
      brand: 'brand 3',
      about: '',
      category_id: '1',
      daily_rate: 122,
      license_plate: 'AGF-8822',
    })

    const cars = await listCarsUseCase.execute({ page: 2 })

    console.log(cars)

    expect(cars).toEqual([expect.objectContaining({ name: 'car 3' })])
  })
})
