import { QUERIES } from 'rise-core-frontend'
import { TYPES } from 'rental-platform-shared'
import * as Constants from './constants'

export const CarsCache = {
  getCars: () =>
    QUERIES.QueryCache.get<TYPES.MODELS.CARS.IResponseCarsList[]>([Constants.CARS_KEYS.ALL_CARS]),
  getCategories: () => QUERIES.QueryCache.get([Constants.CARS_KEYS.ALL_CARS_CATEGORIES]),
  getEquipments: () => QUERIES.QueryCache.get([Constants.CARS_KEYS.ALL_CARS_EQUIPMENTS]),
  invalidateCars: () => QUERIES.QueryCache.invalidate([Constants.CARS_KEYS.ALL_CARS]),
}
