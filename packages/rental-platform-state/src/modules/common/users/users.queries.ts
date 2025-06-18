import * as Constants from './constants'
import { usersServiceInstance } from './users.service-instance'
import { TYPES } from 'rental-platform-shared'
import { AxiosError } from 'axios'

const userInfoQueries = (args: TYPES.QUERIES.QueryPayload<{ userId: string }, any>) => {
  const { payload, queryOptions } = args
  return TYPES.QUERIES.useCustomQuery<TYPES.MODELS.COMMON.USERS.IUser, AxiosError>({
    queryKey: [Constants.USERS_KEYS.WHO_AMI],
    queryFn: () => usersServiceInstance().whoAmI({ userId: payload.userId }),
    options: queryOptions,
  })
}

const updateUserInfoMutation = (
  args: TYPES.QUERIES.MutationPayload<TYPES.MODELS.COMMON.USERS.IUpdateUserInfo>
) => {
  return TYPES.QUERIES.useCustomMutation<
    TYPES.MODELS.COMMON.USERS.IUpdateUserInfo,
    any,
    AxiosError
  >({
    mutationKey: [Constants.USERS_KEYS.UPDATE_USER],
    mutationFn: (payload) => usersServiceInstance().updateUser(payload),
    options: args,
  })
}

const deactivateOrActivateAccountMutation = (
  args: TYPES.QUERIES.MutationPayload<{ keycloakId: string; enabledOrDeactivate: boolean }>
) => {
  return TYPES.QUERIES.useCustomMutation<
    { keycloakId: string; enabledOrDeactivate: boolean },
    any,
    AxiosError
  >({
    mutationKey: [Constants.USERS_KEYS.DEACTIVATE_OR_ACTIVATE_ACCOUNT],
    mutationFn: (data) =>
      usersServiceInstance().deactivateOrActivateAccount({
        deactivateUser: data.enabledOrDeactivate,
        keycloakId: data.keycloakId,
      }),
    options: args,
  })
}

const clearAllSessionsMutation = (
  args: TYPES.QUERIES.MutationPayload<TYPES.MODELS.COMMON.USERS.IUpdateUserInfo>
) => {
  return TYPES.QUERIES.useCustomMutation<
    TYPES.MODELS.COMMON.USERS.IUpdateUserInfo,
    any,
    AxiosError
  >({
    mutationKey: [Constants.USERS_KEYS.CLEAR_ALL_SESSIONS],
    mutationFn: (data) => usersServiceInstance().clearAllSessions(data?.keycloakId!),
    options: args,
  })
}

export {
  userInfoQueries,
  updateUserInfoMutation,
  deactivateOrActivateAccountMutation,
  clearAllSessionsMutation,
}
