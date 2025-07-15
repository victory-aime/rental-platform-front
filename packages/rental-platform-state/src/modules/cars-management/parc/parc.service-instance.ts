import { applicationInstance } from 'rise-core-frontend'
import { CarsModule } from 'rental-platform-business'

export const parcsServiceInstance = () => {
  const context = applicationInstance.getContext()
  if (!context) {
    throw new Error('[parcsService] No context found.')
  }
  return new CarsModule.Parc.ParcServices(context)
}
