import * as Constants from './constants'
import { maintenanceServiceInstance } from './maintenance.service-instance'
import { TYPES } from 'rental-platform-shared'
import { QUERIES } from 'rise-core-frontend'
import { AxiosError } from 'axios'

const getMaintenanceListQueries = (
  args: QUERIES.QueryPayload<{ filters: TYPES.MODELS.CARS.MAINTENANCE.FilterMaintenanceDto }, any>
) => {
  const { payload, queryOptions } = args
  return QUERIES.useCustomQuery<TYPES.MODELS.CARS.MAINTENANCE.IResponseMaintenace[], AxiosError>({
    queryKey: [Constants.MAINTENANCE_KEYS.LIST],
    queryFn: () => maintenanceServiceInstance().getMaintenanceList(payload?.filters!),
    options: queryOptions,
  })
}

const createMaintenanceMutation = (
  args: QUERIES.MutationPayload<TYPES.MODELS.CARS.MAINTENANCE.CreateMaintenanceDto>
) => {
  return QUERIES.useCustomMutation<
    TYPES.MODELS.CARS.MAINTENANCE.CreateMaintenanceDto,
    any,
    AxiosError
  >({
    mutationKey: [Constants.MAINTENANCE_KEYS.ADD],
    mutationFn: ({ payload, params }) =>
      maintenanceServiceInstance().addMaintenance(payload!, params),
    options: args.mutationOptions,
  })
}

const updateMaintenanceMutation = (
  args: QUERIES.MutationPayload<TYPES.MODELS.CARS.MAINTENANCE.UpdateMaintenanceDto>
) => {
  return QUERIES.useCustomMutation<
    TYPES.MODELS.CARS.MAINTENANCE.UpdateMaintenanceDto,
    any,
    AxiosError
  >({
    mutationKey: [Constants.MAINTENANCE_KEYS.UPDATE],
    mutationFn: ({ payload, params }) =>
      maintenanceServiceInstance().updateMaintenance(payload!, params),
    options: args.mutationOptions,
  })
}

const closeMaintenanceMutation = (args: QUERIES.MutationPayload<{ requestId: string }>) => {
  return QUERIES.useCustomMutation<{ requestId: string }, any, AxiosError>({
    mutationKey: [Constants.MAINTENANCE_KEYS.CLOSE_MAINTENANCE],
    mutationFn: ({ params }) => maintenanceServiceInstance().closeMaintenance(params),
    options: args.mutationOptions,
  })
}

export {
  getMaintenanceListQueries,
  closeMaintenanceMutation,
  createMaintenanceMutation,
  updateMaintenanceMutation,
}
