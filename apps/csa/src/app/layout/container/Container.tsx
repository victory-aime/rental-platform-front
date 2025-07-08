'use client'

import { Box, IconButton } from '@chakra-ui/react'
import { Suspense } from 'react'
import { BoxContainer, SwitchColorMode } from '_components/custom'
import { GlobalLoader } from '_components/custom/loader/Loader'
import { useColorMode } from '_components/ui/color-mode'

export const Container = ({ children }: { children: React.ReactNode }) => {
  const { toggleColorMode } = useColorMode()
  return (
    <Box h="100%" width="100%" ps={{ base: 5, md: '20px' }} pe={{ base: 5, md: '33px' }} pb={{ base: '1rem', xl: '4rem' }}>
      <Suspense fallback={<GlobalLoader loader />}>
        <BoxContainer p={0} border={'none'} mt={'30px'} position="relative">
          {children}
          <IconButton
            position="fixed"
            bottom="45px"
            right="16px"
            zIndex="1000"
            onClick={toggleColorMode}
            aria-label="change color-mode"
            borderRadius="50px"
            animation={`fadeIn`}
            _hover={{
              transform: 'scale(1.1)',
              transition: 'transform 0.2s ease-in-out',
              filter: 'brightness(1.2)',
            }}
          >
            <SwitchColorMode hideIcon />
          </IconButton>
        </BoxContainer>
      </Suspense>
    </Box>
  )
}
