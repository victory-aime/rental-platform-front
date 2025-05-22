import { TYPES } from 'rental-platform-shared'
import * as Constants from './constants'

export const CarsCache = {
  getCars: () =>
    TYPES.QUERIES.QueryCache.get<TYPES.MODELS.CARS.IResponseCarsList[]>([
      Constants.CARS_KEYS.ALL_CARS,
    ]),
  getCategories: () => TYPES.QUERIES.QueryCache.get([Constants.CARS_KEYS.ALL_CARS_CATEGORIES]),
  getEquipments: () => TYPES.QUERIES.QueryCache.get([Constants.CARS_KEYS.ALL_CARS_EQUIPMENTS]),
  invalidateCars: () => TYPES.QUERIES.QueryCache.invalidate([Constants.CARS_KEYS.ALL_CARS]),
}
