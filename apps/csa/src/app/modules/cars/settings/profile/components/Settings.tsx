import React, { useState } from 'react'
import { DisabledAccount } from './DisabledAccount'
import { VStack, HStack, Flex, For } from '@chakra-ui/react'
import { BaseText, TextVariant, FormTextInput, BaseButton, BoxIcon, BaseBadge } from '_components/custom'
import { Formik } from 'formik'
import { ProfileForm } from './ProfileForm'
import { CommonModule } from 'rental-platform-state'
import { signOut, useSession } from 'next-auth/react'
import { useGlobalLoader } from '_context/loaderContext'
import { keycloakSessionLogOut } from '_hooks/logout'
import { APP_ROUTES } from '_config/routes'
import { TrashIcon } from '_assets/svg'
import { useTranslation } from 'react-i18next'
import { UTILS } from 'rental-platform-shared'
import { GlobalModal } from './GlobalModal'

export const Settings = () => {
  const { data: session } = useSession()
  const { t } = useTranslation()
  const { showLoader, hideLoader } = useGlobalLoader()
  const [open, setOpen] = useState<boolean>(false)
  const [isRevoke, setIsRevoke] = useState<boolean>(false)
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

  const { data: userSessions } = CommonModule.UserModule.getAllSessionsQueries({
    payload: {
      keycloakId: currentUser?.keycloakId || '',
    },
    queryOptions: {
      enabled: !!currentUser,
    },
  })

  const { data: credential, refetch: refetchCredentials } = CommonModule.UserModule.credentialInfoQueries({
    payload: {
      keycloakId: currentUser?.keycloakId || '',
    },
    queryOptions: {
      enabled: !!currentUser,
    },
  })

  const { mutateAsync } = CommonModule.UserModule.registerPasskeyMutation({
    mutationOptions: {
      onSuccess: () => {},
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
        enabledOrDeactivate: false,
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

  const actions = async () => {
    isRevoke ? await removeKeyMutation({ params: { keycloakId: currentUser?.keycloakId, credentialId: selectedData } }) : handleClearSessions(selectedData)
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
            <ProfileForm title="SIDE_BAR.PROFILE" description="PROFILE.PERSONAL_INFO">
              <FormTextInput name="newPassword" label="PROFILE.NEW_PASSWORD" placeholder="PROFILE.NEW_PASSWORD" type="password" value={values?.newPassword} />
            </ProfileForm>

            <ProfileForm
              title="Clés d'accès (Passkeys)"
              description="Ajoutez une ou plusieurs clés d'accès pour vous connecter sans mot de passe. Utilisez la reconnaissance faciale, une empreinte ou un appareil sécurisé compatible."
            >
              <BaseButton withGradient colorType={'info'} onClick={() => {}}>
                Ajouter une clé d'accès
              </BaseButton>
              {(filteredCredentials?.length ?? 0) > 0 ? (
                <For each={filteredCredentials ?? []}>
                  {(cred) => (
                    <HStack key={cred.id} width={'full'} mt={5} justifyContent={'space-between'} py={2} borderBottom="1px solid" borderColor={'lighter.500'}>
                      <VStack alignItems="flex-start" gap={1}>
                        <BaseText fontWeight="bold">{cred.userLabel || 'Appareil sans nom'}</BaseText>
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
                          console.log('clicked')
                        }}
                      >
                        <TrashIcon />
                      </BoxIcon>
                    </HStack>
                  )}
                </For>
              ) : (
                <BaseText mt={8}>Aucune clé détectée.</BaseText>
              )}
            </ProfileForm>

            <ProfileForm
              title="Sessions actives"
              description="Voici les connexions actuellement actives sur votre compte. Si vous voyez une activité inconnue, vous pouvez fermer une session à distance."
            >
              {userSessions?.sessions?.length > 0 ? (
                userSessions?.sessions?.map((session: { ipAddress: string; start: string; lastAccess: string; id: string }) => (
                  <HStack key={session.id} width="full" justifyContent="space-between" alignItems="center" borderBottom="1px solid #e5e5e5" py={2} borderRadius="md">
                    <VStack alignItems="flex-start" gap={0}>
                      <HStack>
                        <BaseText fontWeight="bold">Adresse IP : {session.ipAddress}</BaseText>
                        {session.id === currentSessionId && <BaseBadge label="Session actuelle" type={'common'} />}
                      </HStack>

                      <BaseText variant={TextVariant.XS}>Début de session : {UTILS.formatCreatedAt(session.start)}</BaseText>
                      <BaseText variant={TextVariant.XS}>Dernier accès : {UTILS.formatCreatedAt(session.lastAccess)}</BaseText>
                    </VStack>
                    {userSessions?.sessions?.length >= 1 && (
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
                  </HStack>
                ))
              ) : (
                <BaseText>Aucune session active détectée.</BaseText>
              )}
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
    </>
  )
}
