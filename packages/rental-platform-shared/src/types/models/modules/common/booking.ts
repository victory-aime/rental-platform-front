import { TYPES } from '../../../..'

export interface IBooking {
  status: TYPES.ENUM.CommonBookingStatus | string | null
}
