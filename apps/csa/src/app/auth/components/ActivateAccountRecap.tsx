import { BaseText, ModalComponent, ModalOpenProps, TextVariant } from '_components/custom'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { BsShieldFillCheck } from 'react-icons/bs'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

export const ActivateAccountRecap: FC<ModalOpenProps> = ({ isOpen, isLoading, onChange }) => {
  const { t } = useTranslation()
  const { width, height } = useWindowSize()

  return (
    <>
      {isOpen && <Confetti width={width} height={height} numberOfPieces={500} recycle={false} />}
      <ModalComponent
        iconBackgroundColor={'secondary.800'}
        icon={<BsShieldFillCheck size={18} />}
        title={'PROFILE.OTP_CHECK_TITLE'}
        closeOnInteractOutside={false}
        isOpen={isOpen}
        onChange={() => {
          onChange(!isOpen)
        }}
        onClick={() => {}}
        isLoading={isLoading}
        ignoreFooter={false}
        buttonCancelTitle={''}
        buttonSaveTitle={'COMMON.LOGIN'}
        colorSaveButton={'secondary'}
      >
        <BaseText variant={TextVariant.M}>{t('PROFILE.ACTIVE_ACCOUNT_SUCCESS')}</BaseText>
      </ModalComponent>
    </>
  )
}
