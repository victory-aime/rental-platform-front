'use client'

import { BaseText, FormTextInput, ModalComponent, ModalOpenProps } from '_components/custom'
import { Formik } from 'formik'
import { FC } from 'react'
import { BiSolidUserAccount } from 'react-icons/bi'
import { VariablesColors } from '_theme/variables'
import { useTranslation } from 'react-i18next'

export const ActivateAccount: FC<ModalOpenProps> = ({ isOpen, isLoading, onChange, callback = () => {} }) => {
  const { t } = useTranslation()
  return (
    <Formik initialValues={{ email: '' }} onSubmit={callback}>
      {({ handleSubmit }) => (
        <ModalComponent
          iconBackgroundColor={'primary.800'}
          icon={<BiSolidUserAccount color={VariablesColors.primary} />}
          title={'PROFILE.ACTIVATE_ACCOUNT'}
          isOpen={isOpen}
          onChange={onChange}
          onClick={handleSubmit}
          isLoading={isLoading}
          ignoreFooter={false}
        >
          <BaseText mb={5} lineHeight={'1.5'}>
            {t('PROFILE.ACTIVATE_ACCOUNT_DESC')}
          </BaseText>
          <FormTextInput name={'email'} label={'PROFILE.EMAIL'} placeholder={'PROFILE.EMAIL'} useMask maskVisibleCount={5} />
        </ModalComponent>
      )}
    </Formik>
  )
}
