import { TYPES } from 'rental-platform-shared'
import * as Constants from './constants'

export const MaintenanceCache = {
  getMaintenanceList: () =>
    TYPES.QUERIES.QueryCache.get<TYPES.MODELS.CARS.MAINTENANCE.IResponseMaintenace[]>([
      Constants.MAINTENANCE_KEYS.LIST,
    ]),
  invalidateMaintenanceList: () =>
    TYPES.QUERIES.QueryCache.invalidate([Constants.MAINTENANCE_KEYS.LIST]),
}
