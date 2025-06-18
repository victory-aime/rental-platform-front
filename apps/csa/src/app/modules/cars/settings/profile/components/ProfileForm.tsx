import { Flex, Box, FlexProps } from '@chakra-ui/react'
import { BaseBadge, BaseText, TextVariant } from '_components/custom'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface IProfileProps extends FlexProps {
  children: React.ReactNode
  title: string
  description: string
  activeBadge?: boolean
}

export const ProfileForm = ({ children, title, description, activeBadge = false, ...rest }: IProfileProps) => {
  const { t } = useTranslation()
  return (
    <Flex width={'full'} alignItems={'flex-start'} flexDir={{ base: 'column', md: 'row' }} padding={4} {...rest} gap={10}>
      <Box width={{ base: 'full', md: '1/2' }}>
        <Flex gap={3} alignItems={'center'}>
          <BaseText variant={TextVariant.S}>{t(title)}</BaseText>
          {activeBadge && <BaseBadge status={'success'} label={t('COMMON.ENABLED')} p={1.5} />}
        </Flex>
        <BaseText variant={TextVariant.XS} color={'gray.500'} mt={1}>
          {t(description)}
        </BaseText>
      </Box>
      <Box width={'full'}>{children}</Box>
    </Flex>
  )
}
