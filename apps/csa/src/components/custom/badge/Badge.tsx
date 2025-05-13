import { Badge, HStack } from '@chakra-ui/react'
import React, { FC } from 'react'
import { Props } from './interface/badge'
import { BaseText, TextVariant } from '../base-text'

export const BaseBadge: FC<Props> = ({ children, variant = 'solid', label = 'badge', color = 'primary.500', type = 'order', ...props }) => {
  return (
    <Badge {...props} variant={variant} size="lg" borderRadius="7px" p={'10px'} color="white" bgColor={color}>
      <HStack gap={1}>
        <BaseText variant={TextVariant.S} textTransform="capitalize">
          {label}
        </BaseText>
      </HStack>
    </Badge>
  )
}
