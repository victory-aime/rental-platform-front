import { TYPES } from 'rental-platform-shared'
import * as Constants from './constants'

export const UserCache = {
  getUser: () =>
    TYPES.QUERIES.QueryCache.get<TYPES.MODELS.COMMON.USERS.IUser>([Constants.USERS_KEYS.WHO_AMI]),
}
