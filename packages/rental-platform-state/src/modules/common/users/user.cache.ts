import { TYPES } from 'rental-platform-shared'
import * as Constants from './constants'

export const UserCache = {
  getUser: () =>
    TYPES.ZUSTAND.ZustandCache.get<TYPES.MODELS.COMMON.USERS.IUser>(Constants.USERS_KEYS.WHO_AMI),

  setUser: (user: TYPES.MODELS.COMMON.USERS.IUser) => {
    TYPES.ZUSTAND.ZustandCache.set(Constants.USERS_KEYS.WHO_AMI, user)
  },

  invalidateUser: () => {
    TYPES.ZUSTAND.ZustandCache.remove(Constants.USERS_KEYS.WHO_AMI)
  },
  subscribe: (callback: (user: TYPES.MODELS.COMMON.USERS.IUser | undefined) => void) => {
    return TYPES.ZUSTAND.ZustandCache.subscribe(
      Constants.USERS_KEYS.WHO_AMI,
      (data: unknown) => callback(data as TYPES.MODELS.COMMON.USERS.IUser | undefined)
    )
  }
}
