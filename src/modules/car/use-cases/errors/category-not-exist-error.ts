export class CategoryNotExistError extends Error {
  constructor() {
    super('Category not exist.')
  }
}
