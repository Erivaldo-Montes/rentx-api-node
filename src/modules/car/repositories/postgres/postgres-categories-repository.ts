import { prisma } from '@/lib/prisma'
import { Category, Prisma } from '@prisma/client'
import { ICategoriesRepository } from '../ICategories-repository'

export class PostgresCategoriesRepository implements ICategoriesRepository {
  async create({ name, description }: Prisma.CategoryCreateInput): Promise<void> {
    await prisma.category.create({
      data: {
        name,
        description
      }
    })
  }

  async list(): Promise<Category[]> {
    return await prisma.category.findMany()
  }

  async findByName(name: string): Promise<Category| null> {
    const category = await prisma.category.findFirst({
      where: {
        name
      }
    })

    if(!category){
      return null
    }

    return category
  }
  
}