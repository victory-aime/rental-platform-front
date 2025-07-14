'use client'

import { BaseButton, BaseText, TextVariant, TextWeight } from '_components/custom'
import { APP_ROUTES } from '_config/routes'
import { useSearchParams } from 'next/navigation'
import { Box, Center, Flex, Link, Separator, VStack } from '@chakra-ui/react'
import { VariablesColors } from '_theme/variables'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { ActivateAccount } from './ActivateAccount'
import { FormikHelpers, FormikValues } from 'formik'
import { CommonModule } from 'rental-platform-state'
import { AxiosError } from 'axios'
import { useOtpStorage } from '_hooks/useOtpStorage'
import { ActivateAccountRecap } from './ActivateAccountRecap'
import { extractOtp } from '../../challenge-handler/otp/utils/extract-otp'
import { OtpChallengeHandler } from '../../challenge-handler/otp/OtpChallengeHandler'
import { useAuth } from '_hooks/useAuth'

export const SignIn = () => {
  const { t } = useTranslation()
  const callbackUrl = useSearchParams()?.get('callbackUrl') || APP_ROUTES.HOME
  const { login } = useAuth()
  const { email, otpRemaining: expiresIn, blockRemaining, saveOtpData, clearOtpData } = useOtpStorage()

  const [openActiveModal, setOpenActiveModal] = useState<boolean>(false)
  const [openRecapModal, setOpenRecapModal] = useState<boolean>(false)
  const [openOtpModal, setOpenOtpModal] = useState<boolean>(false)

  const { mutateAsync: generateOtp, isPending } = CommonModule.OtpModule.generateOtpMutation({
    mutationOptions: {
      onSuccess: (data) => {
        saveOtpData(data.email, data.expiresIn, 0)
        setOpenOtpModal(true)
        setOpenActiveModal(false)
      },
      onError: (error: AxiosError<unknown, any>, _variables, _context) => {
        const data = error?.response?.data as { message?: string; retryAfter?: string } | undefined
        const retryAfter = Number(data?.retryAfter || 0)
        const targetEmail = email || ''
        if (retryAfter && targetEmail) {
          saveOtpData(targetEmail, 0, retryAfter)
        }
        setOpenActiveModal(true)
      },
    },
  })

  const { mutateAsync: activateAccount } = CommonModule.UserModule.activateAccountMutation({
    mutationOptions: {
      onSuccess: () => {
        setOpenRecapModal(true)
      },
    },
  })

  const { mutateAsync: validateOtp, isPending: validateAccountPending } = CommonModule.OtpModule.validateOtpMutation({
    mutationOptions: {
      onSuccess: async () => {
        setOpenOtpModal(false)
        setOpenActiveModal(false)
        clearOtpData()
        await activateAccount({ payload: email ?? '' })
      },
    },
  })

  const handleGenerateOrRenewOtp = async (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    try {
      await generateOtp({ payload: values?.email ?? email })
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string; retryAfter?: string }>
      const serverMessage = axiosError?.response?.data?.message || t('PROFILE.OTP_MAX_SEND_ATTEMPTS')
      formikHelpers.setFieldError('email', serverMessage)
    }
  }

  const handleValidateOtp = async (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    const otpString = extractOtp(values?.otpCode)
    try {
      await validateOtp({
        payload: {
          otp: otpString,
          email: email ?? '',
        },
      })
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>
      const serverMessage = axiosError?.response?.data?.message || t('PROFILE.OTP_INVALID')
      formikHelpers?.setFieldError('otpCode', serverMessage)
    }
  }

  return (
    <Box minH="100vh" backgroundImage="url('/assets/images/background.jpg')" backgroundSize="cover" backgroundPosition="center" position="relative" overflow="hidden">
      <Box position="absolute" top={0} left={0} width="100%" height="100%" bg="blackAlpha.700" zIndex={0} />

      <Center h="100vh" zIndex={1} position="relative" px={4}>
        <Box animation="fade" backdropFilter="blur(25px)" bg="whiteAlpha.200" p={10} borderRadius="2xl" boxShadow="2xl" maxW="550px" w="full" textAlign="center">
          <VStack gap={8} mb={10} width="full">
            <BaseText variant={TextVariant.H2} weight={TextWeight.ExtraBold} color="white" textAlign="center">
              👋{t('SIGN_IN_TITLE')}
            </BaseText>
            <BaseText variant={TextVariant.M} weight={TextWeight.Regular} color="white" textAlign="center">
              {t('SIGN_IN_DESC')}
            </BaseText>
            <BaseButton onClick={() => login({ callbackUrl, otpRequired: true })} width="1/2">
              {t('COMMON.LOGIN')}
            </BaseButton>
          </VStack>
          <BaseText color="white">
            {t('COMMON.ACCOUNT_NOT_ACTIVATED')}{' '}
            <span
              onClick={() => {
                if (email) setOpenOtpModal(true)
                else setOpenActiveModal(true)
              }}
              style={{
                color: VariablesColors.secondary,
                fontWeight: 'bold',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              {t('COMMON.ACTIVATE_ACCOUNT')}
            </span>
          </BaseText>
        </Box>
      </Center>

      <Flex position="absolute" bottom={4} right={4} gap={4} fontSize="sm" zIndex={1}>
        <Link href={APP_ROUTES.LEGAL_MENTIONS} variant="plain" color="white">
          {t('COMMON.LEGAL_MENTIONS')}
        </Link>
        <Separator orientation="vertical" height="4" />
        <Link href={APP_ROUTES.SECURITY} variant="plain" color="white">
          {t('COMMON.SECURITY')}
        </Link>
        <Separator orientation="vertical" height="4" />
        <Link href={APP_ROUTES.PRIVACY_POLICY} variant="plain" color="white">
          {t('COMMON.PRIVACY_POLICY')}
        </Link>
        <Separator orientation="vertical" height="4" />
        <Link href={APP_ROUTES.TERMS_OF_USE} variant="plain" color="white">
          {t('COMMON.TERMS_OF_USE')}
        </Link>
        <Separator orientation="vertical" height="4" />
        <BaseText variant={TextVariant.S} cursor="pointer" _hover={{ textDecoration: 'underline' }} color="white" onClick={() => console.log('Contact Us')}>
          {t('COMMON.CONTACT_US')}
        </BaseText>
      </Flex>

      <ActivateAccount
        key={`activate-${email}-${blockRemaining}`}
        blockedTimeLeft={blockRemaining}
        data={expiresIn}
        isLoading={isPending}
        onChange={() => setOpenActiveModal(!openActiveModal)}
        isOpen={openActiveModal}
        callback={handleGenerateOrRenewOtp}
      />

      <OtpChallengeHandler
        key={`otp-${email}-${blockRemaining}`}
        onChange={() => setOpenOtpModal(!openOtpModal)}
        blockedTimeLeft={blockRemaining}
        isOpen={openOtpModal}
        data={{ expiresIn, email }}
        callback={handleValidateOtp}
        isLoading={validateAccountPending}
        renewOtpCallback={handleGenerateOrRenewOtp}
      />
      <ActivateAccountRecap onChange={() => setOpenRecapModal(!openRecapModal)} isOpen={openRecapModal} />
    </Box>
  )
}
