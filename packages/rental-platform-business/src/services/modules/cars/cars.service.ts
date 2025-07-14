import { TYPES } from 'rental-platform-shared'
import { BaseApi } from '../../../api'

/**
 * CarsServices provides methods to manage cars.
 * It interacts with the API endpoints defined in the application context.
 */
export class CarsServices extends BaseApi {
  /**
   * Fetches car categories
   * @returns {Promise<any>} - A promise that resolves to the car categories
   */
  fetchCarCategories(): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().MODULES.CARS.GET_CATEGORIES
    )
  }
  /**
   * Fetches car equipments
   * @returns {Promise<any>} - A promise that resolves to the car categories
   */
  fetchEquipments(): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().MODULES.CARS.GET_EQUIPMENTS
    )
  }
  /**
   * Adds a new car
   * @param {Object} data - The data of the car to be added
   * @param params
   * @returns {Promise<any>} - A promise that resolves to the response of the add car operation
   */
  addCar(
    data: TYPES.MODELS.CARS.ICreateCarDto | FormData,
    params: { agencyId: string; agencyName: string }
  ): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().MODULES.CARS.ADD_CAR,
      data,
      { params }
    )
  }

  /**
   * Fetches all cars
   * @param {establishment} establishment - The id of the etablissement
   * @returns {Promise<any>} - A promise that resolves to the list of cars
   */
  fetchAllCars(establishment: { establishment: string }): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().MODULES.CARS.GET_CARS,
      establishment
    )
  }

  /**
   * Update cars
   * @params {data} data - The object required to update car
   * @returns {Promise<{message:string}>} - A promise that resolves to the message
   */
  updateCar(
    data: TYPES.MODELS.CARS.ICreateCarDto | FormData,
    params: { requestId: string; agencyName: string }
  ): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().MODULES.CARS.UPDATE_CAR,
      data,
      { params }
    )
  }
  /**
   * Delete car
   * @param {Object} data - The data of the car to be deleted
   * @returns {Promise<any>} - A promise that resolves to the response of the delete car operation
   */
  deleteCar(carId: { carId: string }): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().MODULES.CARS.DELETE_CAR,
      {},
      { params: carId }
    )
  }
  /**
   * Delete all cars
   * @param {Object} agencyId - The agencyId of the car to be deleted
   * @returns {Promise<any>} - A promise that resolves to the response of the delete car operation
   */
  deleteAllCars(data: { agencyId: string; agencyName: string }): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().MODULES.CARS.DELETE_ALL_CARS,
      {},
      { params: data }
    )
  }
}
