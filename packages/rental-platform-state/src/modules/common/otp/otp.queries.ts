import * as Constants from './constants'
import { otpServiceInstance } from './otp.service-instance'
import { TYPES } from 'rental-platform-shared'
import { QUERIES } from 'rise-core-frontend'
import { AxiosError } from 'axios'

const generateOtpMutation = (args: QUERIES.MutationPayload<string>) => {
  return QUERIES.useCustomMutation<string, any, AxiosError>({
    mutationKey: [Constants.OTP_KEYS.GENERATE],
    mutationFn: ({ payload }) => otpServiceInstance().generateOtp(payload!),
    options: args.mutationOptions,
  })
}

const validateOtpMutation = (args: QUERIES.MutationPayload<TYPES.MODELS.COMMON.OTP.IOtp>) => {
  return QUERIES.useCustomMutation<TYPES.MODELS.COMMON.OTP.IOtp, any, AxiosError>({
    mutationKey: [Constants.OTP_KEYS.VALIDATE_OTP],
    mutationFn: ({ payload }) => otpServiceInstance().validateOtp(payload!),
    options: args.mutationOptions,
  })
}

export { generateOtpMutation, validateOtpMutation }
