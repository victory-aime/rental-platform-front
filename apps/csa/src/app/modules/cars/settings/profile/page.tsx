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
import { useSession } from 'next-auth/react'
import { TYPES } from 'rental-platform-shared'

const ProfilePage = () => {
  const { i18n } = useTranslation()
  const { data: session } = useSession()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [initialValues, setInitialValues] = useState<TYPES.MODELS.COMMON.USERS.IUpdateUserInfo>(TYPES.VALIDATION_SCHEMA.USERS.initialUser)

  const { data: currentUser } = CommonModule.UserModule.userInfoQueries({
    payload: {
      userId: '',
    },
    queryOptions: {
      enabled: false,
    },
  })

  const { mutateAsync: onUpdateUserInfo } = CommonModule.UserModule.updateUserInfoMutation({
    onSuccess: () => {
      CommonModule.UserModule.UserCache.invalidateUser()
    },
  })

  const handleFileUploaded = (file: File | null) => {
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatarUrl(reader.result)
        }
      }
      reader.readAsDataURL(file)
    } else {
      setAvatarUrl(null)
    }
  }

  const onSubmitValues = async (values: FormikValues) => {
    const formData = new FormData()
    formData.append('name', values?.name ?? '')
    formData.append('firstName', values?.firstName ?? '')
    formData.append('email', values?.email ?? '')
    formData.append('newPassword', values?.newPassword ?? '')
    formData.append('enabled2MFA', String(Boolean(values?.enabled2MFA)))
    formData.append('keycloakId', session?.keycloakId ?? '')
    formData.append('preferredLanguage', (values?.preferredLanguage && values?.preferredLanguage[0]) ?? '')
    if (selectedFile) {
      formData.append('picture', selectedFile)
    }
    await onUpdateUserInfo(formData as unknown as TYPES.MODELS.COMMON.USERS.IUpdateUserInfo)
  }

  useEffect(() => {
    setInitialValues({
      name: currentUser?.name || '',
      firstName: currentUser?.firstName || '',
      email: currentUser?.email || '',
      newPassword: undefined,
      enabled2MFA: currentUser?.enabled2MFA || false,
      keycloakId: session?.keycloakId || '',
      preferredLanguage: Array.isArray(currentUser?.preferredLanguage) ? currentUser?.preferredLanguage : [currentUser?.preferredLanguage || i18n.language],
    })
  }, [currentUser])

  return (
    <BoxContainer title="SIDE_BAR.SETTINGS" border={'none'}>
      <Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmitValues}>
        {({ values, handleSubmit, setFieldValue, dirty }) => (
          <VStack gap={10} alignItems={'flex-start'}>
            <BaseText>{JSON.stringify(values, null, 6)}</BaseText>
            <ProfileForm title="SIDE_BAR.PROFILE" description="Your personal information and account security settings">
              <Stack alignItems={'flex-start'} mb={5} gap={4}>
                <BaseText variant={TextVariant.S}>Avatar</BaseText>
                <UploadAvatar getFileUploaded={handleFileUploaded} avatarImage={avatarUrl} name={currentUser?.name + '' + currentUser?.firstName} />
                <BaseText variant={TextVariant.S} textTransform={'capitalize'}>
                  {currentUser?.name + ' ' + currentUser?.firstName}
                </BaseText>
              </Stack>
              <VStack gap={4} alignItems={'flex-start'} mt={10}>
                <HStack width={'full'} gap={4}>
                  <FormTextInput name="name" label="Name" placeholder="" value={values?.name} leftAccessory={<CiUser />} />
                  <FormTextInput name="firstName" label="First name" placeholder="" value={values?.firstName} leftAccessory={<CiUser />} />
                </HStack>
                <FormTextInput name="email" label="Email" placeholder="" type="email" value={values?.email} leftAccessory={<HiOutlineMail />} />
                <FormTextInput name="newPassword" label="Password" placeholder="Enter new password" type="password" value={values?.newPassword} />
              </VStack>
            </ProfileForm>

            <ProfileForm
              title="Two-factor authentication (2FA){enabled}"
              description="Keep your account secure by enabling 2FA via SMS or using a temporary one-time passcode (TOTP) from an authenticator app."
            >
              <FormSwitch name="enabled2MFA" label="Authenticator App (TOTP)" description="Use an app to receive a temporary one-time passcode each time you log in." />
            </ProfileForm>
            {/* <ProfileForm title="Theme colors" description="Choose a preferred theme for the app">
              <FormGroupColorPicker />
            </ProfileForm> */}
            <ProfileForm title="Langue et region" description="Customize your language and region">
              <VStack width={{ base: '100%', md: 'full' }} alignItems={'flex-start'} gap={4}>
                <FormSelect name="preferredLanguage" label="Language" setFieldValue={setFieldValue} listItems={selectLanguages()} />
              </VStack>
            </ProfileForm>

            <ProfileForm title="Danger zone" description="Proced with caution" borderColor={'red.400'} borderWidth={1} borderRadius={'7px'}>
              <Flex alignItems={'flex-start'} justifyContent={'space-between'} flexDir={{ base: 'column', md: 'row' }}>
                <BaseText variant={TextVariant.S}>Log out all sessions including any session on mobile, iPad, and other browsers</BaseText>
                <VStack gap={4}>
                  <BaseButton borderColor={'gray.400'} colorType={'none'}>
                    {'Log out of all sessions'}
                  </BaseButton>
                  <BaseButton withGradient colorType={'danger'}>
                    Delete account
                  </BaseButton>
                </VStack>
              </Flex>
            </ProfileForm>
            <Flex width={'full'} alignItems={'flex-end'} justifyContent={'flex-end'}>
              <BaseButton colorType={'success'} onClick={() => handleSubmit()}>
                Save changes
              </BaseButton>
            </Flex>
          </VStack>
        )}
      </Formik>
    </BoxContainer>
  )
}

export default ProfilePage
