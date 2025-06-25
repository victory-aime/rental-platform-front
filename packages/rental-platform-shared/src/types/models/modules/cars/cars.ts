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
  name?: string
  brand?: string
  model?: string
  plateNumber?: string
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
  parkingCarId?: string
  available?: boolean
  equipmentIds?: CarEquipments[]
  status?: string
  booking?: TYPES.MODELS.COMMON.BOOKING.IBooking[]
}

export interface IResponseCarsList {
  id: string
  agenceId: string
  name: string
  brand: string
  model: string
  plateNumber: string
  dailyPrice: number
  carImages: string[]
  discountValue: number
  rentalPriceDiscounted: number | null
  transmission: TYPES.ENUM.CARS.TransmissionType
  fuelType: TYPES.ENUM.CARS.FuelType
  doors: number
  seats: number
  parkingCarId: null
  status: TYPES.ENUM.CARS.VehicleStatus
  discountType: TYPES.ENUM.CARS.DiscountType
  carCategoryId: string
  available: boolean
  createdAt: string
  updatedAt: string
  bookings: []
  equipments: {
    id: string
    name: string
    description: string | null
  }[]
}
