import { ICategoriesRepository } from '@car/repositories/ICategories-repository'
import { Category, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

export class InMemoryCategoriesRepository implements ICategoriesRepository {
  categories: Category[] = []

  async create({
    name,
    description,
  }: Prisma.CategoryCreateInput): Promise<Category> {
    const category: Category = {
      id: randomUUID(),
      name,
      description,
      created_at: new Date(),
    }

    this.categories.push(category)

    return category
  }

  async list(): Promise<Category[]> {
    return this.categories
  }

  async findByName(name: string): Promise<Category | null> {
    const category = this.categories.find((item) => item.name === name)

    if (!category) {
      return null
    }

    return category
  }

  async findById(id: string): Promise<Category | null> {
    const category = this.categories.find((item) => item.id === id)

    if (!category) {
      return null
    }

    return category
  }

  async delete(id: string): Promise<void> {
    const categoriesWithoutCategoryDeleted = this.categories.filter(
      (item) => item.id !== id,
    )
    this.categories = categoriesWithoutCategoryDeleted
  }
}
