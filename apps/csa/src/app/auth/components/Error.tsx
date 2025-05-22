'use client'

import { Center, Flex } from '@chakra-ui/react'
import { BaseButton, BaseText } from '_components/custom'
import { APP_ROUTES } from '_config/routes'
import { hexToRGB } from '_theme/colors'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import { MdError } from 'react-icons/md'

export const Error = () => {
  const [loading, setLoading] = useState(false)

  const redirectToKeycloak = () => {
    signIn('keycloak', { callbackUrl: APP_ROUTES.HOME }).then(() => setLoading(false))
    setLoading(true)
  }

  return (
    <Center width={'100vw'} height={'100vh'} p={4}>
      <Flex alignItems={'center'} justifyContent={'center'} flexDir={'column'} gap={8} borderWidth={'2px'} p={10} rounded={'xl'} boxShadow={'lg'} boxShadowColor={'bg.error'}>
        <Flex alignItems={'center'} justifyContent={'center'} boxSize={'65px'} bgColor={hexToRGB('red', 0.1)} rounded={'2xl'}>
          <MdError size={24} color={'red'} />
        </Flex>
        <BaseText maxW={'800px'} textAlign={'center'}>
          Une erreur est survenue lors de votre tentative de connexion. Cela peut être dû à une session expirée ou à un problème d'authentification. Veuillez essayer de vous reconnecter en cliquant
          sur le bouton ci-dessous.
        </BaseText>
        <BaseButton isLoading={loading} colorType={'primary'} onClick={redirectToKeycloak}>
          Se connecter
        </BaseButton>
      </Flex>
    </Center>
  )
}
