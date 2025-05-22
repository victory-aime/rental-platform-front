import { AxiosError } from 'axios'

/**
 * Represents the structure of application version information.
 */
export type HandleAppVersionBody = {
  /**
   * Version description in multiple languages.
   */
  description?: {
    ar: string
    fr: string
    en: string
  }
  /**
   * Unique key identifying the version.
   */
  versionKey?: string
  /**
   * Indicates whether an action is blocked in this version.
   */
  blockedAction?: boolean
}

/**
 * Interface for managing application-wide context.
 */
export interface IApplicationContext {
  /**
   * Retrieves the API configuration.
   */
  getApiConfig(): any

  /**
   * Handles global errors.
   * @param response - The API response or error object.
   */
  handleError(response: AxiosError): void

  /**
   * Handles information messages to display.
   * @param response - The API response or info object.
   */
  handleInfo(response: any): void

  /**
   * Handles application version-related data.
   * @param response - The version information.
   */
  handleAppVersion(response: HandleAppVersionBody): void

  /**
   * Handles device-related information.
   * @param response - Device data.
   */
  handleDeviceInfo(response: any): void

  /**
   * Returns the loader (loading indicator) service.
   */
  getLoaderService(): any

  /**
   * Retrieves device data as a string.
   */
  getDeviceDataAsString(): string

  /**
   * Returns the current language used by the application.
   */
  getCurrentLanguage(): string

  /**
   * Extracts the appropriate string from a multilingual value.
   * @param value - An object containing language-based values.
   */
  getAttributeLanguage(value: any): string

  /**
   * Returns the current version of the application.
   */
  getAppVersion(): string

  /**
   * Indicates whether the app version has been handled already.
   */
  handledAppVersion: boolean

  /**
   * Sets whether the app version has been handled.
   * @param value - Boolean flag.
   */
  setHandledAppVersion(value: boolean): void

  /**
   * Returns whether global error handling is enabled.
   */
  getShouldHandleError(): boolean

  /**
   * Sets whether global error handling should be enabled.
   * @param value - Boolean flag.
   */
  setShouldHandleError(value: boolean): void

  /**
   * Sets the authentication token.
   * @param token - The token string.
   */
  setToken(token: string): void

  /**
   * Retrieves the current authentication token.
   */
  getToken(): string | undefined
}
