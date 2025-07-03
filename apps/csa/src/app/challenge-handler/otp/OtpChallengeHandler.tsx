import { Formik } from 'formik'
import { BaseText, FormOtpInput, ModalComponent, ModalOpenProps, TextVariant } from '_components/custom'
import { TbLockPassword } from 'react-icons/tb'
import { FC } from 'react'
import { maskValue } from '_components/custom/form/utils/maskValue'
import { VStack } from '@chakra-ui/react'
import { VariablesColors } from '_theme/variables'
import { useTranslation } from 'react-i18next'
import { useCountdown } from '_hooks/remainingTime'
import { RenderOtpTimeHelper } from './utils/RenderOtpTimeHelper'

export interface IOTPModal extends ModalOpenProps {
  renewOtpCallback?: (values?: any, helpers?: any) => void
  blockedTimeLeft?: number
  closeButton?: boolean
}

export const OtpChallengeHandler: FC<IOTPModal> = ({ isOpen, isLoading, callback = () => {}, onChange, data, renewOtpCallback, blockedTimeLeft = 0, closeButton = true }) => {
  const { t } = useTranslation()

  const { remainingTime: blockRemaining, formatted: blockFormatted } = useCountdown(blockedTimeLeft ?? 0)
  const { remainingTime: otpRemaining, formatted: otpFormatted } = useCountdown(data?.expiresIn ?? 0)

  const renderMaskEmail = (value: string) => {
    if (!value) return ''
    return maskValue(value, 5)
  }

  return (
    <Formik initialValues={{ otpCode: '' }} onReset={onChange} onSubmit={(values, helpers) => callback(values, helpers)}>
      {({ handleSubmit, resetForm }) => (
        <ModalComponent
          iconBackgroundColor={'primary.800'}
          icon={<TbLockPassword size={18} />}
          title={'PROFILE.OTP_CHECK_TITLE'}
          closeOnInteractOutside={false}
          closeOnEscape={false}
          isOpen={isOpen}
          onChange={() => {
            onChange(!isOpen)
            resetForm()
          }}
          onClick={handleSubmit}
          isLoading={isLoading}
          disabled={blockRemaining > 0}
          ignoreFooter={false}
          showCloseButton={closeButton}
          buttonCancelTitle={''}
        >
          <VStack gap={3} mb={5}>
            <BaseText variant={TextVariant.S} lineHeight={'1.5'} textAlign={'justify'}>
              {t('PROFILE.OTP_ACCOUNT_ENABLED_DESC', { email: renderMaskEmail(data?.email ?? data?.user?.email) })}
            </BaseText>
            <BaseText variant={TextVariant.S}>{t('PROFILE.OTP_WARNING')}</BaseText>
          </VStack>
          <VStack gap={4}>
            <FormOtpInput name="otpCode" isDisabled={blockRemaining > 0} />

            <RenderOtpTimeHelper blockRemaining={blockRemaining} otpRemaining={otpRemaining} blockFormatted={blockFormatted} otpFormatted={otpFormatted} />

            {blockRemaining <= 0 && renewOtpCallback && (
              <BaseText>
                {t('PROFILE.OTP_RETRY')}{' '}
                <span
                  style={{
                    color: VariablesColors.primary,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                  onClick={renewOtpCallback}
                >
                  {t('PROFILE.OTP_RESEND')}
                </span>
              </BaseText>
            )}
          </VStack>
        </ModalComponent>
      )}
    </Formik>
  )
}
