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
    USERS: {
      PRIVATE: {
        ME: api({
          path: '/user/me',
          method: 'GET',
          showResponse: false,
          handleErrorManually: false,
        }),
        UPDATE_USER: api({ path: '/user/update-info', method: 'PATCH' }),
      },
    },
    COMMON:{
      CARS: {
        GET_CATEGORIES: api({
          path:'/categories',
          method: 'GET',
          showResponse: false,
        handleErrorManually:true        }),
        GET_EQUIPMENTS:api({
          path:'/equipments',
          method:'GET',
          showResponse:false,
          handleErrorManually:true,
        }),
       
      }
    },
    MODULES:{
      CARS:{
        ADD_CAR: api({
          path:'/manage-cars/add',
          method: 'POST',
          showResponse: true,
          handleErrorManually:true,
        })
      }
    }
  }
}
