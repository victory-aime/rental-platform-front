import { TYPES } from 'rental-platform-shared'
import { BaseApi } from '../../../api'

/**
 * ParcServices provides methods to manage parcs.
 * It interacts with the API endpoints defined in the application context.
 */
export class ParcServices extends BaseApi {
  /**
   * Fetches the list of parcs.
   * @param {TYPES.MODELS.CARS.ParcListDto} payload - The payload used to filter or paginate parcs.
   * @returns {Promise<any>} A promise that resolves to the list of parcs.
   */
  fetchParcs(payload: TYPES.MODELS.CARS.ParcListDto): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().MODULES.CARS.PARC.LIST,
      payload
    )
  }

  /**
   * Adds a new parc.
   * @param {TYPES.MODELS.CARS.ParcDto} data - The data of the parc to be added.
   * @param params
   * @returns {Promise<any>} A promise that resolves to the response of the add operation.
   */
  createParc(data: TYPES.MODELS.CARS.ParcDto, params: { agencyId: string }): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().MODULES.CARS.PARC.ADD_PARC,
      data,
      { params }
    )
  }

  /**
   * Updates a parc.
   * @param {TYPES.MODELS.CARS.ParcDto} data - The object containing updated parc data.
   * @param params
   * @returns {Promise<{message: string}>} A promise that resolves to a confirmation message.
   */
  updateParc(
    data: TYPES.MODELS.CARS.ParcDto,
    params: { agencyId: string }
  ): Promise<{ message: string }> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().MODULES.CARS.PARC.UPDATE_PARC,
      data,
      {
        params,
      }
    )
  }

  /**
   * Deletes a parc.
   * @returns {Promise<{message: string}>} A promise that resolves to a confirmation message.
   * @param params
   */
  deleteParc(params: { agencyId: string; name: string }): Promise<{ message: string }> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().MODULES.CARS.PARC.DELETE_PARC,
      {},
      { params }
    )
  }
}
