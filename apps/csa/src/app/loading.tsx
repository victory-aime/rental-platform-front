'use client'
import { Center } from '@chakra-ui/react'
import { Loader } from '_components/custom'
import React from 'react'

const NextLoaderPage = () => {
  return (
    <Center width={'100vw'} height={'100vh'}>
      <Loader loader />
    </Center>
  )
}

export default NextLoaderPage
