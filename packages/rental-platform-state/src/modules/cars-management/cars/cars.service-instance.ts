import { applicationInstance } from 'rise-core-frontend'
import { CarsModule } from 'rental-platform-business'

export const carsServiceInstance = () => {
  const context = applicationInstance.getContext()
  if (!context) {
    throw new Error('[CarsService] No context found.')
  }
  return new CarsModule.CarsServices(context)
}
