import * as Constants from './constants'
import { usersServiceInstance } from './users.service-instance'
import { TYPES } from 'platform-shared'
import { AxiosError } from 'axios'

export const userInfoQueries = (
  args: TYPES.QUERIES.QueryPayload<{ userId: string }, any>
) => {
  const { payload, queryOptions } = args
  return TYPES.QUERIES.useCustomQuery<TYPES.MODELS.USERS.IUser, AxiosError>({
    queryKey: [Constants.WOHAMI],
    queryFn: () => usersServiceInstance().whoAmI({ userId: payload.userId }),
    options: queryOptions,
  })
}

