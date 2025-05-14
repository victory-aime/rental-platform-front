import { applicationInstance } from '../../context'
import { CarsModule } from 'platform-business'

export const carsServiceInstance = () => {
  const context = applicationInstance.getContext()
  if (!context) {
    throw new Error("[CarsService] Aucun contexte d'application défini.")
  }
  return new CarsModule.CarsServices(context)
}
