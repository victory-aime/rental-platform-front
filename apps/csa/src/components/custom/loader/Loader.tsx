import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'

export const Loader = ({ loader }: { loader: boolean }) => {
  return (
    <Flex alignItems={'center'} justifyContent={'center'}>
      {loader && <Spinner animationDuration="0.4s" size={'xl'} color={'primary.500'} borderWidth={'3px'} />}
    </Flex>
  )
}
