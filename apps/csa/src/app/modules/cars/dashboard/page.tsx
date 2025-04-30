'use client'
import { Box, Flex, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BoxContainer } from '_components/custom'
import { BaseButton } from '_components/custom/button'
import { BaseText } from '_components/custom/base-text/BaseText'
import { TextVariant } from '_components/custom/base-text'
import ThinkBoxModal from './components/ThinkBoxModal'

export default function Dashboard() {
  const [openTinhBox, setOpenTinhBox] = useState(false)

  return (
    <BoxContainer border={'none'} title={'Tableau de bord'} description={`Bienvenu sur votre tableau de bord`}>
      <VStack gap={8} width={'full'} mt={'30px'} overflowX={'auto'}>
        <Box width={'250px'}>Test</Box>
        <VStack gap={5} width={{ base: 'full', lg: '1/2' }}>
          <BaseText variant={TextVariant.M} textAlign={'center'}>
            Pour ameliorer votre experience, nous vous invitons à nous faire part de vos suggestions et de vos commentaires. Nous sommes impatients de vous entendre et de travailler ensemble pour
            rendre notre application encore meilleure !<br />
            Appuyer sur ce bouton pour nous faire part de vos suggestions.
          </BaseText>
          <BaseButton withGradient colorType={'primary'} onClick={() => setOpenTinhBox(true)}>
            J'ai une idee
          </BaseButton>
        </VStack>
      </VStack>
      <Flex gap={8} width={'full'} mt={'30px'} flexDir={{ base: 'column', md: 'row' }} overflowX={'auto'}></Flex>
      <ThinkBoxModal isOpen={openTinhBox} onChange={() => setOpenTinhBox(false)} />
    </BoxContainer>
  )
}
