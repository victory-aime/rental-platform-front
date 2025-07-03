import * as Constants from './constants'
import { otpServiceInstance } from './otp.service-instance'
import { TYPES } from 'rental-platform-shared'
import { AxiosError } from 'axios'

const generateOtpMutation = (args: TYPES.QUERIES.MutationPayload<string>) => {
  return TYPES.QUERIES.useCustomMutation<string, any, AxiosError>({
    mutationKey: [Constants.OTP_KEYS.GENERATE],
    mutationFn: ({ payload }) => otpServiceInstance().generateOtp(payload!),
    options: args.mutationOptions,
  })
}

const validateOtpMutation = (args: TYPES.QUERIES.MutationPayload<TYPES.MODELS.COMMON.OTP.IOtp>) => {
  return TYPES.QUERIES.useCustomMutation<TYPES.MODELS.COMMON.OTP.IOtp, any, AxiosError>({
    mutationKey: [Constants.OTP_KEYS.VALIDATE_OTP],
    mutationFn: ({ payload }) => otpServiceInstance().validateOtp(payload!),
    options: args.mutationOptions,
  })
}

export { generateOtpMutation, validateOtpMutation }
