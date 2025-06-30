type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type APIObjectType = {
  url: string
  method: MethodType
  responseType?: string
  headers?: any
  showResponse?: boolean
  handleErrorManually?: boolean
}

export const API_BASIC_URL = {
  SECURED_API: '/secure',
  UNSECURED_API: '/unsecured',
}
type PathBaseKeys = keyof typeof API_BASIC_URL

export enum PlatformType {
  WEB = 'WEB',
}

const API_BASIC_URL_MAP: Record<PlatformType, typeof API_BASIC_URL> = {
  [PlatformType.WEB]: API_BASIC_URL,
}

type ApiActionProps = {
  path: string
  method: MethodType
  pathBase?: PathBaseKeys
  platformType?: PlatformType
  baseUrl?: string
  responseType?: string
  showResponse?: boolean
  handleErrorManually?: boolean
}

const createApiAction = ({
  path,
  method,
  pathBase = 'SECURED_API',
  platformType = PlatformType.WEB,
  baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL + '_api/v1',
  responseType,
  showResponse = true,
  handleErrorManually = true,
}: ApiActionProps): APIObjectType => {
  const base = API_BASIC_URL_MAP[platformType][pathBase]
  return {
    url: `${baseUrl}${base}${path}`,
    method,
    responseType,
    showResponse,
    handleErrorManually,
  }
}

export const APIS = (baseUrl?: string) => {
  const api = (args: Omit<ApiActionProps, 'baseUrl'>): APIObjectType =>
    createApiAction({ ...args, baseUrl })

  return {
    COMMON: {
      USERS: {
        ME: api({
          path: '/user/me',
          method: 'GET',
          showResponse: false,
          handleErrorManually: false,
        }),
        UPDATE_USER: api({ path: '/user/update-user', method: 'PATCH' }),
        DEACTIVATE_ACCOUNT: api({
          path: '/user/deactivate-account',
          method: 'PUT',
        }),
        CLEAR_ALL_SESSIONS: api({
          path: '/user/clear-all-sessions',
          method: 'POST',
          showResponse: false,
        }),
        ACTIVATE_ACCOUNT: api({
          path: '/user/activate-account',
          method: 'POST',
        }),
      },
      OTP: {
        GENERATE: api({
          path: '/otp/generate',
          method: 'POST',
          pathBase: 'UNSECURED_API',
          showResponse: false,
        }),
        RENEW: api({
          path: '/otp/renewOtp',
          pathBase: 'UNSECURED_API',
          method: 'POST',
        }),
        VALIDATE: api({
          path: '/otp/validate',
          method: 'POST',
          pathBase: 'UNSECURED_API',
          handleErrorManually: false,
        }),
      },
    },
    MODULES: {
      CARS: {
        GET_CATEGORIES: api({
          path: '/categories',
          method: 'GET',
          showResponse: false,
        }),
        GET_EQUIPMENTS: api({
          path: '/equipments',
          method: 'GET',
          showResponse: false,
        }),
        ADD_CAR: api({
          path: '/manage-cars/add',
          method: 'POST',
          showResponse: true,
        }),
        GET_CARS: api({
          path: '/manage-cars/cars-list',
          method: 'GET',
          showResponse: false,
        }),
        UPDATE_CAR: api({
          path: '/manage-cars/update-car',
          method: 'PATCH',
        }),
        PARC: {
          LIST: api({
            path: '/manage-parcs/list',
            method: 'GET',
            showResponse: false,
          }),
          ADD_PARC: api({
            path: '/manage-parcs/create-parc',
            method: 'POST',
          }),
          UPDATE_PARC: api({
            path: '/manage-parcs/update-parc',
            method: 'POST',
          }),
          DELETE_PARC: api({
            path: '/manage-parcs/delete-parc',
            method: 'DELETE',
          }),
        },

        MAINTENANCE: {
          LIST: api({
            path: '/maintenances/list',
            method: 'GET',
            showResponse: false,
          }),
          ADD: api({
            path: '/maintenances/add',
            method: 'POST',
          }),
          UPDATE: api({
            path: '/maintenances/update',
            method: 'POST',
            showResponse: false,
          }),
          CLOSED: api({
            path: '/maintenances/close-maintenance',
            method: 'POST',
            showResponse: false,
          }),
        },
      },
    },
  }
}
