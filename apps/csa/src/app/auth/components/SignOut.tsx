'use client'

import { Box, Button, Center, Flex } from '@chakra-ui/react'
import { BaseButton, BaseText } from '_components/custom'
import { FormDatePicker } from '_components/custom/form/FormDatePicker'
import { APP_ROUTES } from '_config/routes'
import { hexToRGB } from '_theme/colors'
import { Formik } from 'formik'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useTranslation } from 'react-i18next'

export const SignOut = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  const redirectToKeycloak = () => {
    signIn('keycloak', { callbackUrl: APP_ROUTES.HOME }).then(() => setLoading(false))
    setLoading(true)
  }

  const bookedDates = [new Date(2025, 5, 8), new Date(2025, 5, 9), new Date(2025, 5, 10), { from: new Date(2025, 5, 15), to: new Date(2025, 5, 20) }]

  return (
    <Center p={4}>
      {/* <Flex alignItems={'center'} justifyContent={'center'} flexDir={'column'} gap={8} borderWidth={'2px'} p={10} rounded={'xl'} boxShadow={'lg'} boxShadowColor={'bg.error'}>
        <Flex alignItems={'center'} justifyContent={'center'} boxSize={'65px'} bgColor={hexToRGB('primary', 0.1)} rounded={'2xl'}>
          <FaCheck size={24} color={'blue'} />
        </Flex>
        <BaseText maxW={'800px'} textAlign={'center'}>
          {t('LOGOUT_MESSAGE')}
        </BaseText>
        <BaseButton isLoading={loading} withGradient colorType={'primary'} onClick={redirectToKeycloak}>
          {t('COMMON.LOGIN')}
        </BaseButton>
      </Flex> */}
      {/* <CustomCalendar /> */}

      <Formik
        enableReinitialize
        initialValues={{
          dates: undefined as DateRange | undefined,
        }}
        onSubmit={(values) => {
          console.log('Form data:', values)
        }}
      >
        {({ values, isSubmitting }) => (
          <Box width={'full'} mx="auto" mt={8}>
            <BaseText>{JSON.stringify(values)}</BaseText>
            <FormDatePicker name="dates" label="Dates de réservation" mode="range" />
            <Button mt={4} type="submit" colorScheme="blue" loading={isSubmitting}>
              Soumettre
            </Button>
          </Box>
        )}
      </Formik>
    </Center>
  )
}
