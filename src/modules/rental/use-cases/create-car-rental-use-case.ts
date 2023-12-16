import { IUsersRepository } from '@/modules/account/repositories/IUsers-repository'
import { ICarsRepository } from '@/modules/car/repositories/ICars-repository'
import { UserNotExistError } from '@account/use-cases/errors/user-not-exist-error'
import { CarNotExistError } from '@car/use-cases/errors/car-not-exist-error'
import { Rental } from '@prisma/client'
import dayjs from 'dayjs'
import { CreateInputDTO } from '../DTOs/create-input-dto'
import { IRentalsRepository } from '../repositories/IRentalsRepository'
import { PeriodLessThan24HourError } from './error/period-less-than-24-hour-error'

export class CreateCarRentalUseCase {
  constructor(
    private rentalsRepository: IRentalsRepository,
    private usersRepository: IUsersRepository,
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    car_id,
    end_date,
    start_date,
    user_id,
  }: CreateInputDTO): Promise<Rental> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new UserNotExistError()
    }

    const car = await this.carsRepository.findById(car_id)

    if (!car) {
      throw new CarNotExistError()
    }

    console.log(car.available)
    if (car.available === false) {
      throw new Error('Car is unavailable')
    }

    const PERIOD_RENTAL_IN_HOURS = dayjs(end_date).diff(start_date, 'hours')

    if (PERIOD_RENTAL_IN_HOURS < 24) {
      throw new PeriodLessThan24HourError()
    }

    // mark car as unavailable
    await this.carsRepository.update({
      name: car.name,
      about: car.about ?? '',
      available: false,
      brand: car.brand,
      category_id: car.category_id,
      daily_rate: car.daily_rate,
      id: car.id,
    })

    const total_in_cents = (car.daily_rate * PERIOD_RENTAL_IN_HOURS) / 24

    console.log(user_id)
    const rent = await this.rentalsRepository.create({
      car_id,
      user_id,
      end_date: new Date(end_date),
      start_date: new Date(start_date),
      total: total_in_cents,
    })

    return rent
  }
}
