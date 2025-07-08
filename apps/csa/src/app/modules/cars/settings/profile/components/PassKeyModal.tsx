import { BaseText, ModalComponent, ModalOpenProps } from '_components/custom'
import { VariablesColors } from '_theme/variables'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { VscKey } from 'react-icons/vsc'

export const PassKeyModal: FC<ModalOpenProps> = ({ isOpen, onChange, callback = () => {}, isLoading }) => {
  const { t } = useTranslation()

  return (
    <ModalComponent
      title={'PROFILE.SECURITY.ADD_PASS_KEY'}
      isOpen={isOpen}
      isLoading={isLoading}
      onClick={callback}
      onChange={() => onChange(!isOpen)}
      ignoreFooter={false}
      icon={<VscKey color={VariablesColors.white} />}
      iconBackgroundColor="tertiary.500"
    >
      <BaseText>{t('PROFILE.SECURITY.ADD_PASS_KEY_INFO')}</BaseText>
    </ModalComponent>
  )
}
