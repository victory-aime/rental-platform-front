import { TYPES } from 'platform-shared'
import { BaseApi } from '../../api'

/**
 * CarsServices provides methods to manage cars.
 * It interacts with the API endpoints defined in the application context.
 */
export class CarsServices extends BaseApi {

    /**
     * Fetches car categories
     * @returns {Promise<any>} - A promise that resolves to the car categories
     */
    fetchCarCategories() {
        return this.apiService.invoke(this.applicationContext.getApiConfig().COMMON.CARS.GET_CATEGORIES)
    }
     /**
     * Fetches car equipments
     * @returns {Promise<any>} - A promise that resolves to the car categories
     */
     fetchEquipments() {
        return this.apiService.invoke(this.applicationContext.getApiConfig().COMMON.CARS.GET_EQUIPMENTS)
    }
    /**
     * Adds a new car
     * @param {Object} data - The data of the car to be added
     * @returns {Promise<any>} - A promise that resolves to the response of the add car operation
     */
    addCar(data: TYPES.MODELS.CARS.ICreateCarDto){
        return this.apiService.invoke(this.applicationContext.getApiConfig().MODULES.CARS.ADD_CAR, data)
    }
}
