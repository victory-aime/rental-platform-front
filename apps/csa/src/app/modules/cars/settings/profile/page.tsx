'use client'

import { Flex, HStack, Stack, VStack } from '@chakra-ui/react'
import { BaseButton, BaseText, BoxContainer, FormSelect, FormSwitch, FormTextInput, TextVariant, UploadAvatar } from '_components/custom'
import { selectLanguages } from '_constants/languages'
import { Formik, FormikValues } from 'formik'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CiUser } from 'react-icons/ci'
import { HiOutlineMail } from 'react-icons/hi'
import { CommonModule } from 'rental-platform-state'
import { ProfileForm } from './components/ProfileForm'
import { signOut, useSession } from 'next-auth/react'
import { TYPES } from 'rental-platform-shared'
import { keycloakSessionLogOut } from '_hooks/logout'
import { APP_ROUTES } from '_config/routes'
import { DisabledAccount } from '_modules/cars/settings/profile/components/DisabledAccount'
import { useGlobalLoader } from '_context/loaderContext'

const ProfilePage = () => {
  const { t, i18n } = useTranslation()
  const { data: session } = useSession()
  const { showLoader, hideLoader } = useGlobalLoader()
  const [picture, setPicture] = useState<File>()
  const [getPicture, setGetPicture] = useState<string>()
  const [filesUploaded, setFilesUploaded] = useState<File>()
  const [pending, setPending] = useState<boolean>(false)
  const [validateDisabledAccount, setValidateDisabledAccount] = useState<boolean>(false)
  const [initialValues, setInitialValues] = useState<TYPES.MODELS.COMMON.USERS.IUpdateUserInfo>(TYPES.VALIDATION_SCHEMA.USERS.initialUser)

  const { data: currentUser, refetch } = CommonModule.UserModule.userInfoQueries({
    payload: {
      userId: session?.keycloakId || '',
    },
    queryOptions: {
      enabled: pending,
    },
  })

  const { mutateAsync: onUpdateUserInfo, isPending } = CommonModule.UserModule.updateUserInfoMutation({
    mutationOptions: {
      onSuccess: () => {
        refetch().then(() => setPending(true))
      },
    },
  })
  const { mutateAsync: deactivateOrEnabled, isPending: deactivatePending } = CommonModule.UserModule.deactivateAccountMutation({
    mutationOptions: {
      onSuccess: () => {
        showLoader()
        keycloakSessionLogOut().then(() => signOut({ callbackUrl: APP_ROUTES.SIGN_IN }).then(() => hideLoader()))
      },
    },
  })
  const { mutateAsync: clearAllSessions, isPending: clearSessionLoading } = CommonModule.UserModule.clearAllSessionsMutation({
    mutationOptions: {
      onSuccess: () => {
        showLoader()
        keycloakSessionLogOut().then(() => signOut({ callbackUrl: APP_ROUTES.SIGN_IN }).then(() => hideLoader()))
      },
    },
  })

  const uploadImage = async () => {
    if (filesUploaded) {
      setPicture(filesUploaded)
    }
  }

  const onSubmitValues = async (values: FormikValues) => {
    const formData = new FormData()
    formData.append('name', values?.name ?? '')
    formData.append('firstName', values?.firstName ?? '')
    formData.append('email', values?.email ?? '')
    formData.append('newPassword', values?.newPassword ?? '')
    formData.append('enabled2MFA', String(Boolean(values?.enabled2MFA)))
    formData.append('preferredLanguage', values?.preferredLanguage && values?.preferredLanguage[0])
    if (picture) {
      formData.append('picture', picture)
    }
    await onUpdateUserInfo({ payload: formData as TYPES.MODELS.COMMON.USERS.IUpdateUserInfo, params: { keycloakId: currentUser?.keycloakId } })
  }

  const handleDeactivateOrEnabled = async () => {
    await deactivateOrEnabled({
      params: {
        keycloakId: currentUser?.keycloakId,
        enabledOrDeactivate: false,
      },
    })
  }

  const clearAllUserSessions = async () => {
    await clearAllSessions({ params: { keycloakId: session?.keycloakId || '' } })
  }

  useEffect(() => {
    if (currentUser) {
      setInitialValues({
        name: currentUser?.name || '',
        firstName: currentUser?.firstName || '',
        email: currentUser?.email || '',
        newPassword: undefined,
        enabled2MFA: currentUser?.enabled2MFA || false,
        keycloakId: session?.keycloakId || '',
        preferredLanguage: Array.isArray(currentUser?.preferredLanguage) ? currentUser?.preferredLanguage : [currentUser?.preferredLanguage || i18n.language],
      })
      setGetPicture(currentUser?.picture)
    }
  }, [currentUser])

  useEffect(() => {
    if (filesUploaded) {
      uploadImage().then()
    }
  }, [filesUploaded])

  return (
    <BoxContainer title="SIDE_BAR.SETTINGS" border={'none'}>
      <Formik enableReinitialize initialValues={initialValues} onSubmit={(values) => onSubmitValues(values)}>
        {({ values, handleSubmit, setFieldValue }) => (
          <VStack gap={10} alignItems={'flex-start'}>
            <ProfileForm title="SIDE_BAR.PROFILE" description="PROFILE.PERSONAL_INFO">
              <Stack alignItems={'flex-start'} mb={5} gap={4}>
                <BaseText variant={TextVariant.S}>Avatar</BaseText>
                <UploadAvatar getFileUploaded={setFilesUploaded} avatarImage={getPicture} name={currentUser?.name + '' + currentUser?.firstName} />
                <BaseText variant={TextVariant.S} textTransform={'capitalize'}>
                  {currentUser?.name + ' ' + currentUser?.firstName}
                </BaseText>
              </Stack>
              <VStack gap={4} alignItems={'flex-start'} mt={10}>
                <HStack width={'full'} gap={4}>
                  <FormTextInput name="name" label="PROFILE.NAME" placeholder="" value={values?.name} leftAccessory={<CiUser />} />
                  <FormTextInput name="firstName" label="PROFILE.FIRST_NAME" placeholder="" value={values?.firstName} leftAccessory={<CiUser />} />
                </HStack>
                <FormTextInput name="email" label="PROFILE.EMAIL" placeholder="PROFILE.EMAIL" type="email" value={values?.email} leftAccessory={<HiOutlineMail />} />
                <FormTextInput name="newPassword" label="PROFILE.NEW_PASSWORD" placeholder="PROFILE.NEW_PASSWORD" type="password" value={values?.newPassword} />
              </VStack>
            </ProfileForm>
            <ProfileForm title={'PROFILE.2MFA'} activeBadge={currentUser?.enabled2MFA} description="PROFILE.2MFA_DESC">
              <FormSwitch name="enabled2MFA" label="PROFILE.ENABLED_2MFA" description="PROFILE.ENABLED_2MFA_DESC" />
            </ProfileForm>
            <ProfileForm title="PROFILE.LANGUAGE" description="PROFILE.LANGUAGE_DESC">
              <VStack width={{ base: '100%', md: 'full' }} alignItems={'flex-start'} gap={4}>
                <FormSelect name="preferredLanguage" label="PROFILE.LANGUAGE" setFieldValue={setFieldValue} listItems={selectLanguages(t)} isClearable={false} />
              </VStack>
            </ProfileForm>
            <ProfileForm title="PROFILE.DANGER_ZONE.TITLE" description="PROFILE.DANGER_ZONE.DESC" borderColor={'red.500'} borderWidth={1.5} borderRadius={'7px'}>
              <Flex alignItems={'flex-start'} justifyContent={'space-between'} flexDir={{ base: 'column', md: 'row' }}>
                <BaseText variant={TextVariant.S}>{t('PROFILE.DANGER_ZONE.LOGOUT_ALL_SESSIONS_DESC')}</BaseText>
                <VStack gap={4} alignItems={'flex-end'} justifyContent={'flex-end'}>
                  <BaseButton isLoading={clearSessionLoading} borderColor={'gray.400'} colorType={'secondary'} onClick={() => clearAllUserSessions()}>
                    {t('COMMON.LOGOUT')}
                  </BaseButton>
                  <BaseButton withGradient colorType={'danger'} isLoading={deactivatePending} onClick={() => setValidateDisabledAccount(!validateDisabledAccount)}>
                    {t('PROFILE.DANGER_ZONE.DELETE_ACCOUNT')}
                  </BaseButton>
                </VStack>
              </Flex>
            </ProfileForm>
            <Flex width={'full'} alignItems={'flex-end'} justifyContent={'flex-end'}>
              <BaseButton colorType={'success'} onClick={() => handleSubmit()} isLoading={isPending}>
                {t('COMMON.VALIDATE')}
              </BaseButton>
            </Flex>
          </VStack>
        )}
      </Formik>
      <DisabledAccount
        onChange={() => setValidateDisabledAccount(!validateDisabledAccount)}
        isOpen={validateDisabledAccount}
        callback={handleDeactivateOrEnabled}
        data={currentUser?.email}
        isLoading={deactivatePending}
      />
    </BoxContainer>
  )
}

export default ProfilePage
