import { InMemoryCarRepository } from '@car/repositories/in-memory/in-memory-car-repository'
import { InMemoryCategoriesRepository } from '@car/repositories/in-memory/in-memory-categories-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateCarUseCase } from './create-car-use-case'
import { CarAlreadyExistError } from './errors/car-already-exist-error'
import { CategoryNotExistError } from './errors/category-not-exist-error'

let carsRepository: InMemoryCarRepository
let createCarUseCase: CreateCarUseCase
let categoryRepository: InMemoryCategoriesRepository

describe('Car', () => {
  beforeEach(() => {
    carsRepository = new InMemoryCarRepository()
    categoryRepository = new InMemoryCategoriesRepository()
    createCarUseCase = new CreateCarUseCase(carsRepository, categoryRepository)
  })

  it('Should be able create a car', async () => {
    await categoryRepository.create({
      name: 'hatchback',
      description: 'Um carro hatchback é um tipo de carroceria de automóvel que se caracteriza por ter uma área de carga integrada ao compartimento de passageiros, sem uma divisão rígida entre os dois.'
    })

    const category = await categoryRepository.findByName('hatchback')

    const response = await createCarUseCase.execute({
      name: 'Fiat Argo',
      about: 'O Fiat Argo é um modelo de carro compacto produzido pela fabricante italiana Fiat. Ele foi projetado para ser um hatchback subcompacto e foi lançado no mercado para competir nesse segmento',
      brand: 'Fiat',
      category_id: category!.id,
      daily_rate: 123,
      license_plate: '23123'
    })

    expect(response).toHaveProperty('id')
  })

  it("should not be able create two cars with same license plate", async () => {

    await categoryRepository.create({
      name: 'hatchback',
      description: 'Um carro hatchback é um tipo de carroceria de automóvel que se caracteriza por ter uma área de carga integrada ao compartimento de passageiros, sem uma divisão rígida entre os dois.'
    })

    const category = await categoryRepository.findByName('hatchback')

    await createCarUseCase.execute({
      name: 'Fiat Argo',
      brand: 'Fiat',
      category_id: category!.id,
      daily_rate: 120,
      license_plate: '123d',
      about: 'O Fiat Argo é um modelo de carro compacto produzido pela fabricante italiana Fiat. Ele foi projetado para ser um hatchback subcompacto e foi lançado no mercado para competir nesse segmento',
    })

    await expect(() => {
     return createCarUseCase.execute({
        name: 'Onix Plus',
        brand: 'Chevrolet',
        category_id: category!.id,
        daily_rate: 90,
        license_plate: '123d',
        about: 'O Chevrolet Onix Plus é um sedã compacto produzido pela fabricante de automóveis norte-americana Chevrolet.',
      })
    }).rejects.toBeInstanceOf(CarAlreadyExistError)
  })

  it("should not be possible to create a car without a category.", async () => {
    await expect(() => {
      return  createCarUseCase.execute({
        name: 'Fiat Argo',
        brand: 'Fiat',
        category_id: '',
        daily_rate: 124,
        license_plate: '123d',
        about: '',
      })
    }).rejects.toBeInstanceOf(CategoryNotExistError)
  })
})
