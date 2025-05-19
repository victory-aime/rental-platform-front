import { VStack } from '@chakra-ui/react'
import { BaseButton, BaseText, FormTextInput, ModalComponent, ModalOpenProps } from '_components/custom'
import { VariablesColors } from '_theme/variables'
import { Formik } from 'formik'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaTrashAlt } from 'react-icons/fa'

export const DeleteParcModal: FC<ModalOpenProps> = ({ isOpen, isLoading, callback, data, onChange }) => {
  const { t } = useTranslation()
  const [consent, setConsent] = useState<boolean>(false)

  const handleClose = () => {
    onChange?.(!isOpen)
    setConsent(false)
  }

  return (
    <Formik
      initialValues={{ parkName: '' }}
      onSubmit={() => {
        callback?.()
        handleClose()
      }}
    >
      {({ values, handleSubmit }) => (
        <ModalComponent icon={<FaTrashAlt color={VariablesColors.white} size={20} />} title="PARC.DELETE_TITLE" open={isOpen} modalType="alertdialog" onChange={handleClose}>
          <VStack gap={8} width={'full'}>
            <BaseText>
              <span style={{ color: VariablesColors.red, fontWeight: 'bold' }}>{t('COMMON.WARNING.TITLE')} : </span> {t('COMMON.WARNING.DESC')}
            </BaseText>

            {!consent ? (
              <BaseButton isLoading={isLoading} width={'full'} bg={'gray.700'} onClick={() => setConsent(true)}>
                {t('PARC.CONSENT_TITLE')}
              </BaseButton>
            ) : (
              <VStack gap={4} width={'full'} alignItems={'flex-start'} animation={'slideIn'}>
                <BaseText>{t('COMMON.CONFIRM_TEXT', { value: data?.name })}</BaseText>
                <FormTextInput name="parkName" />
                <BaseButton isLoading={isLoading} disabled={values.parkName !== data?.name} width={'full'} colorType={'danger'} onClick={() => handleSubmit()}>
                  {t('COMMON.DELETE')}
                </BaseButton>
              </VStack>
            )}
          </VStack>
        </ModalComponent>
      )}
    </Formik>
  )
}
