import { Flex, Spinner, SpinnerProps } from '@chakra-ui/react'
import React from 'react'

interface Spni extends SpinnerProps {
  loader: boolean
}

export const Loader = ({ loader, ...rest }: Spni) => {
  return (
    <Flex alignItems={'center'} justifyContent={'center'}>
      {loader && <Spinner {...rest} animationDuration="0.4s" size={rest.size} color={'primary.500'} borderWidth={'3px'} />}
    </Flex>
  )
}
