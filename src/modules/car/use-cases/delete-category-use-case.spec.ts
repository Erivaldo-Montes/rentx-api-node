import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCategoriesRepository } from '../repositories/in-memory/in-memory-categories-repository'
import { DeleteCategoryUseCase } from './delete-category-use-case'
import { CategoryNotExistError } from './errors/category-not-exist-error'

let deleteCategoryUseCase: DeleteCategoryUseCase
let categoriesRepository: InMemoryCategoriesRepository

describe("Delete category use case", () => {

  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    deleteCategoryUseCase= new DeleteCategoryUseCase(categoriesRepository)
  })

  it('Should be able to delete a category', async () => {
    const category = await categoriesRepository.create({
      name: 'SUV',
      description: `
        A sigla SUV significa Sport Utility Vehicle,
        Os carros dessa categoria costumam ser reconhecidos por 
        apresentarem porte robusto, interior espaçoso e por transitar com excelente desempenho na cidade ou no off-road.
        Além do espaço interior e porte avantajado, o que não pode faltar em um automóvel SUV é a tração nas quatro rodas, 
        o 4X4 que conhecemos. Os motoristas realmente são conquistados pelo alto desempenho dos veículos e pela segurança.
      `
    })

    await deleteCategoryUseCase.execute(category.id)

    const categoryDeleted = await categoriesRepository.findById(category.id)

    expect(categoryDeleted).toBeNull()
  })

  it("Should not be possible to delete a non-existing category", async () => {
    await expect(() => {
      return deleteCategoryUseCase.execute('id')
    }).rejects.toBeInstanceOf(CategoryNotExistError)
  })
})