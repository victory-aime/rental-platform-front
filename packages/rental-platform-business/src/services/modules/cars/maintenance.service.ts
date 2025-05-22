import { TYPES } from 'rental-platform-shared'
import { BaseApi } from '../../../api'

/**
 * MaintenanceServices provides methods to manage car maintenance operations.
 * It interacts with the API endpoints defined in the application context.
 */
export class MaintenanceServices extends BaseApi {
  /**
   * Fetches the list of maintenance records.
   * @param {TYPES.MODELS.CARS.MAINTENANCE.FilterMaintenanceDto} payload - The payload used to filter or paginate maintenance entries.
   * @returns {Promise<any>} A promise that resolves to the list of maintenance records.
   */
  getMaintenanceList(filters: TYPES.MODELS.CARS.MAINTENANCE.FilterMaintenanceDto) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().MODULES.CARS.MAINTENANCE.LIST,
      filters
    )
  }

  /**
   * Adds a new maintenance record.
   * @param {TYPES.MODELS.CARS.MAINTENANCE.CreateMaintenanceDto} data - The data for the maintenance to be added.
   * @returns {Promise<any>} A promise that resolves to the response of the add operation.
   */
  addMaintenance(data: TYPES.MODELS.CARS.MAINTENANCE.CreateMaintenanceDto) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().MODULES.CARS.MAINTENANCE.ADD,
      data
    )
  }

  /**
   * Updates a maintenance record.
   * @param {TYPES.MODELS.CARS.MAINTENANCE.UpdateMaintenanceDto} data - The object containing updated maintenance data.
   * @returns {Promise<{message: string}>} A promise that resolves to a confirmation message.
   */
  updateMaintenace(data: TYPES.MODELS.CARS.MAINTENANCE.UpdateMaintenanceDto) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().MODULES.CARS.MAINTENANCE.UPDATE,
      data
    )
  }

  /**
   * Closes a maintenance request.
   * @param {{requestId: string}} requestId - The ID of the maintenance request to be closed.
   * @returns {Promise<{message: string}>} A promise that resolves to a confirmation message.
   */
  closeMaintenace(requestId: { requestId: string }) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().MODULES.CARS.MAINTENANCE.CLOSED,
      requestId
    )
  }
}
