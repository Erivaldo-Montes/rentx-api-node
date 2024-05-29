import { ICategoriesRepository } from '@car/repositories/ICategories-repository'
import { CategoryAlreadyExistError } from './errors/category-already-exist-error'

export class GetCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute(id: string) {
    const category = await this.categoriesRepository.findById(id)

    if (!category) {
      throw new CategoryAlreadyExistError()
    }

    return category
  }
}
