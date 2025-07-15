import { TYPES } from 'rental-platform-shared'
import { ZUSTAND } from 'rise-core-frontend'
import * as Constants from './constants'

export const UserCache = {
  getUser: () =>
    ZUSTAND.ZustandCache.get<TYPES.MODELS.COMMON.USERS.IUser>(Constants.USERS_KEYS.WHO_AMI),

  setUser: (user: TYPES.MODELS.COMMON.USERS.IUser) => {
    ZUSTAND.ZustandCache.set(Constants.USERS_KEYS.WHO_AMI, user)
  },

  invalidateUser: () => {
    ZUSTAND.ZustandCache.remove(Constants.USERS_KEYS.WHO_AMI)
  },
  subscribe: (callback: (user: TYPES.MODELS.COMMON.USERS.IUser | undefined) => void) => {
    return ZUSTAND.ZustandCache.subscribe(Constants.USERS_KEYS.WHO_AMI, (data: unknown) =>
      callback(data as TYPES.MODELS.COMMON.USERS.IUser | undefined)
    )
  },
}
