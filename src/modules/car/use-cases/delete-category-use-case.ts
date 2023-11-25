import { ICategoriesRepository } from '../repositories/ICategories-repository'
import { CategoryNotExistError } from './errors/category-not-exist-error'

export class DeleteCategoryUseCase {
  constructor(private CategoriesRepository: ICategoriesRepository) {}

  async execute(id: string): Promise<void> {
    const category = await this.CategoriesRepository.findById(id)

    if (!category) {
      throw new CategoryNotExistError()
    }

    await this.CategoriesRepository.delete(id)
  }
}
