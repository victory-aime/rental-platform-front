import { TYPES } from 'rental-platform-shared'
import { QUERIES } from 'rise-core-frontend'
import * as Constants from './constants'

export const ParcsCache = {
  getParcs: () =>
    QUERIES.QueryCache.get<TYPES.MODELS.CARS.IResponseParc>([Constants.PARCS_KEYS.ALL_PARCS]),
  invalidateParcs: () => QUERIES.QueryCache.invalidate([Constants.PARCS_KEYS.ALL_PARCS]),
}
