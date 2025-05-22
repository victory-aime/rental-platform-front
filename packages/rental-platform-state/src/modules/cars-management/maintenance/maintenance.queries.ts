import * as Constants from './constants'
import { maintenanceServiceInstance } from './maintenance.service-instance'
import { TYPES } from 'rental-platform-shared'
import { AxiosError } from 'axios'

const getMaintenanceListQueries = (
  args: TYPES.QUERIES.QueryPayload<
    { filters: TYPES.MODELS.CARS.MAINTENANCE.FilterMaintenanceDto },
    any
  >
) => {
  const { payload, queryOptions } = args
  return TYPES.QUERIES.useCustomQuery<
    TYPES.MODELS.CARS.MAINTENANCE.IResponseMaintenace[],
    AxiosError
  >({
    queryKey: [Constants.MAINTENANCE_KEYS.LIST],
    queryFn: () => maintenanceServiceInstance().getMaintenanceList(payload.filters),
    options: queryOptions,
  })
}

const createMaintenanceMutation = (
  args: TYPES.QUERIES.MutationPayload<TYPES.MODELS.CARS.MAINTENANCE.CreateMaintenanceDto>
) => {
  return TYPES.QUERIES.useCustomMutation<
    TYPES.MODELS.CARS.MAINTENANCE.CreateMaintenanceDto,
    any,
    AxiosError
  >({
    mutationKey: [Constants.MAINTENANCE_KEYS.ADD],
    mutationFn: (data) => maintenanceServiceInstance().addMaintenance(data),
    options: args,
  })
}

const updateMaintenanceMutation = (
  args: TYPES.QUERIES.MutationPayload<TYPES.MODELS.CARS.MAINTENANCE.UpdateMaintenanceDto>
) => {
  return TYPES.QUERIES.useCustomMutation<
    TYPES.MODELS.CARS.MAINTENANCE.UpdateMaintenanceDto,
    any,
    AxiosError
  >({
    mutationKey: [Constants.MAINTENANCE_KEYS.UPDATE],
    mutationFn: (data) => maintenanceServiceInstance().updateMaintenace(data),
    options: args,
  })
}

const closeMaintenanceMutation = (args: TYPES.QUERIES.MutationPayload<{ requestId: string }>) => {
  return TYPES.QUERIES.useCustomMutation<{ requestId: string }, any, AxiosError>({
    mutationKey: [Constants.MAINTENANCE_KEYS.CLOSE_MAINTENANCE],
    mutationFn: (requestId) => maintenanceServiceInstance().closeMaintenace(requestId),
    options: args,
  })
}

export {
  getMaintenanceListQueries,
  closeMaintenanceMutation,
  createMaintenanceMutation,
  updateMaintenanceMutation,
}
