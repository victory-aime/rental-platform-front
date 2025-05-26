import { Flex } from '@chakra-ui/react'
import { ImageRatio } from '_components/custom'
import React from 'react'

export const DisplayImage = ({ value }: { value: string[] }) => {
  return (
    <Flex width={'110px'} height={'110px'} bgColor={'gray.200'} borderRadius={'7px'} p={1}>
      <ImageRatio image={value?.[0] ?? 'https://avatar.iran.liara.run/public'} />
    </Flex>
  )
}
