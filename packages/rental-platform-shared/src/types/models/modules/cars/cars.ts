import { TYPES } from '../../../..'


export interface CarCategory {
  id?: string
  name: string
}

export interface CarEquipments {
  id?: string
  name: string
}

export interface ICreateCarDto {
  id?: string
  agencyId?: string
  agencyName?: string
  name: string
  brand: string
  model: string
  plateNumber: string
  dailyPrice?: number
  rentalPriceDiscounted?: number
  discountType?: string
  discountValue?: number
  carImages?: string[]
  transmission?: string
  fuelType?: string
  doors?: number
  seats?: number
  carCategoryId?: string
  available?: boolean
  equipmentIds?: CarEquipments[]
  status?: string
  booking?: TYPES.MODELS.COMMON.BOOKING.IBooking[]
}
