import { PostgresCategoriesRepository } from '@car/repositories/postgres/postgres-categories-repository'
import { CreateCategoryUseCase } from '../create-category-use-case'

export function makeCreateCategoryUseCase(): CreateCategoryUseCase {
  const categoryRepository = new PostgresCategoriesRepository()
  const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository)
  
  return createCategoryUseCase
}