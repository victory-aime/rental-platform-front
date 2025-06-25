import { VStack } from '@chakra-ui/react'
import { FormTextInput, ModalComponent, ModalOpenProps } from '_components/custom'
import { hexToRGB } from '_theme/colors'
import { Formik } from 'formik'
import React, { FC } from 'react'
import { FaParking } from 'react-icons/fa'

export const ParcFormModal: FC<ModalOpenProps> = ({ isOpen, onChange, data, callback = () => {}, isLoading }) => {
  return (
    <Formik
      initialValues={{
        name: data?.name ?? '',
        address: data?.address ?? '',
      }}
      enableReinitialize
      onSubmit={(values, actions) => {
        callback(values)
        actions.resetForm()
      }}
    >
      {({ values, handleSubmit }) => (
        <ModalComponent
          icon={<FaParking />}
          iconBackgroundColor={'primary.900'}
          title={!data?.id ? 'PARC.ADD_TITLE' : 'PARC.EDIT_TITLE'}
          buttonSaveTitle={data?.id ? 'COMMON.EDIT' : 'COMMON.VALIDATE'}
          open={isOpen}
          onChange={onChange}
          onClick={handleSubmit}
          isLoading={isLoading}
          ignoreFooter={false}
        >
          <VStack gap={8}>
            <FormTextInput name="name" label="PARC.FORMS.NAME" placeholder="PARC.FORMS.NAME" value={values?.name} />
            <FormTextInput name="address" label="PARC.FORMS.ADDRESS" placeholder="PARC.FORMS.ADDRESS" value={values?.address} />
          </VStack>
        </ModalComponent>
      )}
    </Formik>
  )
}
