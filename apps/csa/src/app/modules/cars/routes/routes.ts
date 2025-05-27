import { MODULES_URL } from '_config/routes'

export const MODULES_CARS_ROUTES = {
  DASHBOARD: `${MODULES_URL.CARS}/dashboard`,
  MANAGE_CARS: { LIST_CARS: `${MODULES_URL.CARS}/manage-cars`, ADD_CAR: `${MODULES_URL.CARS}/manage-cars/add-cars` },
  MANAGE_PARCS: `${MODULES_URL.CARS}/manage-parc`,
  MAINTENANCE: `${MODULES_URL.CARS}/maintenance`,
  AGENDA: `${MODULES_URL.CARS}/agenda`,
  SETTINGS: { PROFILE: `${MODULES_URL.CARS}/settings/profile`, PLAN: `${MODULES_URL.CARS}/settings/plan` },
}
