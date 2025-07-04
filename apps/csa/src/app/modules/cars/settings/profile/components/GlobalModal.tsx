import { LogOutIcon, TrashIcon } from '_assets/svg'
import { BaseText, ModalComponent, ModalOpenProps } from '_components/custom'
import { VariablesColors } from '_theme/variables'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface IProps extends ModalOpenProps {
  isRevoke: boolean
}

export const GlobalModal: FC<IProps> = ({ isOpen, onChange, callback = () => {}, isLoading, isRevoke }) => {
  const { t } = useTranslation()
  const title = isRevoke ? 'PROFILE.REMOVE_KEY_TITLE' : 'PROFILE.CLOSE_SESSION'
  const message = isRevoke ? 'PROFILE.REMOVE_KEY_TITLE_DESC' : 'PROFILE.CLOSE_SESSION_DESC'

  return (
    <ModalComponent
      title={title}
      isOpen={isOpen}
      isLoading={isLoading}
      onClick={callback}
      onChange={() => onChange(!isOpen)}
      ignoreFooter={false}
      icon={isRevoke ? <TrashIcon /> : <LogOutIcon fill={VariablesColors.white} />}
    >
      <BaseText>{t(message)}</BaseText>
    </ModalComponent>
  )
}
