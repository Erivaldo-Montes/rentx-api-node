import { ISpecificationsRepository } from '../repositories/ISpecifications-repository'
import { SpecificationNotExistingError } from './errors/specification-not-existing-error'

interface IRequest {
  name: string
  description: string
  id: string
}

export class UpdateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationsRepository) {}

  async execute({ name, id, description }: IRequest): Promise<void> {
    const specification = await this.specificationRepository.findById(id)

    if (!specification) {
      throw new SpecificationNotExistingError()
    }

    await this.specificationRepository.update({ id, name, description })
  }
}
