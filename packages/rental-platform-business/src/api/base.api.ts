import { ApiService } from '.'
import { IApplicationContext } from 'rental-platform-state'

/**
 * Base API class to be extended by all service classes.
 * Provides shared access to ApiService and the application context.
 */
export class BaseApi {
  protected apiService: ApiService
  protected applicationContext: IApplicationContext

  /**
   * @param applicationContext - The application context instance
   */
  constructor(applicationContext: IApplicationContext) {
    this.applicationContext = applicationContext
    this.apiService = new ApiService(applicationContext)
  }
}
