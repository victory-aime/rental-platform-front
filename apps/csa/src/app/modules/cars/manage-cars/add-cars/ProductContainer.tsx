import { Flex, Heading } from '@chakra-ui/react'
import { BoxContainer, BaseButton, CustomToolTip, BaseBadge } from '_components/custom'
import React from 'react'
import { HiInformationCircle } from 'react-icons/hi'

export const ProductContainer = ({
  children,
  title,
  tooltip,
  withBadge = false,
  type = 'badge',
  onClick,
}: {
  children: React.ReactNode
  title: string
  tooltip?: string
  withBadge?: boolean
  type?: 'button' | 'badge'
  onClick?: () => void
}) => {
  return (
    <BoxContainer width={'full'} p={'24px'}>
      <Flex alignItems={'center'} justifyContent={'space-between'} width={'full'}>
        <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
          <Heading>{title}</Heading>
          {tooltip && (
            <CustomToolTip message={tooltip}>
              <HiInformationCircle />
            </CustomToolTip>
          )}
        </Flex>
        {withBadge && type === 'badge' ? (
          <BaseBadge type={'cars'} />
        ) : type === 'button' ? (
          <BaseButton p={2} colorType={'success'} withGradient onClick={onClick}>
            Ajouter des variants
          </BaseButton>
        ) : null}
      </Flex>
      {children}
    </BoxContainer>
  )
}
