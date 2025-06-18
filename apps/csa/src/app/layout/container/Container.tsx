'use client'

import { Box } from '@chakra-ui/react'
import { Suspense } from 'react'
import { usePathname } from 'next/navigation'
import { BoxContainer } from '_components/custom'
import { GlobalLoader } from '_components/custom/loader/Loader'

export const Container = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const isModuleRoot = pathname.split('/').length > 2
  const showBackButton = !isModuleRoot

  return (
    <Box h="100%" width="100%" ps={{ base: 5, md: '20px' }} pe={{ base: 5, md: '33px' }} pb={{ base: '1rem', xl: '4rem' }}>
      <Suspense fallback={<GlobalLoader loader />}>
        {/* {showBackButton && (
          <BaseButton px={'15px'} mt={'30px'} colorType={'primary'} leftIcon={<IoIosArrowDropleftCircle />} onClick={() => router.back()}>
            Retour
          </BaseButton>
        )} */}
        <BoxContainer p={0} border={'none'} mt={showBackButton ? '30px' : '30px'}>
          {children}
        </BoxContainer>
      </Suspense>
    </Box>
  )
}
