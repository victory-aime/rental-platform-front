import * as Constants from './constants'
import {carsServiceInstance  } from './cars.service-instance'
import { TYPES } from 'platform-shared'
import { AxiosError } from 'axios'

export const carListQueries = (
  args: TYPES.QUERIES.QueryPayload<{ userId: string }, any>
) => {
  const { payload, queryOptions } = args
  return TYPES.QUERIES.useCustomQuery<any, AxiosError>({
    queryKey: [Constants.CARS_KEYS.ALL_CARS],
    queryFn: () => carsServiceInstance().fetchCarCategories(),
    options: queryOptions,
  })
}

