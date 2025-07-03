'use client'

import { useEffect, useState } from 'react'
import { signIn, signOut } from 'next-auth/react'
import { PiWarningBold } from 'react-icons/pi'
import { BaseText, ModalComponent } from '_components/custom'
import { hexToRGB } from '_theme/colors'
import { Session } from 'next-auth'
import { useTranslation } from 'react-i18next'
import { keycloakSessionLogOut } from '_hooks/logout'
import { APP_ROUTES } from '_config/routes'
import { useGlobalLoader } from '_context/loaderContext'
import { VariablesColors } from '_theme/variables'

export const SessionErrorModal = ({ session }: { session: Session | null }) => {
  const { t } = useTranslation()
  const [showSessionError, setShowSessionError] = useState(false)
  const { showLoader, hideLoader, isLoading } = useGlobalLoader()

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      setShowSessionError(true)
    }
  }, [session])

  const handleReconnect = () => {
    showLoader()
    signIn('keycloak').then(() => hideLoader())
  }
  const handleSignOut = () => {
    showLoader()
    keycloakSessionLogOut().then(() => signOut({ callbackUrl: APP_ROUTES.SIGN_IN }).then(() => hideLoader()))
  }

  return (
    <ModalComponent
      open={showSessionError}
      icon={<PiWarningBold size={22} color={VariablesColors.warning} />}
      iconBackgroundColor={hexToRGB('orange', 0.4)}
      title={'SESSION_EXPIRE'}
      buttonSaveTitle={'COMMON.LOGIN'}
      buttonCancelTitle={'COMMON.LOGOUT'}
      colorSaveButton={'primary'}
      ignoreFooter={false}
      closeOnEscape={false}
      closeOnInteractOutside={false}
      lazyMount
      isLoading={isLoading}
      showCloseButton={false}
      onClick={handleReconnect}
      onChange={handleSignOut}
    >
      <BaseText>{t('SESSION_MESSAGE')}</BaseText>
    </ModalComponent>
  )
}
