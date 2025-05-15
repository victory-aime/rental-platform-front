import * as Constants from './constants'
import { carsServiceInstance } from './cars.service-instance'
import { TYPES } from 'platform-shared'
import { AxiosError } from 'axios'

const getCarsCategoriesQueries = (args: TYPES.QUERIES.QueryPayload<any, any>) => {
  const { queryOptions } = args
  return TYPES.QUERIES.useCustomQuery<any, AxiosError>({
    queryKey: [Constants.CARS_KEYS.ALL_CARS_CATEGORIES],
    queryFn: () => carsServiceInstance().fetchCarCategories(),
    options: queryOptions,
  })
}
const getCarsEquipmentsQueries = (args: TYPES.QUERIES.QueryPayload<any, any>) => {
  const { queryOptions } = args
  return TYPES.QUERIES.useCustomQuery<any, AxiosError>({
    queryKey: [Constants.CARS_KEYS.ALL_CARS_EQUIPMENTS],
    queryFn: () => carsServiceInstance().fetchEquipments(),
    options: queryOptions,
  })
}

const getAllCarsQueries = (args: TYPES.QUERIES.QueryPayload<{ establishment: string }, any>) => {
  const { payload, queryOptions } = args
  return TYPES.QUERIES.useCustomQuery<any, AxiosError>({
    queryKey: [Constants.CARS_KEYS.ALL_CARS],
    queryFn: () => carsServiceInstance().fetchAllCars(payload),
    options: queryOptions,
  })
}

const createCarsMutation = (
  args: TYPES.QUERIES.MutationPayload<TYPES.MODELS.CARS.ICreateCarDto>
) => {
  return TYPES.QUERIES.useCustomMutation<TYPES.MODELS.CARS.ICreateCarDto, any, AxiosError>({
    mutationKey: [Constants.CARS_KEYS.ADD_CAR],
    mutationFn: (data) => carsServiceInstance().addCar(data),
    options: args,
  })
}

export { getCarsCategoriesQueries, getCarsEquipmentsQueries, createCarsMutation, getAllCarsQueries }
