import * as Constants from './constants'
import { carsServiceInstance } from './cars.service-instance'
import { TYPES } from 'rental-platform-shared'
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
  return TYPES.QUERIES.useCustomQuery<TYPES.MODELS.CARS.IResponseCarsList[], AxiosError>({
    queryKey: [Constants.CARS_KEYS.ALL_CARS],
    queryFn: () => carsServiceInstance().fetchAllCars({ establishment: payload?.establishment! }),
    options: queryOptions,
  })
}

const createCarsMutation = (
  args: TYPES.QUERIES.MutationPayload<TYPES.MODELS.CARS.ICreateCarDto, any>
) => {
  return TYPES.QUERIES.useCustomMutation<TYPES.MODELS.CARS.ICreateCarDto, any, AxiosError>({
    mutationKey: [Constants.CARS_KEYS.ADD_CAR],
    mutationFn: ({ payload, params }) => carsServiceInstance().addCar(payload!, params),
    options: args.mutationOptions,
  })
}

const updateCarsMutation = (
  args: TYPES.QUERIES.MutationPayload<TYPES.MODELS.CARS.ICreateCarDto, any, any>
) => {
  return TYPES.QUERIES.useCustomMutation<TYPES.MODELS.CARS.ICreateCarDto, any, AxiosError>({
    mutationKey: [Constants.CARS_KEYS.UPDATE_CAR],
    mutationFn: ({ payload, params }) => carsServiceInstance().updateCar(payload!, params),
    options: args.mutationOptions,
  })
}

export {
  getCarsCategoriesQueries,
  getCarsEquipmentsQueries,
  createCarsMutation,
  getAllCarsQueries,
  updateCarsMutation,
}
