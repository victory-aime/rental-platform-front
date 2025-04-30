import { Flex, FlexProps } from '@chakra-ui/react'
import React, { FC } from 'react'

export const BoxIcon: FC<FlexProps> = ({ children, color, ...rest }) => {
  return (
    <Flex alignItems={'center'} justifyContent={'center'} bgColor={color} color={'white'} borderRadius={'15px'} boxSize={'45px'} {...rest}>
      {children}
    </Flex>
  )
}
