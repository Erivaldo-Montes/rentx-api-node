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
    return  await prisma.category.findFirst({
      where: {
        name
      }
    })

   
  }

  async findById(id: string): Promise<Category | null> {
    return  await prisma.category.findFirst({
      where: {
        id
      }
    })
  }
  
}