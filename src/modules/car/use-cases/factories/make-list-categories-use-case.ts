import { PostgresCategoriesRepository } from "../../repositories/postgres/postgres-categories-repository";
import { ListCategoriesUseCase } from "../list-categories-use-case";


export function makeListCategoriesUseCase(): ListCategoriesUseCase{
  const categoriesRepository = new PostgresCategoriesRepository()
  const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository)

  return listCategoriesUseCase
}