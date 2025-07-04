import { BaseApi } from '../../../../api'
import { TYPES } from 'rental-platform-shared'

/**
 * Service class for managing user-related operations in the application.
 *
 * Provides methods to retrieve and update user information, activate or deactivate accounts,
 * manage user sessions, and handle passkey credentials. All methods interact with the backend
 * API through the underlying `apiService` and use API endpoints defined in the application context.
 *
 * This service provides methods to:
 * - Retrieve the current user's information.
 * - Update user information.
 * - Activate or deactivate user accounts.
 * - Manage user sessions (clear, list, revoke).
 * - Register and revoke passkeys for authentication.
 *
 * @example
 * const usersService = new UsersService(context)
 * await usersService.whoAmI({ userId: 'abc123' })
 * await usersService.updateUser(formData, { keycloakId: 'abc123' })
 *
 * @extends BaseApi
 */
export class UsersService extends BaseApi {
  /**
   * Retrieves the current user's information.
   *
   * @param {Object} [userId] - Optional object containing the user ID.
   * @param {string} userId.userId - The ID of the user.
   * @returns {Promise<any>} A promise resolving to the user information.
   */
  whoAmI(userId?: { userId: string }): Promise<any> {
    return this.apiService.invoke(this.applicationContext.getApiConfig().COMMON.USERS.ME, userId)
  }

  /**
   * Updates the current user's information.
   *
   * @param {TYPES.MODELS.COMMON.USERS.IUpdateUserInfo | FormData} user - The user data to update.
   * @param {Object} params - Parameters containing user context.
   * @param {string} params.keycloakId - The ID of the user in Keycloak.
   * @returns {Promise<any>} A promise resolving to the updated user data.
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
   * @param {TYPES.MODELS.COMMON.USERS.IDeactivateAccount} params - Parameters for account deactivation.
   * @returns {Promise<any>} A promise resolving to the result of the operation.
   */
  deactivateAccount(params: TYPES.MODELS.COMMON.USERS.IDeactivateAccount): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().COMMON.USERS.DEACTIVATE_ACCOUNT,
      {},
      { params }
    )
  }

  /**
   * Activates or reactivates a user account.
   *
   * @param {string} email - The user's email address.
   * @returns {Promise<any>} A promise resolving to the result of the operation.
   */
  activateAccount(email: string): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().COMMON.USERS.ACTIVATE_ACCOUNT,
      { email }
    )
  }

  /**
   * Clears all sessions for a user.
   *
   * @param {Object} params - Parameters for session clearing.
   * @param {string} params.keycloakId - The ID of the user.
   * @returns {Promise<any>} A promise resolving to the result.
   */
  clearAllSessions(params: { keycloakId: string }): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().COMMON.USERS.CLEAR_ALL_SESSIONS,
      {},
      { params }
    )
  }

  /**
   * Registers a new passkey credential for the user.
   *
   * @param {Object} params - Parameters for passkey registration.
   * @param {string} params.keycloakId - The ID of the user.
   * @returns {Promise<any>} A promise resolving to the registration result.
   */
  registerPasskey(params: { keycloakId: string }): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().COMMON.USERS.REGISTER_PASSKEY,
      {},
      { params }
    )
  }

  /**
   * Revokes a passkey credential for the user.
   *
   * @param {Object} params - Parameters for passkey revocation.
   * @param {string} params.keycloakId - The ID of the user.
   * @param {string} params.credentialId - The ID of the credential to revoke.
   * @returns {Promise<any>} A promise resolving to the result.
   */
  revokePasskey(params: { keycloakId: string; credentialId: string }): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().COMMON.USERS.REVOKE_PASSKEY,
      {},
      { params }
    )
  }

  /**
   * Retrieves the list of passkey credentials for a user.
   *
   * @param {Object} params - Parameters to fetch credentials.
   * @param {string} params.keycloakId - The ID of the user.
   * @returns {Promise<any>} A promise resolving to the list of credentials.
   */
  credentialList(keycloakId: { keycloakId: string }): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().COMMON.USERS.CREDENTIALS_LIST,
      keycloakId
    )
  }

  /**
   * Retrieves all active sessions for a user.
   *
   * @param {Object} params - Parameters for session retrieval.
   * @param {string} params.keycloakId - The ID of the user.
   * @returns {Promise<any>} A promise resolving to the list of sessions.
   */
  allSessions(keycloakId: { keycloakId: string }): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().COMMON.USERS.SESSIONS,
      keycloakId
    )
  }

  /**
   * Revokes all active sessions for a user.
   *
   * @param {Object} params - Parameters for session revocation.
   * @param {string} params.keycloakId - The ID of the user.
   * @returns {Promise<any>} A promise resolving to the revocation result.
   */
  revokeSessions(params: { keycloakId: string }): Promise<any> {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().COMMON.USERS.REVOKE_SESSIONS,
      {},
      { params }
    )
  }
}
