import { AxiosError } from 'axios'
import { HandleAppVersionBody, IApplicationContext } from './types'

/**
 * Default implementation of the application context.
 * Can be extended or overridden in the UI project as needed.
 */
export class ApplicationContext implements IApplicationContext {
  protected apiConfigs?: any
  protected loaderService?: any

  /**
   * Whether the application version has been handled.
   */
  handledAppVersion = false

  /**
   * Whether global error handling is enabled.
   */
  private shouldHandleError = true

  /**
   * Key used to transmit the handover token in API requests.
   */
  handoverTokenKey = ''

  constructor() {}

  getApiConfig(): any {
    return this.apiConfigs
  }

  handleError(response: AxiosError): void {
    console.log(response)
  }

  /**
   * Handles information messages from API responses.
   * @param response - The info data to handle.
   */
  handleInfo(response: { data: any; status: number }): void {
    console.log(response)
  }

  handleAppVersion(response: HandleAppVersionBody): void {
    console.log(response)
  }

  handleDeviceInfo(response: any): void {
    console.log(response)
  }

  getLoaderService(): any {
    return this.loaderService
  }

  /**
   * @inheritdoc
   */
  getDeviceDataAsString(): string {
    return JSON.stringify({
      platform: 'mobile',
      os: 'unknown',
    })
  }

  getCurrentLanguage(): string {
    return 'en'
  }

  getAttributeLanguage(value: any): string {
    const lang = this.getCurrentLanguage()
    return value?.[lang] ?? ''
  }

  getAppVersion(): string {
    return ''
  }

  setHandledAppVersion(value: boolean): void {
    this.handledAppVersion = value
  }

  getShouldHandleError(): boolean {
    return this.shouldHandleError
  }

  setShouldHandleError(value: boolean): void {
    this.shouldHandleError = value
  }

  /**
   * Returns the current access channel (e.g., mobile, web).
   */
  getChannel(): string {
    return ''
  }

  private authToken?: string

  setToken(token: string): void {
    this.authToken = token
  }

  private refreshToken?: string

  /**
   * Sets the refresh token.
   * @param refreshToken - The token string.
   */
  setRefreshToken(refreshToken: string): void {
    this.refreshToken = refreshToken
  }

  getToken(): string | undefined {
    return this.authToken
  }

  /**
   * Retrieves the current refresh token.
   */
  getRefreshToken(): string | undefined {
    return this.refreshToken
  }
}
