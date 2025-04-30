import { Box, Flex, HStack, Image } from '@chakra-ui/react'
import { ListMenu } from '_assets/svg'
import { SideBarProps } from '../sidebar/types'
import { BaseText, CustomSkeletonLoader } from '_components/custom'
import { UserModule } from 'platform-state-management'

export const Header = ({ onShowSidebar, session }: SideBarProps) => {
  const cachedUser = UserModule.UserCache.getUser()
  const { data: user, isLoading } = UserModule.userInfoQueries({
    payload: { userId: session?.keycloakId ?? '' },
    queryOptions: {
      enabled: !cachedUser,
    },
  })

  return (
    <Flex as="header" p={4} justify={'space-between'} alignItems="center" boxShadow={'0 0 35px black.50'} position={'relative'} h={{ base: '100px', md: 'auto' }}>
      {isLoading ? (
        <CustomSkeletonLoader type="BUTTON" colorButton="primary" />
      ) : (
        <Box ms={'2px'} display="flex" alignItems="center" onClick={onShowSidebar} cursor="pointer">
          <ListMenu width={25} height={25} />
        </Box>
      )}

      <Box ms={5} display="flex" alignItems="center">
        {isLoading ? (
          <CustomSkeletonLoader numberOfLines={1} type="TEXT_IMAGE" height={'45px'} width={'200px'} direction={{ base: 'row-reverse', md: 'row' } as any} />
        ) : (
          <Flex alignItems={{ base: 'center', md: 'flex-start' }} justifyContent={'flex-end'} flexDir={{ base: 'row', md: 'row-reverse' }} gap={3} width={'100%'}>
            <HStack truncate maxW={'250px'} flexWrap={'wrap'} color={'gray.400'}>
              <BaseText>Bonjour,</BaseText>
              <BaseText> {user?.name}</BaseText>
            </HStack>
            <Image draggable="false" src={'https://avatar.iran.liara.run/public'} boxSize={'30px'} borderRadius={'7px'} fit="cover" objectPosition="center" alt="img-url" />
          </Flex>
        )}
      </Box>
    </Flex>
  )
}
