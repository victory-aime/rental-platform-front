import { BaseApi } from '../../../../api'
import { TYPES } from 'rental-platform-shared'

/**
 * OtpService provides methods for handling One-Time Password (OTP) operations
 * such as generating, renewing, and validating OTP codes through API endpoints.
 */
export class OtpService extends BaseApi {
  /**
   * Generates a new OTP for the user.
   *email - The OTP request email data.
   * @returns {Promise<any>} - A promise resolving to the response of the OTP generation process.
   */
  generateOtp(email: string): Promise<any> {
    return this.apiService.invoke(this.applicationContext.getApiConfig().COMMON.OTP.GENERATE, {
      email,
    })
  }

  /**
   * Validates a submitted OTP for the user.
   *
   * @param {TYPES.MODELS.COMMON.OTP.IOtp} payload - The OTP validation request payload.
   * @returns {Promise<any>} - A promise resolving to the result of the OTP validation.
   */
  validateOtp(payload: TYPES.MODELS.COMMON.OTP.IOtp): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().COMMON.OTP.VALIDATE,
      payload
    )
  }
}
