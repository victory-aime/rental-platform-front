import { applicationInstance } from '../../context'
import { UserModule } from 'platform-business'

export const usersServiceInstance = () => {
  const context = applicationInstance.getContext()
  if (!context) {
    throw new Error("[UserService] Aucun contexte d'application défini.")
  }
  return new UserModule.UsersService(context)
}
