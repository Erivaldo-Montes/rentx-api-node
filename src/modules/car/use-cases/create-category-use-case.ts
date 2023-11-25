import { CreateCategoryDTO } from '@car/DTOs/create-category-dto'
import { ICategoriesRepository } from '@car/repositories/ICategories-repository'
import { CategoryAlreadyExistError } from './errors/category-already-exist-error'

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ name, description }: CreateCategoryDTO): Promise<void> {
    const categoryAlreadyExist =
      await this.categoriesRepository.findByName(name)

    if (categoryAlreadyExist !== null) {
      throw new CategoryAlreadyExistError()
    }

    await this.categoriesRepository.create({
      name,
      description,
    })
  }
}
