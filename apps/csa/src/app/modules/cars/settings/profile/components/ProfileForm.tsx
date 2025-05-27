import { Flex, Box } from '@chakra-ui/react'
import { BaseText, TextVariant } from '_components/custom'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const ProfileForm = ({ children, title, description }: { children: React.ReactNode; title: string; description: string }) => {
  const { t } = useTranslation()
  return (
    <Flex width={'full'} alignItems={'flex-start'} flexDir={{ base: 'column', md: 'row' }}>
      <Box width={{ base: 'full', md: '1/2' }}>
        <BaseText variant={TextVariant.S}>{t(title)}</BaseText>
        <BaseText variant={TextVariant.XS} color={'gray.500'} mt={1}>
          {t(description)}
        </BaseText>
      </Box>
      <Box width={'full'}>{children}</Box>
    </Flex>
  )
}
