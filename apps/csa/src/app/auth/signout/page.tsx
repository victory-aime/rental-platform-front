'use client'

import { Center, Flex } from '@chakra-ui/react'
import { BaseButton, BaseText } from '_components/custom'
import { APP_ROUTES } from '_config/routes'
import { hexToRGB } from '_theme/colors'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa'

const SignOutPage = () => {
  const [loading, setLoading] = useState(false)

  const redirectToKeycloak = () => {
    signIn('keycloak', { callbackUrl: APP_ROUTES.HOME }).then(() => setLoading(false))
    setLoading(true)
  }

  return (
    <Center width={'100vw'} height={'100vh'} p={4}>
      <Flex alignItems={'center'} justifyContent={'center'} flexDir={'column'} gap={8} borderWidth={'2px'} p={10} rounded={'xl'} boxShadow={'lg'} boxShadowColor={'bg.error'}>
        <Flex alignItems={'center'} justifyContent={'center'} boxSize={'65px'} bgColor={hexToRGB('primary', 0.1)} rounded={'2xl'}>
          <FaCheck size={24} color={'blue'} />
        </Flex>
        <BaseText maxW={'800px'} textAlign={'center'}>
          Déconnexion réussie Vous vous êtes déconnecté avec succès. Merci d'avoir utilisé notre service. Pour vous reconnecter, veuillez cliquer sur le bouton ci-dessous.
        </BaseText>
        <BaseButton isLoading={loading} withGradient colorType={'primary'} onClick={redirectToKeycloak}>
          Se reconnecter
        </BaseButton>
      </Flex>
    </Center>
  )
}

export default SignOutPage
