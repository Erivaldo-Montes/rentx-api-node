import { CreateCategoryDTO } from '@car/DTOs/create-category-dto'
import { InMemoryCategoriesRepository } from '@car/repositories/in-memory/in-memory-categories-repository'
import { CreateCategoryUseCase } from '@car/use-cases/create-category-use-case'
import { beforeEach, describe, expect, it } from 'vitest'
import { CategoryAlreadyExistError } from './errors/category-already-exist-error'

let categoriesRepository: InMemoryCategoriesRepository
let createCategoryUseCase: CreateCategoryUseCase

describe('Create category use case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
  })

  it('Should be able to create a new category car', async () => {
    const category: CreateCategoryDTO = {
      name: 'SUV',
      description: `
        A sigla SUV significa Sport Utility Vehicle,
        Os carros dessa categoria costumam ser reconhecidos por 
        apresentarem porte robusto, interior espaçoso e por transitar com excelente desempenho na cidade ou no off-road.
        Além do espaço interior e porte avantajado, o que não pode faltar em um automóvel SUV é a tração nas quatro rodas, 
        o 4X4 que conhecemos. Os motoristas realmente são conquistados pelo alto desempenho dos veículos e pela segurança.
      `,
    }

    await createCategoryUseCase.execute(category)

    const categoryCreated = await categoriesRepository.findByName(category.name)

    expect(categoryCreated).not.toEqual(null)
    expect(categoryCreated).toHaveProperty('id')
  })

  it('Should not be able to create two category with same name', async () => {
    const category: CreateCategoryDTO = {
      name: 'SUV',
      description: `
        A sigla SUV significa Sport Utility Vehicle,
        Os carros dessa categoria costumam ser reconhecidos por 
        apresentarem porte robusto, interior espaçoso e por transitar com excelente desempenho na cidade ou no off-road.
        Além do espaço interior e porte avantajado, o que não pode faltar em um automóvel SUV é a tração nas quatro rodas, 
        o 4X4 que conhecemos. Os motoristas realmente são conquistados pelo alto desempenho dos veículos e pela segurança.
      `,
    }

    await createCategoryUseCase.execute(category)

    await expect(() => {
      return createCategoryUseCase.execute({
        name: 'SUV',
        description: 'A sigla SUV significa Sport Utility Vehicle',
      })
    }).rejects.toBeInstanceOf(CategoryAlreadyExistError)
  })
})
