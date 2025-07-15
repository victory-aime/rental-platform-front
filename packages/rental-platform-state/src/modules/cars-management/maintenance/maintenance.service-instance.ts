import { applicationInstance } from 'rise-core-frontend'
import { CarsModule } from 'rental-platform-business'

export const maintenanceServiceInstance = () => {
  const context = applicationInstance.getContext()
  if (!context) {
    throw new Error('[MaintenanceServices] No context found.')
  }
  return new CarsModule.Maintenance.MaintenanceServices(context)
}
