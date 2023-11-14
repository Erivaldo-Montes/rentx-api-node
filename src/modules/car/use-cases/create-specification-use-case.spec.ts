import { InMemoryCarRepository } from '@car/repositories/in-memory/in-memory-car-repository'
import { InMemorySpecificationRepository } from '@car/repositories/in-memory/in-memory-specifications-repository'
import { beforeEach, expect, it, test } from 'vitest'
import { CreateSpecificationUseCase } from './create-specification-use-case'

let specificationRepository: InMemorySpecificationRepository
let createSpecificationUseCase: CreateSpecificationUseCase
let carsRepository: InMemoryCarRepository

test('create specification use case', () => {
  beforeEach(() => {
    specificationRepository = new InMemorySpecificationRepository()
    carsRepository = new InMemoryCarRepository()
    createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepository, carsRepository)
  })

  it('Should be able create a new specification', async () => {
    const specification = {
      name: 'velocity',
      description: '120 km/h' 
    }

   const car = await carsRepository.create({
      name: 'HB20S 2024',
      brand: ' Hyundai ',
      daily_rate: 120.00,
      category_id: '123',
      license_plate: '1231',
      about: '',
    })

    await createSpecificationUseCase.execute({
      name: specification.name,
      description: specification.description,
      car_id: car.id 
    })
      
    const specificationResult = await specificationRepository.findByCar(car.id, specification.name)

    expect(specificationResult?.car_id).toEqual(car.id)
    expect(specificationResult).toHaveProperty('id')
  })

  it("should be able update specification if have same name", async () => {
    const specification = {
      name: 'velocity',
      description: '120 km/h' 
    }

   const car = await carsRepository.create({
      name: 'Peugeot 208 2024',
      brand: 'Peugeot',
      daily_rate: 123,
      category_id: '123',
      license_plate: '1231',
      about: '',
    })

    await createSpecificationUseCase.execute({
      name: specification.name,
      description: specification.description,
      car_id: car.id 
    })

    await createSpecificationUseCase.execute({
      name: specification.name,
      description: '200 km/h',
      car_id: car.id 
    })

    const specificationCar = await specificationRepository.findByCar(car.id, specification.name)

    expect(specificationCar).toHaveProperty('id')
    expect(specificationCar?.car_id).toEqual(car.id)
    expect(specificationCar?.name).toEqual(specification.name)
    expect(specificationCar?.description).toEqual('200 km/h')
  })
})