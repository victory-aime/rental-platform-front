import { TYPES } from 'rental-platform-shared'
import * as Constants from './constants'

export const ParcsCache = {
  getParcs: () =>
    TYPES.QUERIES.QueryCache.get<TYPES.MODELS.CARS.IResponseParc>([Constants.PARCS_KEYS.ALL_PARCS]),
  invalidateParcs: () => TYPES.QUERIES.QueryCache.invalidate([Constants.PARCS_KEYS.ALL_PARCS]),
}
