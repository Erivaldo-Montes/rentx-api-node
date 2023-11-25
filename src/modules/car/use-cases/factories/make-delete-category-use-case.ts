import { PostgresCategoriesRepository } from '../../repositories/postgres/postgres-categories-repository'
import { DeleteCategoryUseCase } from '../delete-category-use-case'

export function makeDeleteCategoryUseCase(): DeleteCategoryUseCase {
  const categoriesRepository = new PostgresCategoriesRepository()
  const deleteCategoriesUseCase = new DeleteCategoryUseCase(
    categoriesRepository,
  )

  return deleteCategoriesUseCase
}
