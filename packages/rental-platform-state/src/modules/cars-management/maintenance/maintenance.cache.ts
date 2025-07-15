import { TYPES } from 'rental-platform-shared'
import { QUERIES } from 'rise-core-frontend'
import * as Constants from './constants'

export const MaintenanceCache = {
  getMaintenanceList: () =>
    QUERIES.QueryCache.get<TYPES.MODELS.CARS.MAINTENANCE.IResponseMaintenace[]>([
      Constants.MAINTENANCE_KEYS.LIST,
    ]),
  invalidateMaintenanceList: () => QUERIES.QueryCache.invalidate([Constants.MAINTENANCE_KEYS.LIST]),
}
