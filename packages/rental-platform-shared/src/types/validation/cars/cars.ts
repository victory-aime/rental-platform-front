import * as Yup from 'yup'
import { TYPES } from '../../..'

export const createCarValidation = Yup.object().shape({})

export const initialCarsValues: TYPES.MODELS.CARS.ICreateCarDto = {
  name: '',
  brand: '',
  model: '',
  plateNumber: '',
  dailyPrice: 0,
  carCategoryId: '',
  parkingCarId: '',
  rentalPriceDiscounted: 0,
  discountType: '',
  discountValue: 0,
  transmission: '',
  doors: 0,
  seats: 0,
  fuelType: '',
  equipmentIds: [],
  carImages: [],
  agencyId: '',
  agencyName: '',
  available: false,
  status: '',
}
