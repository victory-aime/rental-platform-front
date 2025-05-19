import { Box, Flex, HStack, Image } from '@chakra-ui/react'
import { ListMenu } from '_assets/svg'
import { SideBarProps } from '../sidebar/types'
import { BaseText, CustomSkeletonLoader } from '_components/custom'
import { CommonModule } from 'rental-platform-state'
import { useTranslation } from 'react-i18next'
import { StorageKey } from '_constants/StorageKeys'
import { SelectLanguages } from '_modules/components/SelectLanguages'
import { useState } from 'react'
import { FlagImagesIcon } from '_modules/components/flag/FlagImages'
import { FlagKeys } from '_assets/images/flag'

export const Header = ({ onShowSidebar, session }: SideBarProps) => {
  const { t } = useTranslation()
  const getPreferredLanguage = localStorage.getItem(StorageKey.LANGUAGE)
  const [openSelectLanguage, setOpenSelectLanguage] = useState<boolean>(false)
  const cachedUser = CommonModule.UserModule.UserCache.getUser()
  const { data: user, isLoading } = CommonModule.UserModule.userInfoQueries({
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
          <Flex gap={8}>
            <FlagImagesIcon countryImage={getPreferredLanguage?.toUpperCase() as FlagKeys} boxSize={'35px'} onClick={() => setOpenSelectLanguage(true)} />

            <Flex alignItems={{ base: 'center', md: 'flex-start' }} justifyContent={'flex-end'} flexDir={{ base: 'row', md: 'row-reverse' }} gap={3} width={'100%'}>
              <HStack truncate maxW={'250px'} flexWrap={'wrap'} color={'gray.400'}>
                <BaseText> {t('WELCOME', { username: user?.name })} </BaseText>
              </HStack>
              <Image draggable="false" src={'https://avatar.iran.liara.run/public'} boxSize={'35px'} borderRadius={'7px'} fit="cover" objectPosition="center" alt="img-url" />
            </Flex>
          </Flex>
        )}
      </Box>
      <SelectLanguages isOpen={openSelectLanguage} onChange={() => setOpenSelectLanguage(false)} />
    </Flex>
  )
}
