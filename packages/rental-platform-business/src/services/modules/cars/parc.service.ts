import { TYPES } from 'rental-platform-shared'
import { BaseApi } from '../../../api'

/**
 * ParcServices provides methods to manage parcs.
 * It interacts with the API endpoints defined in the application context.
 */
export class ParcServices extends BaseApi {
  /**
   * Fetches car categories
   * @returns {Promise<any>} - A promise that resolves to the car categories
   */
  fetchParcs(payload: TYPES.MODELS.CARS.ParcListDto) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().MODULES.CARS.PARC_LIST,
      payload
    )
  }
  /**
   * Adds a new car
   * @param {Object} data - The data of the car to be added
   * @returns {Promise<any>} - A promise that resolves to the response of the add car operation
   */
  createParc(data: TYPES.MODELS.CARS.ParcDto) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().MODULES.CARS.ADD_PARC,
      data
    )
  }

  /**
   * Update cars
   * @params {data} data - The object required to update car
   * @returns {Promise<{message:string}>} - A promise that resolves to the message
   */
  updateParc(data: TYPES.MODELS.CARS.ParcDto) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().MODULES.CARS.UPDATE_PARC,
      data
    )
  }

  /**
   * Update cars
   * @params {data} data - The object required to update car
   * @returns {Promise<{message:string}>} - A promise that resolves to the message
   */
  deleteParc(data: TYPES.MODELS.CARS.ParcDto) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().MODULES.CARS.DELETE_PARC,
      data
    )
  }
}
