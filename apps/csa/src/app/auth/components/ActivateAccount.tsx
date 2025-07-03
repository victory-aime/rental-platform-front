'use client'

import { BaseText, FormTextInput, ModalComponent } from '_components/custom'
import { Formik } from 'formik'
import { FC } from 'react'
import { BiSolidUserAccount } from 'react-icons/bi'
import { VariablesColors } from '_theme/variables'
import { useTranslation } from 'react-i18next'
import { useCountdown } from '_hooks/remainingTime'
import { RenderOtpTimeHelper } from '../../challenge-handler/otp/utils/RenderOtpTimeHelper'
import { IOTPModal } from '../../challenge-handler/otp/OtpChallengeHandler'

export const ActivateAccount: FC<IOTPModal> = ({ isOpen, isLoading, onChange, callback = () => {}, data, blockedTimeLeft = 0 }) => {
  const { t } = useTranslation()

  const { remainingTime: blockRemaining, formatted: blockFormatted } = useCountdown(Number(blockedTimeLeft) ?? 0)
  const { remainingTime: otpRemaining, formatted: otpFormatted } = useCountdown(data ?? 0)

  return (
    <Formik initialValues={{ email: '' }} onSubmit={(values, helpers) => callback(values, helpers)}>
      {({ handleSubmit }) => (
        <ModalComponent
          iconBackgroundColor={'primary.800'}
          icon={<BiSolidUserAccount color={VariablesColors.primary} />}
          title={'PROFILE.ACTIVATE_ACCOUNT'}
          isOpen={isOpen}
          onChange={onChange}
          onClick={handleSubmit}
          isLoading={isLoading}
          disabled={otpRemaining > 0 || blockRemaining > 0}
          ignoreFooter={false}
        >
          <BaseText mb={5} lineHeight={'1.5'}>
            {t('PROFILE.ACTIVATE_ACCOUNT_DESC')}
          </BaseText>
          <FormTextInput name={'email'} label={'PROFILE.EMAIL'} placeholder={'PROFILE.EMAIL'} />
          <RenderOtpTimeHelper blockRemaining={blockRemaining} otpRemaining={otpRemaining} blockFormatted={blockFormatted} otpFormatted={otpFormatted} />
        </ModalComponent>
      )}
    </Formik>
  )
}
