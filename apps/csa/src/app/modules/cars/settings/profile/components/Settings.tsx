import React, { useState } from 'react'
import { DisabledAccount } from './DisabledAccount'
import { VStack, HStack, Flex, For } from '@chakra-ui/react'
import { BaseText, TextVariant, FormTextInput, BaseButton, BoxIcon, BaseBadge, CustomSkeletonLoader } from '_components/custom'
import { Formik } from 'formik'
import { ProfileForm } from './ProfileForm'
import { CommonModule } from 'rental-platform-state'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useGlobalLoader } from '_context/loaderContext'
import { keycloakSessionLogOut } from '_hooks/logout'
import { APP_ROUTES } from '_config/routes'
import { TrashIcon } from '_assets/svg'
import { useTranslation } from 'react-i18next'
import { UTILS } from 'rental-platform-shared'
import { GlobalModal } from './GlobalModal'
import { PassKeyModal } from './PassKeyModal'

export const Settings = () => {
  const { data: session } = useSession()
  const { t } = useTranslation()
  const { showLoader, hideLoader } = useGlobalLoader()
  const [open, setOpen] = useState<boolean>(false)
  const [isRevoke, setIsRevoke] = useState<boolean>(false)
  const [openPassKeyModal, setOpenPasskeyModal] = useState<boolean>(false)
  const [selectedData, setSelectedData] = useState<string | null>(null)
  const currentSessionId = session?.sessionId
  const [validateDisabledAccount, setValidateDisabledAccount] = useState<boolean>(false)

  const { data: currentUser } = CommonModule.UserModule.userInfoQueries({
    payload: {
      userId: session?.keycloakId || '',
    },
    queryOptions: {
      enabled: false,
    },
  })

  const { data: userSessions, isLoading: sessionLoading } = CommonModule.UserModule.getAllSessionsQueries({
    payload: {
      keycloakId: currentUser?.keycloakId || '',
    },
    queryOptions: {
      enabled: !!currentUser,
    },
  })

  const {
    data: credential,
    refetch: refetchCredentials,
    isLoading: credentialsLoading,
  } = CommonModule.UserModule.credentialInfoQueries({
    payload: {
      keycloakId: currentUser?.keycloakId || '',
    },
    queryOptions: {
      enabled: !!currentUser,
    },
  })

  const { mutateAsync: registerNewKey, isPending: registerNewKeyPending } = CommonModule.UserModule.registerPasskeyMutation({
    mutationOptions: {
      onSuccess: () => {
        setOpenPasskeyModal(false)
        handleRegidectToKeycloak()
      },
    },
  })

  const { mutateAsync: removeKeyMutation, isPending: removeKeyPending } = CommonModule.UserModule.revokePasskeyMutation({
    mutationOptions: {
      onSuccess: () => {
        setSelectedData(null)
        refetchCredentials()
        setOpen(false)
      },
    },
  })

  const { mutateAsync: removeSessionMutattion, isPending: removeSessionPending } = CommonModule.UserModule.revokeSessionsMutation({
    mutationOptions: {
      onSuccess: () => {
        setSelectedData(null)
        refetchCredentials()
        setOpen(false)
      },
    },
  })

  const { mutateAsync: deactivate, isPending: deactivatePending } = CommonModule.UserModule.deactivateAccountMutation({
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

  const handleDeactivate = async () => {
    await deactivate({
      params: {
        keycloakId: currentUser?.keycloakId,
        deactivateUser: false,
      },
    })
  }

  const clearAllUserSessions = async () => {
    await clearAllSessions({ params: { keycloakId: session?.keycloakId || currentUser?.keycloakId } })
  }

  const handleClearSessions = async (session: string | null) => {
    if (session === currentSessionId) {
      removeSessionMutattion({ params: { keycloakId: selectedData } }).then(() => {
        showLoader()
        keycloakSessionLogOut().then(() => signOut({ callbackUrl: APP_ROUTES.SIGN_IN }).then(() => hideLoader()))
      })
    } else {
      await removeSessionMutattion({ params: { keycloakId: selectedData } })
    }
  }

  const handleRegisterNewKey = async () => {
    await registerNewKey({ params: { keycloakId: currentUser?.keycloakId } })
  }

  const actions = async () => {
    isRevoke ? await removeKeyMutation({ params: { keycloakId: currentUser?.keycloakId, credentialId: selectedData } }) : handleClearSessions(selectedData)
  }
  const handleRegidectToKeycloak = () => {
    showLoader()
    localStorage.setItem('otpRequired', 'true')
    signIn('keycloak').then(() => hideLoader())
  }

  const filteredCredentials = credential?.data
    ?.filter((cred: { type: string }) => cred.type === 'webauthn' || cred.type === 'webauthn-passwordless')
    ?.map((cred: { userLabel: string; createdDate: string; id: string }) => ({
      id: cred.id,
      userLabel: cred.userLabel,
      createdDate: cred.createdDate,
    }))

  return (
    <>
      <Formik enableReinitialize initialValues={{ newPassword: '' }} onSubmit={(values) => {}}>
        {({ values, handleSubmit, dirty }) => (
          <VStack gap={10} alignItems={'flex-start'}>
            <ProfileForm title="PROFILE.SECURITY.PASSWORD" description="PROFILE.SECURITY.PASSWORD_DESC">
              <FormTextInput
                name="newPassword"
                label="PROFILE.NEW_PASSWORD"
                placeholder="PROFILE.NEW_PASSWORD"
                type="password"
                value={values?.newPassword}
                infoMessage="PROFILE.SECURITY.PASSWORD_INFO"
              />
            </ProfileForm>

            <ProfileForm title="PROFILE.SECURITY.PASS_KEY" description="PROFILE.SECURITY.PASS_KEY_DESC">
              {credentialsLoading ? (
                <CustomSkeletonLoader type="BUTTON" width={'120px'} />
              ) : (
                <BaseButton withGradient colorType={'info'} onClick={() => setOpenPasskeyModal(true)}>
                  {t('PROFILE.SECURITY.ADD_PASS_KEY')}
                </BaseButton>
              )}

              {(filteredCredentials?.length ?? 0) > 0 ? (
                <For each={filteredCredentials ?? []}>
                  {(cred) => (
                    <HStack key={cred.id} width={'full'} mt={5} justifyContent={'space-between'} py={2} borderBottom="1px solid" borderColor={'lighter.500'}>
                      {credentialsLoading ? (
                        <CustomSkeletonLoader type="TEXT" numberOfLines={3} />
                      ) : (
                        <>
                          <VStack alignItems="flex-start" gap={1}>
                            <BaseText fontWeight="bold">{cred.userLabel || t('PROFILE.SECURITY.UNKNOW_DEVICE')}</BaseText>
                            <BaseText variant={TextVariant.XS}> Créé {UTILS.formatCreatedAt(cred.createdDate)}</BaseText>
                          </VStack>

                          <BoxIcon
                            bgColor={'red'}
                            boxSize={'30px'}
                            borderRadius={'7px'}
                            cursor="pointer"
                            onClick={() => {
                              setOpen(true)
                              setIsRevoke(true)
                              setSelectedData(cred.id)
                            }}
                          >
                            <TrashIcon />
                          </BoxIcon>
                        </>
                      )}
                    </HStack>
                  )}
                </For>
              ) : (
                <BaseText mt={8}> {t('PROFILE.SECURITY.PASS_KEY_NO_FOUND')}</BaseText>
              )}
            </ProfileForm>

            <ProfileForm title="PROFILE.SECURITY.ACTIVE_SESSIONS" description="PROFILE.SECURITY.ACTIVE_SESSIONS_DESC">
              <For each={userSessions?.sessions}>
                {(session: { ipAddress: string; start: string; lastAccess: string; id: string }) => (
                  <HStack key={session.id} width="full" justifyContent="space-between" alignItems="center" borderBottom="1px solid" borderColor={'lighter.500'} py={2}>
                    {sessionLoading ? (
                      <CustomSkeletonLoader type="TEXT" numberOfLines={3} />
                    ) : (
                      <>
                        <VStack alignItems="flex-start" gap={0}>
                          <HStack>
                            <BaseText fontWeight="bold">
                              {t('PROFILE.SECURITY.IP_ADDRESS')}: {session.ipAddress}
                            </BaseText>
                            {session.id === currentSessionId && <BaseBadge label={t('PROFILE.SECURITY.CURRENT_SESSION')} type={'common'} />}
                          </HStack>

                          <BaseText variant={TextVariant.XS}>
                            {t('PROFILE.SECURITY.SESSION_START')} : {UTILS.formatCreatedAt(session.start)}
                          </BaseText>
                          <BaseText variant={TextVariant.XS}>
                            {t('PROFILE.SECURITY.SESSION_LAST_ACCESS')} : {UTILS.formatCreatedAt(session.lastAccess)}
                          </BaseText>
                        </VStack>
                        {userSessions?.sessions?.length > 1 && (
                          <BoxIcon bgColor={'red'} boxSize={'30px'} borderRadius={'7px'} cursor="pointer" onClick={() => session.id}>
                            <TrashIcon
                              onClick={() => {
                                setOpen(true)
                                setIsRevoke(false)
                                setSelectedData(session.id)
                              }}
                            />
                          </BoxIcon>
                        )}
                      </>
                    )}
                  </HStack>
                )}
              </For>
            </ProfileForm>

            <ProfileForm title="PROFILE.DANGER_ZONE.TITLE" description="PROFILE.DANGER_ZONE.DESC" borderColor={'red.500'} borderWidth={1.5} borderRadius={'7px'}>
              <Flex alignItems={'flex-start'} justifyContent={'space-between'} flexDir={{ base: 'column', md: 'row' }}>
                <BaseText variant={TextVariant.S}>{t('PROFILE.DANGER_ZONE.LOGOUT_ALL_SESSIONS_DESC')}</BaseText>
                <VStack gap={4} alignItems={'flex-end'} justifyContent={'flex-end'}>
                  <BaseButton isLoading={false} borderColor={'gray.400'} colorType={'secondary'} onClick={clearAllUserSessions}>
                    {t('COMMON.LOGOUT')}
                  </BaseButton>
                  <BaseButton withGradient colorType={'danger'} isLoading={clearSessionLoading} onClick={() => setValidateDisabledAccount(!validateDisabledAccount)}>
                    {t('PROFILE.DANGER_ZONE.DELETE_ACCOUNT')}
                  </BaseButton>
                </VStack>
              </Flex>
            </ProfileForm>
            <Flex width={'full'} alignItems={'flex-end'} justifyContent={'flex-end'}>
              <BaseButton colorType={'success'} onClick={() => handleSubmit()} isLoading={false} disabled={!dirty}>
                {t('COMMON.VALIDATE')}
              </BaseButton>
            </Flex>
          </VStack>
        )}
      </Formik>

      <DisabledAccount
        onChange={() => setValidateDisabledAccount(!validateDisabledAccount)}
        isOpen={validateDisabledAccount}
        callback={handleDeactivate}
        data={currentUser?.email}
        isLoading={deactivatePending}
      />
      <GlobalModal isOpen={open} isRevoke={isRevoke} onChange={() => setOpen(!open)} callback={actions} isLoading={removeKeyPending || removeSessionPending} />

      <PassKeyModal isOpen={openPassKeyModal} onChange={() => setOpenPasskeyModal(!openPassKeyModal)} callback={handleRegisterNewKey} isLoading={registerNewKeyPending} />
    </>
  )
}
