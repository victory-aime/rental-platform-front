import { TYPES } from '../../../..'

export interface IBooking {
  status: TYPES.ENUM.COMMON.CommonBookingStatus | string | null
}
