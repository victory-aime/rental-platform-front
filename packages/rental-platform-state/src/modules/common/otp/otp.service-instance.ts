import { applicationInstance } from '../../../context'
import { CommonModule } from 'rental-platform-business'

export const otpServiceInstance = () => {
  const context = applicationInstance.getContext()
  if (!context) {
    throw new Error('[OtpService] No context found.')
  }
  return new CommonModule.OtpModule.OtpService(context)
}
