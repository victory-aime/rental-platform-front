'use client'
import { BaseButton, BaseText, TextVariant, TextWeight } from '_components/custom'
import { APP_ROUTES } from '_config/routes'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { Box, Center, Flex, Link, Separator, VStack } from '@chakra-ui/react'
import { VariablesColors } from '_theme/variables'
import { useTranslation } from 'react-i18next'
import { useGlobalLoader } from '_context/loaderContext'
import { useState } from 'react'
import { ActivateAccount } from './ActivateAccount'
import { EnterOtpModal } from './EnterOtpModal'
import { FormikValues } from 'formik'
import { CommonModule } from 'rental-platform-state'

export const SignIn = () => {
  const { t } = useTranslation()
  const callbackUrl = useSearchParams()?.get('callbackUrl') || APP_ROUTES.HOME
  const { showLoader, hideLoader } = useGlobalLoader()
  const [openActiveModal, setOpenActiveModal] = useState<boolean>(false)
  const [openOtpModal, setOpenOtpModal] = useState<boolean>(false)
  const [email, setEmail] = useState<string | null>(null)

  const { mutateAsync: generateOtp, isPending } = CommonModule.OtpModule.generateOtpMutation({
    mutationOptions: {
      onSuccess: (data) => {
        console.log('OTP generated successfully:', data)
        setOpenOtpModal(true)
        setOpenActiveModal(false)
      },
    },
  })

  const handleSignIn = () => {
    showLoader()
    signIn('keycloak', { callbackUrl }).then(() => hideLoader())
  }

  const handleSubmitEmail = async (values: FormikValues) => {
    setEmail(values?.email)
    console.log('Email submitted:', values?.email)
    await generateOtp({ params: { email: values?.email } })
  }

  return (
    <Box minH="100vh" backgroundImage="url('/assets/images/background.jpg')" backgroundSize="cover" backgroundPosition="center" position="relative" overflow="hidden">
      <Box position="absolute" top={0} left={0} width="100%" height="100%" bg="blackAlpha.700" zIndex={0} />

      <Center h="100vh" zIndex={1} position="relative" px={4}>
        <Box animation={'fade'} backdropFilter="blur(25px)" bg="whiteAlpha.200" p={10} borderRadius="2xl" boxShadow="2xl" maxW="550px" w="full" textAlign="center">
          <VStack gap={8} mb={10} width="full">
            <BaseText variant={TextVariant.H2} weight={TextWeight.ExtraBold} color={'white'} textAlign={'center'}>
              👋{t('SIGN_IN_TITLE')}
            </BaseText>
            <BaseText variant={TextVariant.M} weight={TextWeight.Regular} color={'white'} textAlign={'center'}>
              {t('SIGN_IN_DESC')}
            </BaseText>
            <BaseButton onClick={handleSignIn} width={'1/2'}>
              {t('COMMON.LOGIN')}
            </BaseButton>
          </VStack>
          <BaseText color={'white'}>
            {t('COMMON.ACCOUNT_NOT_ACTIVATED')} {''}
            <span onClick={() => setOpenActiveModal(!openActiveModal)} style={{ color: VariablesColors.secondary, fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }}>
              {t('COMMON.ACTIVATE_ACCOUNT')}
            </span>
          </BaseText>
        </Box>
      </Center>

      <Flex position="absolute" bottom={4} right={4} gap={4} fontSize="sm" zIndex={1}>
        <Link href={APP_ROUTES.LEGAL_MENTIONS} variant={'plain'} color={'white'}>
          {t('COMMON.LEGAL_MENTIONS')}
        </Link>
        <Separator orientation="vertical" height="4" />
        <Link href={APP_ROUTES.SECURITY} variant={'plain'} color={'white'}>
          {t('COMMON.SECURITY')}
        </Link>
        <Separator orientation="vertical" height="4" />
        <Link href={APP_ROUTES.PRIVACY_POLICY} variant={'plain'} color={'white'}>
          {t('COMMON.PRIVACY_POLICY')}
        </Link>
        <Separator orientation="vertical" height="4" />
        <Link href={APP_ROUTES.TERMS_OF_USE} variant={'plain'} color={'white'}>
          {t('COMMON.TERMS_OF_USE')}
        </Link>
        <Separator orientation="vertical" height="4" />
        <BaseText
          variant={TextVariant.S}
          cursor={'pointer'}
          _hover={{
            textDecoration: 'underline',
          }}
          color={'white'}
          onClick={() => console.log('Contact Us')}
        >
          {t('COMMON.CONTACT_US')}
        </BaseText>
      </Flex>
      <ActivateAccount isLoading={isPending} onChange={() => setOpenActiveModal(!openActiveModal)} isOpen={openActiveModal} callback={handleSubmitEmail} />
      <EnterOtpModal onChange={() => setOpenOtpModal(!openOtpModal)} isOpen={openOtpModal} data={email} />
    </Box>
  )
}
