import { BaseApi } from '../../../../api'

/**
 * UsersService provides methods for retrieving and updating user information
 * through the application's user-related API endpoints.
 */
export class UsersService extends BaseApi {
  /**
   * Retrieves the current user's information.
   *
   * @param {Object} [userId] - Optional user identifier.
   * @param {string} userId.userId - The ID of the user.
   * @returns {Promise<any>} - A promise resolving to the user information.
   */
  whoAmI(userId?: { userId: string }): Promise<any> {
    return this.apiService.invoke(this.applicationContext.getApiConfig().USERS.PRIVATE.ME, userId)
  }
}
