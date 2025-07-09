'use client'

import { useEffect, useState } from 'react'
import { PiWarningBold } from 'react-icons/pi'
import { BaseText, ModalComponent } from '_components/custom'
import { hexToRGB } from '_theme/colors'
import { Session } from 'next-auth'
import { useTranslation } from 'react-i18next'
import { VariablesColors } from '_theme/variables'
import { useAuth } from '_hooks/useAuth'

export const SessionErrorModal = ({ session }: { session: Session | null }) => {
  const { t } = useTranslation()
  const [showSessionError, setShowSessionError] = useState(false)
  const { logout, login, isLoading } = useAuth()

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      setShowSessionError(true)
    }
  }, [session])

  const handleReconnect = () => {
    login({ otpRequired: true })
  }
  const handleSignOut = () => {
    logout()
  }

  return (
    <ModalComponent
      open={showSessionError}
      icon={<PiWarningBold size={22} color={VariablesColors.warning} />}
      iconBackgroundColor={hexToRGB('warning', 0.2)}
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
