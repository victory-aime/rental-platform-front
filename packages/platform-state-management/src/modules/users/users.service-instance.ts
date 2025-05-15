import { applicationInstance } from '../../context'
import { UserModule } from 'platform-business'

export const usersServiceInstance = () => {
  const context = applicationInstance.getContext()
  if (!context) {
    throw new Error('[UserService] No context found.')
  }
  return new UserModule.UsersService(context)
}
