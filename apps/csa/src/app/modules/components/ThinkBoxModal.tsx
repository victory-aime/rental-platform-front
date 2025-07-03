'use client'

import { VStack } from '@chakra-ui/react'
import { FormTextArea, FormTextInput, CustomToast } from '_components/custom'
import { ModalComponent } from '_components/custom/modal'
import { ModalOpenProps } from '_components/custom/modal/interface/modal'
import { hexToRGB } from '_theme/colors'
import { Formik, FormikHelpers, FormikValues } from 'formik'
import React, { FC, useState } from 'react'
import { FcIdea } from 'react-icons/fc'
import axios from 'axios'
import { CommonModule } from 'rental-platform-state'
import { useTranslation } from 'react-i18next'
export interface InitialFormValues {
  subject: string
  message: string
}

const ThinkBoxModal: FC<ModalOpenProps> = ({ isOpen, onChange }) => {
  const { t } = useTranslation()
  const cachedUser = CommonModule.UserModule.UserCache.getUser()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmitForm = async (values: FormikValues, { resetForm }: FormikHelpers<InitialFormValues>) => {
    const emailDto = {
      sender: {
        name: cachedUser?.name,
        email: cachedUser?.email,
      },
      subject: values.subject,
      message: values.message,
    }
    setIsLoading(true)
    const promise = axios.post(`/api/send-email`, emailDto, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    CustomToast({
      asPromise: {
        promise,
        config: {
          loading: { title: t('SEND.PROGRESS'), description: t('COMMON.LOADING_TEXT') },
          success: {
            title: t('SEND.EMAIL.SUCCESS'),
            description: t('SEND.DESC_SUCCESS'),
          },
          error: {
            title: t('SEND.ERROR_TITLE'),
            description: t('SEND.ERROR_DESC'),
          },
          loader: () => {
            resetForm()
            onChange(false)
            setIsLoading(false)
          },
        },
      },
    })
  }

  return (
    <Formik initialValues={{ subject: '', message: '' }} onSubmit={handleSubmitForm}>
      {({ handleSubmit, setFieldValue }) => (
        <ModalComponent
          open={isOpen}
          onChange={() => onChange(!isOpen)}
          title={'THINK_BOX.TITLE'}
          icon={<FcIdea size={18} />}
          iconBackgroundColor={hexToRGB('orange', 0.3)}
          ignoreFooter={false}
          isLoading={isLoading}
          buttonSaveTitle={'COMMON.SEND'}
          colorSaveButton={'success'}
          onClick={handleSubmit}
        >
          <VStack gap={4}>
            <FormTextInput name="subject" label={'THINK_BOX.FORM_TITLE'} placeholder={'THINK_BOX.FORM_TITLE'} />
            <FormTextArea name="message" label={'THINK_BOX.MESSAGE'} placeholder={'THINK_BOX.MESSAGE'} onChangeFunction={(e: any) => setFieldValue('message', e?.target.value)} />
          </VStack>
        </ModalComponent>
      )}
    </Formik>
  )
}

export default ThinkBoxModal
