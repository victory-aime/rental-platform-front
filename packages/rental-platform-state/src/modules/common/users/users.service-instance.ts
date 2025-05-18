import { applicationInstance } from '../../../context'
import { CommonModule } from 'rental-platform-business'

export const usersServiceInstance = () => {
  const context = applicationInstance.getContext()
  if (!context) {
    throw new Error('[UserService] No context found.')
  }
  return new CommonModule.UserModule.UsersService(context)
}
