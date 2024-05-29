import { GetCategoryUseCase } from '../get-category-use-case'
import { PostgresCategoriesRepository } from '@car/repositories/postgres/postgres-categories-repository'

export function makeGetCategoryUseCase() {
  const categoryRepository = new PostgresCategoriesRepository()
  const getCategoryUseCase = new GetCategoryUseCase(categoryRepository)

  return getCategoryUseCase
}
