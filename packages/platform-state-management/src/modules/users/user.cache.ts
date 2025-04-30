import { TYPES } from 'platform-shared'
import * as Constants from './constants'

export const UserCache = {
  getUser: () => TYPES.QUERIES.QueryCache.get<TYPES.MODELS.USERS.IUser>([Constants.WOHAMI]),

}
