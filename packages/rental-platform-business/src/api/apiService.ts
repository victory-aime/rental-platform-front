import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { APIObjectType } from 'rental-platform-shared'
import { IApplicationContext } from 'rental-platform-state'
import { InvokeOptions } from './types'

/**
 * Generic API service for handling HTTP requests.
 * Automatically handles:
 * - Authorization headers from application context
 * - JSON vs FormData detection
 * - Response parsing and error handling
 */
export class ApiService {
  constructor(private applicationContext: IApplicationContext) {}

  /**
   * Executes an API call with optional payload and headers.
   *
   * @template RQ - Request payload type
   * @template RS - Response payload type
   * @param endpoint - API endpoint configuration including URL, method, headers, etc.
   * @param requestData - The body payload to be sent in the request
   * @param options - Additional Axios config options (params, custom headers, etc.)
   * @returns A Promise resolving with the parsed response payload
   */
  invoke<RQ = any, RS = any>(
    endpoint: APIObjectType,
    requestData?: RQ,
    options?: InvokeOptions & { params?: Record<string, any> }
  ): Promise<RS> {
    const token = this.applicationContext.getToken()
    const isBodyMethod = ['POST', 'PUT', 'PATCH'].includes(endpoint.method)
    const headers: Record<string, string> = {
      ...(endpoint.headers ?? {}),
      ...(options?.headers ?? {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }

    const config: AxiosRequestConfig = {
      url: endpoint.url,
      method: endpoint.method,
      responseType: endpoint.responseType as any,
      headers,
    }

    if (isBodyMethod && !headers['Content-Type'] && !(requestData instanceof FormData)) {
      headers['Content-Type'] = 'application/json'
    }
    if (isBodyMethod) {
      config.data = requestData
      if (options?.params) {
        config.params = options.params
      }
    } else {
      config.params =
        options?.params ??
        (requestData && typeof requestData === 'object'
          ? requestData
          : requestData !== undefined
            ? { value: requestData }
            : undefined)
    }

    return axios(config)
      .then((res) => {
        if (endpoint.showResponse !== false) {
          this.applicationContext.handleInfo(res)
        }
        return res.data as RS
      })
      .catch((error: AxiosError) => {
        if (endpoint.handleErrorManually !== false) {
          this.applicationContext.handleError(error)
        }
        throw error
      })
  }
}
