export interface CreateMaintenanceDto {
  carId: string
  agencyId?: string
  title: string
  description?: string
  type?: string
  status?: string
  scheduledStartDate: string
  scheduledEndDate: string
  cost?: number
}

export interface FilterMaintenanceDto {
  carId?: string
  agencyId?: string
  status?: string
  type?: string
  scheduledStartDateFrom?: string
  scheduledStartDateTo?: string
}

export interface UpdateMaintenanceDto extends CreateMaintenanceDto {
  id:string
}
