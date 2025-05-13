'use client'

import { Box, Center, Spinner } from '@chakra-ui/react'
import { BaseButton } from '_components/custom/button'
import { Suspense } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { IoIosArrowDropleftCircle } from 'react-icons/io'
import { BoxContainer } from '_components/custom'

export const Container = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const router = useRouter()

  const isModuleRoot = pathname.split('/').length > 2
  const showBackButton = !isModuleRoot

  return (
    <Box h="100%" width="100%" ps={{ base: 5, md: '20px' }} pe={{ base: 5, md: '33px' }} pb={{ base: '1rem', xl: '4rem' }}>
      <Suspense
        fallback={
          <Center height="100vh">
            <Spinner color="primary.500" />
          </Center>
        }
      >
        {showBackButton && (
          <BaseButton px={'15px'} mt={'30px'} colorType={'primary'} leftIcon={<IoIosArrowDropleftCircle />} onClick={() => router.back()}>
            Retour
          </BaseButton>
        )}
        <BoxContainer p={0} border={'none'} mt={showBackButton ? '30px' : '0'}>
          {children}
        </BoxContainer>
      </Suspense>
    </Box>
  )
}
