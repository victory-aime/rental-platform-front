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
          iconBackroungColor={hexToRGB('blue', 0.5)}
          title={!data?.id ? 'Ajouter un parc' : 'Modifier le parc'}
          open={isOpen}
          onChange={onChange}
          onClick={handleSubmit}
          isLoading={isLoading}
          ignoreFooter={false}
        >
          <VStack gap={8}>
            <FormTextInput name="name" label="Nom du parc" placeholder="nom du parc" value={values?.name} />
            <FormTextInput name="address" label="Adresse du parc" placeholder="adresse du parc" value={values?.address} />
          </VStack>
        </ModalComponent>
      )}
    </Formik>
  )
}
