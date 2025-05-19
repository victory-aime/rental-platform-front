'use client'

import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { PiWarningBold } from 'react-icons/pi'
import { BaseText, ModalComponent } from '_components/custom'
import { hexToRGB } from '_theme/colors'
import { Session } from 'next-auth'
import { useTranslation } from 'react-i18next'

export const SessionErrorModal = ({ session }: { session: Session | null }) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [showSessionError, setShowSessionError] = useState(false)

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      setShowSessionError(true)
    }
  }, [session])

  const handleReconnect = () => {
    signIn('keycloak').then(() => {
      setLoading(false)
    })
    setLoading(true)
  }

  return (
    <ModalComponent
      open={showSessionError}
      icon={<PiWarningBold size={22} color="#f97316" />}
      iconBackgroundColor={hexToRGB('orange', 0.4)}
      title={'SESSION_EXPIRE'}
      buttonSaveTitle={'COMMON.LOGIN'}
      colorSaveButton={'primary'}
      ignoreFooter={false}
      closeOnEscape={false}
      closeOnInteractOutside={false}
      lazyMount
      isLoading={loading}
      showCloseButton={false}
      onClick={handleReconnect}
    >
      <BaseText>{t('SESSION_MESSAGE')}</BaseText>
    </ModalComponent>
  )
}
