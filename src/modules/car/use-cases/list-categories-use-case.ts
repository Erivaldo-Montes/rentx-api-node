import { ICategoriesRepository } from '../repositories/ICategories-repository'

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute() {
    const categories = await this.categoriesRepository.list()
    return categories
  }
}
