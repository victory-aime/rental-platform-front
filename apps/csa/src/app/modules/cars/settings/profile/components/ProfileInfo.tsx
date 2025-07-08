'use client'

import { Flex, HStack, Stack, VStack } from '@chakra-ui/react'
import { BaseButton, BaseText, FormSelect, FormSwitch, FormTextInput, TextVariant, UploadAvatar } from '_components/custom'
import { selectLanguages } from '_constants/languages'
import { Formik, FormikValues } from 'formik'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CiUser } from 'react-icons/ci'
import { HiOutlineMail } from 'react-icons/hi'
import { CommonModule } from 'rental-platform-state'
import { ProfileForm } from '../components/ProfileForm'
import { useSession } from 'next-auth/react'
import { TYPES } from 'rental-platform-shared'
import { EmailChangeModal } from './EmailChangeModal'

export const ProfileInfo = () => {
  const { t, i18n } = useTranslation()
  const { data: session } = useSession()
  const [picture, setPicture] = useState<File>()
  const [getPicture, setGetPicture] = useState<string>()
  const [filesUploaded, setFilesUploaded] = useState<File>()
  const [pending, setPending] = useState<boolean>(false)
  const [emailHasChanged, setEmailHasChanged] = useState<boolean>(false)
  const [pendingValues, setPendingValues] = useState<FormikValues>()
  const [initialValues, setInitialValues] = useState<TYPES.MODELS.COMMON.USERS.IUpdateUserInfo>(TYPES.VALIDATION_SCHEMA.USERS.initialUser)

  const {
    data: currentUser,
    refetch,
    isLoading,
  } = CommonModule.UserModule.userInfoQueries({
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

  const uploadImage = async () => {
    if (filesUploaded) {
      setPicture(filesUploaded)
    }
  }

  const onSubmitValues = async (values: FormikValues, skipCheck = false) => {
    if (!skipCheck && values?.email !== currentUser?.email) {
      setEmailHasChanged(true)
      return
    }

    const formData = new FormData()
    formData.append('name', values?.name)
    formData.append('firstName', values?.firstName)
    formData.append('email', values?.email)
    formData.append('enabled2MFA', String(Boolean(values?.enabled2MFA)))
    formData.append('preferredLanguage', values?.preferredLanguage?.[0])

    if (picture) {
      formData.append('picture', picture)
    }

    await onUpdateUserInfo({
      payload: formData as TYPES.MODELS.COMMON.USERS.IUpdateUserInfo,
      params: { keycloakId: currentUser?.keycloakId },
    })

    setEmailHasChanged(false)
  }

  useEffect(() => {
    if (currentUser) {
      setInitialValues({
        name: currentUser?.name,
        firstName: currentUser?.firstName,
        email: currentUser?.email,
        enabled2MFA: currentUser?.enabled2MFA || false,
        keycloakId: session?.keycloakId,
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
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values) => {
          onSubmitValues(values)
          setPendingValues(values)
        }}
      >
        {({ values, handleSubmit, setFieldValue, dirty }) => (
          <VStack gap={10} alignItems={'flex-start'}>
            <ProfileForm title="SIDE_BAR.PROFILE" description="PROFILE.PERSONAL_INFO" isLoading={isLoading}>
              <Stack alignItems={'flex-start'} mb={5} gap={4}>
                <UploadAvatar getFileUploaded={setFilesUploaded} avatarImage={getPicture} name={currentUser?.name + ' ' + currentUser?.firstName} isLoading={isLoading} />
              </Stack>
              <VStack gap={4} alignItems={'flex-start'} mt={10}>
                <HStack width={'full'} gap={4}>
                  <FormTextInput name="name" label="PROFILE.NAME" placeholder="" value={values?.name} leftAccessory={<CiUser />} isLoading={isLoading} />
                  <FormTextInput name="firstName" label="PROFILE.FIRST_NAME" placeholder="" value={values?.firstName} leftAccessory={<CiUser />} isLoading={isLoading} />
                </HStack>
                <FormTextInput name="email" label="PROFILE.EMAIL" placeholder="PROFILE.EMAIL" type="email" value={values?.email} leftAccessory={<HiOutlineMail />} isLoading={isLoading} />
              </VStack>
            </ProfileForm>
            <ProfileForm title={'PROFILE.2MFA'} activeBadge={currentUser?.enabled2MFA} description="PROFILE.2MFA_DESC" isLoading={isLoading}>
              <FormSwitch name="enabled2MFA" label="PROFILE.ENABLED_2MFA" description="PROFILE.ENABLED_2MFA_DESC" isLoading={isLoading} />
            </ProfileForm>

            <ProfileForm title="PROFILE.LANGUAGE" description="PROFILE.LANGUAGE_DESC" isLoading={isLoading}>
              <VStack width={{ base: '100%', md: 'full' }} alignItems={'flex-start'} gap={4}>
                <FormSelect name="preferredLanguage" label="PROFILE.LANGUAGE" setFieldValue={setFieldValue} listItems={selectLanguages(t)} isClearable={false} isLoading={isLoading} />
              </VStack>
            </ProfileForm>
            <Flex width={'full'} alignItems={'flex-end'} justifyContent={'flex-end'}>
              <BaseButton colorType={'success'} onClick={() => handleSubmit()} isLoading={isPending} disabled={!dirty}>
                {t('COMMON.VALIDATE')}
              </BaseButton>
            </Flex>
          </VStack>
        )}
      </Formik>
      <EmailChangeModal isOpen={emailHasChanged} onChange={() => setEmailHasChanged(!emailHasChanged)} callback={() => pendingValues && onSubmitValues(pendingValues, true)} />
    </>
  )
}
