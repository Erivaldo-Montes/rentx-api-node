import { InMemoryRentalsRepository } from '@rental/repositories/in-memory/in-memory-rentals-repository'
import dayjs from 'dayjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { ListRentalsByUserUseCase } from './list-rentals-by-user-use-case'

let listRentalsByUserUseCase: ListRentalsByUserUseCase
let rentalsRepository: InMemoryRentalsRepository

describe('List rentals by user', () => {
  beforeEach(() => {
    rentalsRepository = new InMemoryRentalsRepository()
    listRentalsByUserUseCase = new ListRentalsByUserUseCase(rentalsRepository)
  })

  it('Should be possible to list all rentals by user', async () => {
    await rentalsRepository.create({
      car_id: 'car 1',
      end_date: dayjs().toDate(),
      start_date: dayjs().toDate(),
      total: 12200,
      user_id: 'user 1',
      created_at: dayjs().toDate(),
      update_at: dayjs().toDate(),
    })

    await rentalsRepository.create({
      car_id: 'car 2',
      end_date: dayjs().toDate(),
      start_date: dayjs().toDate(),
      total: 12233,
      user_id: 'user 1',
      created_at: dayjs().toDate(),
      update_at: dayjs().toDate(),
    })

    const rentals = await listRentalsByUserUseCase.execute('user 1')

    expect(rentals).toHaveLength(2)
    expect(rentals).toEqual([
      expect.objectContaining({ car_id: 'car 1' }),
      expect.objectContaining({ car_id: 'car 2' }),
    ])
  })
})
