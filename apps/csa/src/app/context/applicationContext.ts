import { APIS } from 'platform-shared'
import { ApplicationContext } from 'platform-state-management'
import { handleApiError } from '_utils/handleApiError'
import { handleApiSuccess } from '_utils/handleApiSuccess'

/**
 * @class GlobalApplicationContext
 * @extends
 * This is where to keep all UI project specific configs and implementation
 * to be used by the underlying layers (StateManagement, Business and Core)
 */
export class GlobalApplicationContext extends ApplicationContext {
  private readonly baseUrl: string

  constructor(baseUrl: string) {
    super()
    this.baseUrl = baseUrl
  }

  /**
   * Holds all possible API configs to be used within the app
   */
  getApiConfig(): any {
    return APIS(this.baseUrl)
  }

  handleError(response: { status: number; message: string }) {
    if (response?.status === 401) {
      super.setRefreshToken('')
      super.setToken('')
      return
    } else handleApiError(response)
  }

  handleInfo(response: { data: any; status: number }) {
    const message = response?.data?.message
    const status = response?.status
    handleApiSuccess({
      message,
      status,
    })
  }

  setToken(token: string): void {
    super.setToken(token)
  }
  setRefreshToken(refreshToken: string) {
    super.setRefreshToken(refreshToken)
  }
}
