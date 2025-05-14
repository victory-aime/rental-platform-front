import { Flex } from '@chakra-ui/react'
import { ImageRatio } from '_components/custom'
import React from 'react'

export const DisplayImage = ({ value }: { value: string[] }) => {
  return (
    <Flex width={'100px'} height={'100px'} bgColor={'whiteAlpha.400'} borderRadius={'7px'}>
      <ImageRatio image={value?.[0] ?? 'https://avatar.iran.liara.run/public'} />
    </Flex>
  )
}
