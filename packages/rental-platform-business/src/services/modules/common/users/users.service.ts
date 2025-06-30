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
   * @param params
   * @returns {Promise<any>} - A promise resolving to the updated user information.
   */
  updateUser(
    user: TYPES.MODELS.COMMON.USERS.IUpdateUserInfo | FormData,
    params: { keycloakId: string }
  ): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().COMMON.USERS.UPDATE_USER,
      user,
      { params }
    )
  }

  /**
   * Deactivates a user account.
   *
   * @returns {Promise<any>} - A promise resolving to the result of the operation.
   * @param params
   */
  deactivateAccount(params: TYPES.MODELS.COMMON.USERS.IDeactivateAccount): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().COMMON.USERS.DEACTIVATE_ACCOUNT,
      {},
      { params }
    )
  }

  /**
   * Deactivates or activates a user account.
   *
   * @returns {Promise<any>} - A promise resolving to the result of the operation.
   * @param params
   */
  activateAccount(params: { email: string }): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().COMMON.USERS.ACTIVATE_ACCOUNT,
      {},
      { params }
    )
  }
  /**
   * Clears all sessions for a user.
   * @returns {Promise<any>} - A promise resolving to the result of the session clearing operation.
   * @param params
   */
  clearAllSessions(params: { keycloakId: string }): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().COMMON.USERS.CLEAR_ALL_SESSIONS,
      {},
      { params }
    )
  }
}
