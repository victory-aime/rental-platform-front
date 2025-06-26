import { Formik } from 'formik'
import { BaseText, FormOtpInput, ModalComponent, ModalOpenProps, TextVariant } from '_components/custom'
import { TbLockPassword } from 'react-icons/tb'
import { FC } from 'react'
import { maskValue } from '_components/custom/form/utils/maskValue'
import { VStack } from '@chakra-ui/react'
import { VariablesColors } from '_theme/variables'
import { useTranslation } from 'react-i18next'

export const EnterOtpModal: FC<ModalOpenProps> = ({ isOpen, isLoading, callback = () => {}, onChange, data }) => {
  const { t } = useTranslation()
  const renderMaskEmail = (value: string) => {
    if (!value) return ''
    return maskValue(value, 5)
  }

  return (
    <Formik initialValues={{ otpCode: '' }} onSubmit={callback}>
      {({ handleSubmit }) => (
        <ModalComponent
          iconBackgroundColor={'primary.800'}
          icon={<TbLockPassword size={18} />}
          title={'PROFILE.OTP_CHECK_TITLE'}
          closeOnInteractOutside={false}
          closeOnEscape={false}
          isOpen={isOpen}
          onChange={onChange}
          onClick={handleSubmit}
          isLoading={isLoading}
          ignoreFooter={false}
          buttonCancelTitle={''}
        >
          <VStack gap={3} mb={5}>
            <BaseText variant={TextVariant.S} lineHeight={'1.5'} textAlign={'justify'}>
              {t('PROFILE.OTP_ACCOUNT_ENABLED_DESC', { email: renderMaskEmail(data) })}
            </BaseText>
            <BaseText variant={TextVariant.S}>{t('PROFILE.OTP_WARNING')}</BaseText>
          </VStack>
          <VStack gap={4}>
            <FormOtpInput name={'otpCode'} />
            <BaseText>
              {t('PROFILE.OTP_RETRY')} <span style={{ color: VariablesColors.primary, cursor: 'pointer', textDecoration: 'underline' }}>{t('PROFILE.OTP_RESEND')}</span>{' '}
            </BaseText>
          </VStack>
        </ModalComponent>
      )}
    </Formik>
  )
}
