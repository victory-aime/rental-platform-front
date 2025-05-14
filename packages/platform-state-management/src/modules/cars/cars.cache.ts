import { TYPES } from 'platform-shared'
import * as Constants from './constants'

export const CarsCache = {
  getCars: () => TYPES.QUERIES.QueryCache.get<any>([Constants.CARS_KEYS.ALL_CARS]),
  invalidateCars: ()=> TYPES.QUERIES.QueryCache.invalidate([Constants.CARS_KEYS.ALL_CARS])
}
