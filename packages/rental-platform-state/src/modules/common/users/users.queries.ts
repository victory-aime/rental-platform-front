import * as Constants from './constants'
import { usersServiceInstance } from './users.service-instance'
import { TYPES } from 'rental-platform-shared'
import { AxiosError } from 'axios'

export const userInfoQueries = (args: TYPES.QUERIES.QueryPayload<{ userId: string }, any>) => {
  const { payload, queryOptions } = args
  return TYPES.QUERIES.useCustomQuery<TYPES.MODELS.COMMON.USERS.IUser, AxiosError>({
    queryKey: [Constants.USERS_KEYS.WHO_AMI],
    queryFn: () => usersServiceInstance().whoAmI({ userId: payload.userId }),
    options: queryOptions,
  })
}

export const updateUserInfoMutation = (
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
