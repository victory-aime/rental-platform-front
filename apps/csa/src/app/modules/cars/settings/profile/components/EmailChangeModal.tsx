import { ModalComponent, BaseText, ModalOpenProps } from '_components/custom'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { HiOutlineMail } from 'react-icons/hi'

export const EmailChangeModal: FC<ModalOpenProps> = ({ isOpen, onChange, callback, isLoading }) => {
  const { t } = useTranslation()
  return (
    <ModalComponent
      isOpen={isOpen}
      ignoreFooter={false}
      onChange={onChange}
      onClick={callback}
      title="PROFILE.EMAIL_UPDATE"
      icon={<HiOutlineMail />}
      iconBackgroundColor="primary.300"
      isLoading={isLoading}
    >
      <BaseText>{t('PROFILE.EMAIL_UPDATE_INFO')}</BaseText>
    </ModalComponent>
  )
}
