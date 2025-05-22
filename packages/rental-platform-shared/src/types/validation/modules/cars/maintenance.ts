import { DateRange } from 'react-day-picker'

export const initialMaintenanceValues: initialMaintenanceValues = {
  plannedDate: { from: undefined, to: undefined },
  title: '',
  description: '',
  carId: '',
  price: '',
  status: '',
}

export interface initialMaintenanceValues {
  plannedDate: { from: DateRange | undefined; to: DateRange | undefined }
  title: string
  description: string
  carId: string
  price: string
  status: string
}
