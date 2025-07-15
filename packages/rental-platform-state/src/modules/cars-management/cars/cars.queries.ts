import * as Constants from './constants'
import { carsServiceInstance } from './cars.service-instance'
import { QUERIES } from 'rise-core-frontend'
import { TYPES } from 'rental-platform-shared'
import { AxiosError } from 'axios'

const getCarsCategoriesQueries = (args: QUERIES.QueryPayload<any, any>) => {
  const { queryOptions } = args
  return QUERIES.useCustomQuery<any, AxiosError>({
    queryKey: [Constants.CARS_KEYS.ALL_CARS_CATEGORIES],
    queryFn: () => carsServiceInstance().fetchCarCategories(),
    options: queryOptions,
  })
}
const getCarsEquipmentsQueries = (args: QUERIES.QueryPayload<any, any>) => {
  const { queryOptions } = args
  return QUERIES.useCustomQuery<any, AxiosError>({
    queryKey: [Constants.CARS_KEYS.ALL_CARS_EQUIPMENTS],
    queryFn: () => carsServiceInstance().fetchEquipments(),
    options: queryOptions,
  })
}

const getAllCarsQueries = (args: QUERIES.QueryPayload<{ establishment: string }, any>) => {
  const { payload, queryOptions } = args
  return QUERIES.useCustomQuery<TYPES.MODELS.CARS.IResponseCarsList[], AxiosError>({
    queryKey: [Constants.CARS_KEYS.ALL_CARS],
    queryFn: () => carsServiceInstance().fetchAllCars({ establishment: payload?.establishment! }),
    options: queryOptions,
  })
}

const createCarsMutation = (
  args: QUERIES.MutationPayload<TYPES.MODELS.CARS.ICreateCarDto, any>
) => {
  return QUERIES.useCustomMutation<TYPES.MODELS.CARS.ICreateCarDto, any, AxiosError>({
    mutationKey: [Constants.CARS_KEYS.ADD_CAR],
    mutationFn: ({ payload, params }) => carsServiceInstance().addCar(payload!, params),
    options: args.mutationOptions,
  })
}

const updateCarsMutation = (
  args: QUERIES.MutationPayload<TYPES.MODELS.CARS.ICreateCarDto, any, any>
) => {
  return QUERIES.useCustomMutation<TYPES.MODELS.CARS.ICreateCarDto, any, AxiosError>({
    mutationKey: [Constants.CARS_KEYS.UPDATE_CAR],
    mutationFn: ({ payload, params }) => carsServiceInstance().updateCar(payload!, params),
    options: args.mutationOptions,
  })
}

const deleteCarMutation = (args: QUERIES.MutationPayload<{ carId: string }>) => {
  return QUERIES.useCustomMutation<{ carId: string }, any, AxiosError>({
    mutationKey: [Constants.CARS_KEYS.DELETE_CAR],
    mutationFn: ({ params }) => carsServiceInstance().deleteCar(params),
    options: args.mutationOptions,
  })
}

const deleteAllCarsMutation = (
  args: QUERIES.MutationPayload<{ agencyId: string; agencyName: string }>
) => {
  return QUERIES.useCustomMutation<{ agencyId: string; agencyName: string }, any, AxiosError>({
    mutationKey: [Constants.CARS_KEYS.DELETE_ALL_CARS],
    mutationFn: ({ params }) => carsServiceInstance().deleteAllCars(params),
    options: args.mutationOptions,
  })
}
export {
  getCarsCategoriesQueries,
  getCarsEquipmentsQueries,
  createCarsMutation,
  getAllCarsQueries,
  updateCarsMutation,
  deleteCarMutation,
  deleteAllCarsMutation,
}
