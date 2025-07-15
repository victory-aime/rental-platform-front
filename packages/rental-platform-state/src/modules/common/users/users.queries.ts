import * as Constants from './constants'
import { usersServiceInstance } from './users.service-instance'
import { TYPES } from 'rental-platform-shared'
import { QUERIES } from 'rise-core-frontend'
import { AxiosError } from 'axios'

const userInfoQueries = (args: QUERIES.QueryPayload<{ userId: string }, any>) => {
  const { payload, queryOptions } = args
  return QUERIES.useCustomQuery<TYPES.MODELS.COMMON.USERS.IUser, AxiosError>({
    queryKey: [Constants.USERS_KEYS.WHO_AMI],
    queryFn: () => usersServiceInstance().whoAmI({ userId: payload?.userId! }),
    options: queryOptions,
  })
}

const credentialInfoQueries = (args: QUERIES.QueryPayload<{ keycloakId: string }, any>) => {
  const { payload, queryOptions } = args
  return QUERIES.useCustomQuery<{ message: string; data: any[] }, AxiosError>({
    queryKey: [Constants.USERS_KEYS.CREDENTIAL_LIST],
    queryFn: () => usersServiceInstance().credentialList({ keycloakId: payload?.keycloakId! }),
    options: queryOptions,
  })
}

const getAllSessionsQueries = (args: QUERIES.QueryPayload<{ keycloakId: string }, any>) => {
  const { payload, queryOptions } = args
  return QUERIES.useCustomQuery<{ message: string; sessions: any }, AxiosError>({
    queryKey: [Constants.USERS_KEYS.SESSIONS],
    queryFn: () => usersServiceInstance().allSessions({ keycloakId: payload?.keycloakId! }),
    options: queryOptions,
  })
}

const updateUserInfoMutation = (
  args: QUERIES.MutationPayload<TYPES.MODELS.COMMON.USERS.IUpdateUserInfo>
) => {
  return QUERIES.useCustomMutation<TYPES.MODELS.COMMON.USERS.IUpdateUserInfo, any, AxiosError>({
    mutationKey: [Constants.USERS_KEYS.UPDATE_USER],
    mutationFn: ({ payload, params }) => usersServiceInstance().updateUser(payload!, params),
    options: args.mutationOptions,
  })
}

const deactivateAccountMutation = (
  args: QUERIES.MutationPayload<TYPES.MODELS.COMMON.USERS.IDeactivateAccount>
) => {
  return QUERIES.useCustomMutation<TYPES.MODELS.COMMON.USERS.IDeactivateAccount, any, AxiosError>({
    mutationKey: [Constants.USERS_KEYS.DEACTIVATE_ACCOUNT],
    mutationFn: ({ params }) => usersServiceInstance().deactivateAccount(params),
    options: args.mutationOptions,
  })
}

const activateAccountMutation = (args: QUERIES.MutationPayload<string>) => {
  return QUERIES.useCustomMutation<string, any, AxiosError>({
    mutationKey: [Constants.USERS_KEYS.ACTIVATE_ACCOUNT],
    mutationFn: ({ payload }) => usersServiceInstance().activateAccount(payload!),
    options: args.mutationOptions,
  })
}

const clearAllSessionsMutation = (
  args: QUERIES.MutationPayload<TYPES.MODELS.COMMON.USERS.IUpdateUserInfo>
) => {
  return QUERIES.useCustomMutation<TYPES.MODELS.COMMON.USERS.IUpdateUserInfo, any, AxiosError>({
    mutationKey: [Constants.USERS_KEYS.CLEAR_ALL_SESSIONS],
    mutationFn: ({ params }) => usersServiceInstance().clearAllSessions(params),
    options: args.mutationOptions,
  })
}

const registerPasskeyMutation = (
  args: QUERIES.MutationPayload<TYPES.MODELS.COMMON.USERS.IUser>
) => {
  return QUERIES.useCustomMutation<TYPES.MODELS.COMMON.USERS.IUser, any, AxiosError>({
    mutationKey: [Constants.USERS_KEYS.CREATE_PASSKEY],
    mutationFn: ({ params }) => usersServiceInstance().registerPasskey(params),
    options: args.mutationOptions,
  })
}

const revokePasskeyMutation = (
  args: QUERIES.MutationPayload<{
    keycloakId: string
    credentialId: string
  }>
) => {
  return QUERIES.useCustomMutation<{ keycloakId: string; credentialId: string }, any, AxiosError>({
    mutationKey: [Constants.USERS_KEYS.REVOKE_PASSKEY],
    mutationFn: ({ params }) => usersServiceInstance().revokePasskey(params),
    options: args.mutationOptions,
  })
}

const revokeSessionsMutation = (args: QUERIES.MutationPayload<TYPES.MODELS.COMMON.USERS.IUser>) => {
  return QUERIES.useCustomMutation<TYPES.MODELS.COMMON.USERS.IUser, any, AxiosError>({
    mutationKey: [Constants.USERS_KEYS.REVOKE_SESSION],
    mutationFn: ({ params }) => usersServiceInstance().revokeSessions(params),
    options: args.mutationOptions,
  })
}

export {
  userInfoQueries,
  credentialInfoQueries,
  getAllSessionsQueries,
  updateUserInfoMutation,
  deactivateAccountMutation,
  activateAccountMutation,
  clearAllSessionsMutation,
  registerPasskeyMutation,
  revokePasskeyMutation,
  revokeSessionsMutation,
}
