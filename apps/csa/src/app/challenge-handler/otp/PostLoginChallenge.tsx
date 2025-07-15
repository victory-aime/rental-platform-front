import { FC, useEffect, useRef, useState } from 'react'
import { TYPES } from 'rental-platform-shared'
import { useOtpStorage } from '_hooks/useOtpStorage'
import { CommonModule } from 'rental-platform-state'
import { AxiosError } from 'axios'
import { FormikValues, FormikHelpers } from 'formik'
import { OtpChallengeHandler } from './OtpChallengeHandler'
import { extractOtp } from './utils/extract-otp'
import { useAuth } from '_hooks/useAuth'
import { StorageKey } from '_constants/StorageKeys'
import { ZUSTAND } from 'rise-core-frontend'

interface Props {
  user?: TYPES.MODELS.COMMON.USERS.IUser
}

export const PostLoginChallenge: FC<Props> = ({ user }) => {
  const hasTriggeredRef = useRef(false)
  const [openModal, setOpenModal] = useState(false)
  const { logout } = useAuth()
  const store = ZUSTAND.useZustandCacheStore()
  const { email, otpRemaining: expiresIn, blockRemaining, saveOtpData, clearOtpData } = useOtpStorage()

  const shouldTriggerOtp = typeof window !== 'undefined' && localStorage.getItem(StorageKey.OTP_REQUIRED) === 'true'

  const { mutateAsync: generateOtp } = CommonModule.OtpModule.generateOtpMutation({
    mutationOptions: {
      onSuccess: (data) => {
        saveOtpData(data.email, data.expiresIn, 0)
        setOpenModal(true)
      },
      onError: (error: AxiosError<unknown, any>) => {
        const data = error?.response?.data as { message?: string; retryAfter?: string } | undefined
        const retryAfter = Number(data?.retryAfter || 0)
        const targetEmail = email || user?.email || ''
        if (retryAfter && targetEmail) {
          saveOtpData(targetEmail, 0, retryAfter)
        }
      },
    },
  })

  const {
    mutateAsync: validateOtp,
    isPending,
    isSuccess,
  } = CommonModule.OtpModule.validateOtpMutation({
    mutationOptions: {
      onSuccess: () => {
        setOpenModal(false)
        localStorage.removeItem(StorageKey.OTP_REQUIRED)
        clearOtpData()
      },
    },
  })

  useEffect(() => {
    if (!hasTriggeredRef.current && shouldTriggerOtp && user?.email && user?.enabled2MFA) {
      hasTriggeredRef.current = true
      generateOtp({ payload: user.email })
    }
  }, [shouldTriggerOtp, user])

  useEffect(() => {
    if (!user?.enabled2MFA) {
      localStorage.removeItem(StorageKey.OTP_REQUIRED)
    }
  }, [user])

  const handleValidateOtp = async (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    try {
      await validateOtp({
        payload: {
          otp: extractOtp(values?.otpCode),
          email: email ?? '',
        },
      })
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>
      const serverMessage = axiosError?.response?.data?.message ?? ''
      formikHelpers.setFieldError('otpCode', serverMessage)
    }
  }

  const handleRenewOtp = async () => {
    await generateOtp({ payload: email ?? '' })
  }

  const handleClose = () => {
    setOpenModal(false)
    logout()
    store.getState().clearAll()
    clearOtpData()
  }
  return user?.enabled2MFA && !isSuccess ? (
    <OtpChallengeHandler
      isOpen={openModal}
      onChange={handleClose}
      blockedTimeLeft={blockRemaining}
      data={{ expiresIn, user }}
      callback={handleValidateOtp}
      isLoading={isPending}
      renewOtpCallback={handleRenewOtp}
      closeButton={false}
    />
  ) : null
}
