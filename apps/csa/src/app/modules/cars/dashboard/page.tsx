'use client'
import { Center, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BoxContainer, BaseButton, BaseText, TextVariant } from '_components/custom'
import ThinkBoxModal from '_modules/components/ThinkBoxModal'
import { useTranslation } from 'react-i18next'

export default function Dashboard() {
  const { t } = useTranslation()
  const [openTinhBox, setOpenTinhBox] = useState(false)

  return (
    <BoxContainer border={'none'} title={t('SIDE_BAR.DASHBOARD')}>
      <Center height={'1full'} width={'full'} overflowY={'hidden'}>
        <VStack gap={5} width={{ base: 'full', lg: '800px' }}>
          <BaseText variant={TextVariant.M} textAlign={'center'}>
            {t('HELP_MESSAGE')}
          </BaseText>
          <BaseButton withGradient colorType={'primary'} onClick={() => setOpenTinhBox(true)}>
            {t('IDEA_TEXT')}
          </BaseButton>
        </VStack>
      </Center>
      <ThinkBoxModal isOpen={openTinhBox} onChange={() => setOpenTinhBox(false)} />
    </BoxContainer>
  )
}
