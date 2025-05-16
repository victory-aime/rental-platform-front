import axios, { AxiosRequestConfig } from 'axios'
import { APIObjectType } from 'rental-platform-shared'
import { IApplicationContext } from 'rental-platform-state'
import { InvokeOptions } from './types'

/**
 * Generic API service for handling HTTP requests.
 */
export class ApiService {
  constructor(private applicationContext: IApplicationContext) {}

  /**
   * Executes an API call with optional payload and headers.
   * Automatically handles authorization and response parsing.
   *
   * @template RQ - Request payload type.
   * @template RS - Response payload type.
   * @param endpoint - API endpoint configuration.
   * @param requestData - Optional request payload.
   * @param options - Additional invocation options.
   * @returns A Promise resolving with the response payload.
   */
  invoke<RQ = any, RS = any>(
    endpoint: APIObjectType,
    requestData?: RQ,
    options?: InvokeOptions
  ): Promise<RS> {
    const token = this.applicationContext.getToken()
    const config: AxiosRequestConfig = {
      url: endpoint.url,
      method: endpoint.method,
      responseType: endpoint.responseType as any,
      headers: {
        ...(endpoint.headers || {}),
        ...(options?.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }

    if (['POST', 'PUT', 'PATCH'].includes(endpoint.method)) {
      config.data = requestData
    } else {
      config.params =
        requestData && typeof requestData === 'object'
          ? requestData
          : requestData !== undefined
            ? { value: requestData }
            : undefined
    }

    return axios(config)
      .then((res) => {
        if (endpoint.showResponse !== false) {
          this.applicationContext.handleInfo(res)
        }
        return res.data as RS
      })
      .catch((error) => {
        if (endpoint.handleErrorManually !== false) {
          this.applicationContext.handleError(error)
        }
        throw error
      })
  }
}
