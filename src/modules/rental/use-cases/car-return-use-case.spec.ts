import { InMemoryUsersRepository } from '@account/repositories/in-memory/in-memory-users-repository'
import { InMemoryCarRepository } from '@car/repositories/in-memory/in-memory-car-repository'
import { InMemoryRentalsRepository } from '@rental/repositories/in-memory/in-memory-rentals-repository'
import dayjs from 'dayjs'
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'
import { ReturnCarUseCase } from './car-return-use-case'
import { CreateCarRentalUseCase } from './create-car-rental-use-case'
import { RentNotFoundError } from './error/rent-not-found-error'

let returnCarUseCase: ReturnCarUseCase
let createCarRentalUseCase: CreateCarRentalUseCase
let rentalsRepository: InMemoryRentalsRepository
let carsRepository: InMemoryCarRepository
let usersRepository: InMemoryUsersRepository

describe('Car return', () => {
  beforeEach(() => {
    rentalsRepository = new InMemoryRentalsRepository()
    carsRepository = new InMemoryCarRepository()
    returnCarUseCase = new ReturnCarUseCase(rentalsRepository, carsRepository)
    usersRepository = new InMemoryUsersRepository()
    createCarRentalUseCase = new CreateCarRentalUseCase(
      rentalsRepository,
      usersRepository,
      carsRepository,
    )
  })

  beforeAll(() => {
    vi.useFakeTimers()
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('Should be possible to return the car', async () => {
    vi.setSystemTime(dayjs().toDate())

    // create a car
    const car = await carsRepository.create({
      name: 'Onix',
      brand: 'chevrolet',
      about: '',
      license_plate: '2322',
      category_id: '1234567',
      daily_rate: 123,
    })

    // create user
    const user = await usersRepository.create({
      name: 'Jhon',
      email: 'Jhon@email.com',
      driver_license: '1234567',
      password: '123456',
    })

    // create rent
    const rent = await createCarRentalUseCase.execute({
      car_id: car.id,
      end_date: dayjs().add(3, 'days').toString(),
      start_date: dayjs().toString(),
      user_id: user.id,
    })

    vi.setSystemTime(dayjs().add(4, 'days').toDate())

    await returnCarUseCase.execute(rent.id)

    const carRented = await carsRepository.findById(car.id)

    expect(carRented).toEqual(expect.objectContaining({ available: true }))
  })

  it('Should not be possible to return the non-existing car', async () => {
    await expect(() => {
      return returnCarUseCase.execute('wrong id')
    }).rejects.toBeInstanceOf(RentNotFoundError)
  })
})
