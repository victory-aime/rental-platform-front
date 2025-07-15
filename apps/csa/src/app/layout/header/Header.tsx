import { Box, Flex, Image, Separator } from '@chakra-ui/react'
import { ListMenu, LogOutIcon } from '_assets/svg'
import { SideBarProps } from '../sidebar/types'
import { BaseText, CustomSkeletonLoader, TextVariant } from '_components/custom'
import { CommonModule } from 'rental-platform-state'
import { useTranslation } from 'react-i18next'
import { StorageKey } from '_constants/StorageKeys'
import { SelectLanguages } from '_modules/components/SelectLanguages'
import React, { useState } from 'react'
import { FlagImagesIcon } from '_modules/components/flag/FlagImages'
import { FlagKeys } from '_assets/images/flag'
import { VariablesColors } from '_theme/variables'
import { PostLoginChallenge } from '../../challenge-handler/otp/PostLoginChallenge'
import { useAuth } from '_hooks/useAuth'
import { useCachedUser } from '_hooks/useCachedUser'
import { ZUSTAND } from 'rise-core-frontend'

export const Header = ({ onShowSidebar, session }: SideBarProps) => {
  const { t } = useTranslation()
  const getPreferredLanguage = localStorage.getItem(StorageKey.LANGUAGE)
  const { logout } = useAuth()
  const [openSelectLanguage, setOpenSelectLanguage] = useState<boolean>(false)
  const store = ZUSTAND.useZustandCacheStore()
  const cachedUser = useCachedUser()

  const { isLoading } = CommonModule.UserModule.userInfoQueries({
    payload: { userId: session?.keycloakId ?? '' },
    queryOptions: {
      enabled: !!session?.keycloakId && !cachedUser,
      select(data) {
        CommonModule.UserModule.UserCache.setUser(data)
        return data
      },
    },
  })

  return (
    <Flex p={4} justify={'space-between'} alignItems="center" h={{ base: '100px', md: 'auto' }}>
      {isLoading ? (
        <CustomSkeletonLoader numberOfLines={1} type="TEXT_IMAGE" height={'45px'} width={'200px'} direction={{ base: 'row-reverse', md: 'row' } as any} />
      ) : (
        <Flex width={'full'} gap={5}>
          <Box ms={'2px'} display="flex" alignItems="center" onClick={onShowSidebar} cursor="pointer">
            <ListMenu width={18} height={18} />
          </Box>
          <Flex alignItems={'center'} justifyContent={'center'} gap={3}>
            <Image
              draggable="false"
              src={cachedUser?.picture?.trim() ? cachedUser?.picture : 'https://avatar.iran.liara.run/public'}
              borderRadius={'7px'}
              boxSize={'30px'}
              fit="cover"
              objectPosition="center"
              alt="user-picture"
            />
            <BaseText variant={TextVariant.S}> {t('WELCOME', { username: cachedUser?.name })} </BaseText>
          </Flex>
        </Flex>
      )}

      <Flex gap={3} alignItems={'center'}>
        <FlagImagesIcon countryImage={getPreferredLanguage?.toUpperCase() as FlagKeys} boxSize={'20px'} onClick={() => setOpenSelectLanguage(true)} />
        <Separator orientation={'vertical'} size={'lg'} colorPalette={'red'} />
        <LogOutIcon
          width={24}
          height={24}
          onClick={() => {
            logout()
            store.getState().clearAll()
          }}
          cursor={'pointer'}
          fill={VariablesColors.red}
        />
      </Flex>
      {cachedUser && <PostLoginChallenge user={cachedUser} />}
      <SelectLanguages isOpen={openSelectLanguage} onChange={() => setOpenSelectLanguage(false)} language={(cachedUser?.preferredLanguage as string) ?? ''} />
    </Flex>
  )
}
