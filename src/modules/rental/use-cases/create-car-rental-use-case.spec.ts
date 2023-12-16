import { InMemoryUsersRepository } from '@account/repositories/in-memory/in-memory-users-repository'
import { UserNotExistError } from '@account/use-cases/errors/user-not-exist-error'
import { InMemoryCarRepository } from '@car/repositories/in-memory/in-memory-car-repository'
import { CarNotExistError } from '@car/use-cases/errors/car-not-exist-error'
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
import { CreateCarRentalUseCase } from './create-car-rental-use-case'
import { PeriodLessThan24HourError } from './error/period-less-than-24-hour-error'

let carsRepository: InMemoryCarRepository
let usersRepository: InMemoryUsersRepository
let rentalsRepository: InMemoryRentalsRepository
let createCarRentalUseCase: CreateCarRentalUseCase

describe('create car rental', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    carsRepository = new InMemoryCarRepository()
    rentalsRepository = new InMemoryRentalsRepository()
    createCarRentalUseCase = new CreateCarRentalUseCase(
      rentalsRepository,
      usersRepository,
      carsRepository,
    )
  })

  beforeAll(async () => {
    vi.useFakeTimers()
  })

  afterAll(async () => {
    vi.useRealTimers()
  })

  it('Should be possible to rent a car', async () => {
    const user = await usersRepository.create({
      name: 'Jhon',
      email: 'jhon@email.com',
      driver_license: '123456789',
      password: '123',
    })

    const car = await carsRepository.create({
      name: 'Onix',
      brand: 'Chevrolet',
      category_id: '123456789',
      daily_rate: 123,
      license_plate: 'HYF-3447',
      about: '',
    })

    vi.setSystemTime(dayjs('2023-12-05').toDate())

    const rent = await createCarRentalUseCase.execute({
      car_id: car.id,
      start_date: String(dayjs().toDate()),
      end_date: String(dayjs().add(7, 'days').toDate()),
      user_id: user.id,
    })

    expect(rent.id).toEqual(expect.any(String))
    expect(rent).toEqual(expect.objectContaining({ car_id: car.id }))
    expect(rent).toEqual(expect.objectContaining({ user_id: user.id }))
  })

  it('Should not be possible to create a rental with non-existing car', async () => {
    const user = await usersRepository.create({
      name: 'Jhon',
      email: 'jhon@email.com',
      driver_license: '123456789',
      password: '123',
    })

    vi.setSystemTime(dayjs('2023-12-05').toDate())

    await expect(() => {
      return createCarRentalUseCase.execute({
        car_id: 'non-existing',
        start_date: String(dayjs().toDate()),
        end_date: String(dayjs().add(7, 'days').toDate()),
        user_id: user.id,
      })
    }).rejects.toBeInstanceOf(CarNotExistError)
  })

  it('Should not be possible to create a rental with non-existing user', async () => {
    const car = await carsRepository.create({
      name: 'Onix',
      brand: 'Chevrolet',
      category_id: '123456789',
      daily_rate: 123,
      license_plate: 'HYF-3447',
      about: '',
    })

    vi.setSystemTime(dayjs('2023-12-05').toDate())

    await expect(() => {
      return createCarRentalUseCase.execute({
        car_id: car.id,
        start_date: String(dayjs().toDate()),
        end_date: String(dayjs().add(7, 'days').toDate()),
        user_id: 'non-existing',
      })
    }).rejects.toBeInstanceOf(UserNotExistError)
  })

  it('should not be possible to create a rental with a period less than 24 hours', async () => {
    const user = await usersRepository.create({
      name: 'Jhon',
      email: 'jhon@email.com',
      driver_license: '123456789',
      password: '123',
    })

    const car = await carsRepository.create({
      name: 'Onix',
      brand: 'Chevrolet',
      category_id: '123456789',
      daily_rate: 123,
      license_plate: 'HYF-3447',
      about: '',
    })

    vi.setSystemTime(dayjs('2023-12-05').toDate())

    await expect(() => {
      return createCarRentalUseCase.execute({
        car_id: car.id,
        start_date: String(dayjs().toDate()),
        end_date: String(dayjs().add(7, 'hours').toDate()),
        user_id: user.id,
      })
    }).rejects.toBeInstanceOf(PeriodLessThan24HourError)
  })

  it('should not be possible to rent an unavailable car ', async () => {
    const car = await carsRepository.create({
      name: 'Onix',
      brand: 'Chevrolet',
      category_id: '123456789',
      daily_rate: 123,
      license_plate: 'HYF-3447',
      about: '',
    })

    const updatedCar = await carsRepository.update({
      id: car.id,
      about: car.about ? car.about : '',
      brand: car.brand,
      category_id: car.category_id,
      daily_rate: car.daily_rate,
      name: car.name,
      available: false,
    })

    console.log(updatedCar)

    const user = await usersRepository.create({
      name: 'Jhon',
      email: 'jhon@email.com',
      driver_license: '123456789',
      password: '123',
    })

    await expect(() => {
      return createCarRentalUseCase.execute({
        car_id: car.id,
        user_id: user.id,
        end_date: String(dayjs().add(2, 'days').toDate()),
        start_date: String(dayjs().toDate()),
      })
    }).rejects.toEqual(new Error('Car is unavailable'))
  })

  it('Should be possible to mark the rental car as unavailable.', async () => {
    const car = await carsRepository.create({
      name: 'Onix',
      brand: 'Chevrolet',
      category_id: '123456789',
      daily_rate: 123,
      license_plate: 'HYF-3447',
      about: '',
    })

    const user = await usersRepository.create({
      name: 'Jhon',
      email: 'jhon@email.com',
      driver_license: '123456789',
      password: '123',
    })

    const rentalCar = await createCarRentalUseCase.execute({
      car_id: car.id,
      start_date: String(dayjs().toDate()),
      end_date: String(dayjs().add(7, 'days').toDate()),
      user_id: user.id,
    })

    const carRented = await carsRepository.findById(rentalCar.car_id)

    console.log(carRented)
    expect(carRented).toEqual(
      expect.objectContaining({ id: expect.any(String) }),
    )
    expect(carRented).toEqual(expect.objectContaining({ available: false }))
  })
})
