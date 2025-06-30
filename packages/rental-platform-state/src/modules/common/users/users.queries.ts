import * as Constants from './constants'
import { usersServiceInstance } from './users.service-instance'
import { TYPES } from 'rental-platform-shared'
import { AxiosError } from 'axios'

const userInfoQueries = (args: TYPES.QUERIES.QueryPayload<{ userId: string }, any>) => {
  const { payload, queryOptions } = args
  return TYPES.QUERIES.useCustomQuery<TYPES.MODELS.COMMON.USERS.IUser, AxiosError>({
    queryKey: [Constants.USERS_KEYS.WHO_AMI],
    queryFn: () => usersServiceInstance().whoAmI({ userId: payload?.userId! }),
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
    mutationFn: ({ payload, params }) => usersServiceInstance().updateUser(payload!, params),
    options: args.mutationOptions,
  })
}

const deactivateAccountMutation = (
  args: TYPES.QUERIES.MutationPayload<TYPES.MODELS.COMMON.USERS.IDeactivateAccount>
) => {
  return TYPES.QUERIES.useCustomMutation<
    TYPES.MODELS.COMMON.USERS.IDeactivateAccount,
    any,
    AxiosError
  >({
    mutationKey: [Constants.USERS_KEYS.DEACTIVATE_ACCOUNT],
    mutationFn: ({ params }) => usersServiceInstance().deactivateAccount(params),
    options: args.mutationOptions,
  })
}

const activateAccountMutation = (args: TYPES.QUERIES.MutationPayload<{ email: string }>) => {
  return TYPES.QUERIES.useCustomMutation<{ email: string }, any, AxiosError>({
    mutationKey: [Constants.USERS_KEYS.ACTIVATE_ACCOUNT],
    mutationFn: ({ params }) => usersServiceInstance().activateAccount(params),
    options: args.mutationOptions,
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
    mutationFn: ({ params }) => usersServiceInstance().clearAllSessions(params),
    options: args.mutationOptions,
  })
}

export {
  userInfoQueries,
  updateUserInfoMutation,
  deactivateAccountMutation,
  activateAccountMutation,
  clearAllSessionsMutation,
}
