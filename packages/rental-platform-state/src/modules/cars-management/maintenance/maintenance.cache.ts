import { TYPES } from 'rental-platform-shared'
import * as Constants from './constants'

export const MaintenanceCache = {
  getMaintenanceList: () => TYPES.QUERIES.QueryCache.get<any>([Constants.MAINTENANCE_KEYS.LIST]),
  invalidateMaintenanceList: () => TYPES.QUERIES.QueryCache.invalidate([Constants.MAINTENANCE_KEYS.LIST]),
}
