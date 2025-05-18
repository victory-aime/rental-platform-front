import { TYPES } from 'rental-platform-shared'
import * as Constants from './constants'

export const ParcsCache = {
  getParcs: () => TYPES.QUERIES.QueryCache.get<any>([Constants.PARCS_KEYS.ALL_PARCS]),
  invalidateParcs: () => TYPES.QUERIES.QueryCache.invalidate([Constants.PARCS_KEYS.ALL_PARCS]),
}
