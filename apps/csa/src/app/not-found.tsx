'use client'
import { Center, Image, VStack } from '@chakra-ui/react'
import { BaseButton, BaseText, TextVariant, TextWeight } from '_components/custom'
import { APP_ROUTES } from '_config/routes'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'

const NotFoundPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <Center width={'100%'} height={'100vh'} alignItems={'center'} justifyContent={'space-around'} flexDir={{ base: 'column-reverse', md: 'row' }}>
      <VStack gap={4} alignItems={'flex-start'} width={{ base: '100%', md: '50%' }} maxWidth="500px" p={{ base: 10, md: 0 }}>
        <BaseText variant={TextVariant.H1} weight={TextWeight.Bold}>
          Oooops...
        </BaseText>
        <BaseText variant={TextVariant.H3}>{t('COMMON.PAGE_NOT_FOUND')}</BaseText>
        <BaseText variant={TextVariant.L} weight={TextWeight.Light} textAlign={{ base: 'justify', md: 'left' }}>
          {t('COMMON.PAGE_NOT_FOUND_DESC')}
        </BaseText>
        <BaseButton colorType={'info'} mt={4} onClick={() => router.push(APP_ROUTES.HOME)}>
          {t('COMMON.BACK_TO_HOME')}
        </BaseButton>
      </VStack>
      <Image src="/assets/images/404.png" alt="Not Found" width="100%" height="auto" maxWidth="500px" />
    </Center>
  )
}

export default NotFoundPage
