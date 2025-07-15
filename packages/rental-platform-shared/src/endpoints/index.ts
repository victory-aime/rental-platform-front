import { ApiActionProps, APIObjectType, createApiAction } from 'rise-core-frontend'

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
        REGISTER_PASSKEY: api({
          path: '/user/create-passkey',
          method: 'POST',
          showResponse: false,
        }),
        REVOKE_PASSKEY: api({
          path: '/user/revoke-passkey',
          method: 'POST',
          showResponse: false,
        }),
        CREDENTIALS_LIST: api({
          path: '/user/credentials-list',
          method: 'GET',
          showResponse: false,
        }),
        SESSIONS: api({
          path: '/user/sessions',
          method: 'GET',
          showResponse: false,
        }),
        REVOKE_SESSIONS: api({
          path: '/user/sessions-delete',
          method: 'POST',
          showResponse: false,
        }),
      },
      OTP: {
        GENERATE: api({
          path: '/otp/generate',
          method: 'POST',
          pathBase: 'UNSECURED_API',
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
        DELETE_CAR: api({
          path: '/manage-cars/delete-car',
          method: 'DELETE',
        }),
        DELETE_ALL_CARS: api({
          path: '/manage-cars/delete-all-cars',
          method: 'DELETE',
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
