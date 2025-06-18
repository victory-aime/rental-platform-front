'use client'

import { Flex, For, Spinner, SpinnerProps } from '@chakra-ui/react'
import React from 'react'
import { Box } from '@chakra-ui/react'

interface Spinner extends SpinnerProps {
  loader: boolean
}

export const Loader = ({ loader, ...rest }: Spinner) => {
  return (
    <Flex alignItems={'center'} justifyContent={'center'}>
      {loader && <Spinner {...rest} animationDuration="0.4s" size={rest.size} color={'primary.500'} borderWidth={'3px'} />}
    </Flex>
  )
}

export const GlobalLoader = ({ loader }: Spinner) => {
  return (
    loader && (
      <Box position="fixed" top="0" left="0" w="100vw" h="100vh" bg="rgba(10,16,16,0.85)" display="flex" justifyContent="center" alignItems="center" zIndex={1000}>
        <Flex gap={3}>
          <For each={[0, 1, 2]}>{(i) => <Box key={i} w="12px" h="12px" borderRadius="full" bg="primary.500" animation={`${'dotBounce'} 1s ${i * 0.2}s infinite ease-in-out`} />}</For>
        </Flex>
      </Box>
    )
  )
}
