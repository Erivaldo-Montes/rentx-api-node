import { InMemoryCategoriesRepository } from "@car/repositories/in-memory/in-memory-categories-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ListCategoriesUseCase } from "./list-categories-use-case";

let listCategoriesUseCase: ListCategoriesUseCase
let categoriesRepository: InMemoryCategoriesRepository

describe("List categories use case", () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository)
  })

  it("Should be possible to list all categories", async () => {
    await categoriesRepository.create({
      name: 'SUV',
      description: ''
    })

    await categoriesRepository.create({
      name: 'sedan',
      description: ''
    })

    const categories = await listCategoriesUseCase.execute()

    expect(categories).toHaveLength(2)
    expect(categories).toEqual([expect.objectContaining({name: 'SUV'}), expect.objectContaining({name: 'sedan'})])
  })
})