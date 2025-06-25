import { TYPES } from 'rental-platform-shared'
import { BaseApi } from '../../../api'

/**
 * MaintenanceServices provides methods to manage car maintenance operations.
 * It interacts with the API endpoints defined in the application context.
 */
export class MaintenanceServices extends BaseApi {
  /**
   * Fetches the list of maintenance records.
   * @returns {Promise<any>} A promise that resolves to the list of maintenance records.
   * @param filters
   */
  getMaintenanceList(filters: TYPES.MODELS.CARS.MAINTENANCE.FilterMaintenanceDto): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().MODULES.CARS.MAINTENANCE.LIST,
      filters
    )
  }

  /**
   * Adds a new maintenance record.
   * @param {TYPES.MODELS.CARS.MAINTENANCE.CreateMaintenanceDto} data - The data for the maintenance to be added.
   * @param params
   * @returns {Promise<any>} A promise that resolves to the response of the add operation.
   */
  addMaintenance(
    data: TYPES.MODELS.CARS.MAINTENANCE.CreateMaintenanceDto,
    params: { agencyId: string }
  ): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().MODULES.CARS.MAINTENANCE.ADD,
      data,
      { params }
    )
  }

  /**
   * Updates a maintenance record.
   * @param {TYPES.MODELS.CARS.MAINTENANCE.UpdateMaintenanceDto} data - The object containing updated maintenance data.
   * @param params
   * @returns {Promise<{message: string}>} A promise that resolves to a confirmation message.
   */
  updateMaintenance(
    data: TYPES.MODELS.CARS.MAINTENANCE.UpdateMaintenanceDto,
    params: { agencyId: string }
  ): Promise<{ message: string }> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().MODULES.CARS.MAINTENANCE.UPDATE,
      data,
      {
        params,
      }
    )
  }

  /**
   * Closes a maintenance request.
   * @returns {Promise<{message: string}>} A promise that resolves to a confirmation message.
   * @param params
   */
  closeMaintenance(params: { requestId: string }): Promise<{ message: string }> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().MODULES.CARS.MAINTENANCE.CLOSED,
      {},
      { params }
    )
  }
}
