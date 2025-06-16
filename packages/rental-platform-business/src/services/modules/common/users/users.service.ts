import { BaseApi } from '../../../../api'
import { TYPES } from 'rental-platform-shared'

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
    return this.apiService.invoke(this.applicationContext.getApiConfig().COMMON.USERS.ME, userId)
  }

  /**
   * Updates the current user's information.
   *
   * @param {Object} [user] - The user data to update.
   * @returns {Promise<any>} - A promise resolving to the updated user information.
   */
  updateUser(user: TYPES.MODELS.COMMON.USERS.IUpdateUserInfo): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().COMMON.USERS.UPDATE_USER,
      user
    )
  }
}
