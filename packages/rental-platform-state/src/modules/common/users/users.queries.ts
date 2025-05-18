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
