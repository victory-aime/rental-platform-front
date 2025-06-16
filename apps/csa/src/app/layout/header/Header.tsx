import { Box, Flex, Image, Separator } from '@chakra-ui/react'
import { ListMenu, LogOutIcon } from '_assets/svg'
import { SideBarProps } from '../sidebar/types'
import { BaseText, CustomSkeletonLoader, Loader, TextVariant } from '_components/custom'
import { CommonModule } from 'rental-platform-state'
import { useTranslation } from 'react-i18next'
import { StorageKey } from '_constants/StorageKeys'
import { SelectLanguages } from '_modules/components/SelectLanguages'
import { useState } from 'react'
import { FlagImagesIcon } from '_modules/components/flag/FlagImages'
import { FlagKeys } from '_assets/images/flag'
import { APP_ROUTES } from '_config/routes'
import { keycloakSessionLogOut } from '_hooks/logout'
import { signOut } from 'next-auth/react'

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
  const [loader, setLoader] = useState(false)

  const handleLogout = () => {
    keycloakSessionLogOut().then(() => signOut({ callbackUrl: APP_ROUTES.SIGN_OUT }).then(() => setLoader(false)))
    setLoader(true)
  }

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
            <Image draggable="false" src={'https://avatar.iran.liara.run/public'} borderRadius={'7px'} boxSize={'30px'} fit="cover" objectPosition="center" alt="img-url" />
            <BaseText variant={TextVariant.S}> {t('WELCOME', { username: user?.name })} </BaseText>
          </Flex>
        </Flex>
      )}

      <Flex gap={3} alignItems={'center'}>
        <FlagImagesIcon countryImage={getPreferredLanguage?.toUpperCase() as FlagKeys} boxSize={'20px'} onClick={() => setOpenSelectLanguage(true)} />
        <Separator orientation={'vertical'} size={'lg'} colorPalette={'red'} />
        {!loader ? <LogOutIcon width={24} height={24} onClick={handleLogout} cursor={'pointer'} /> : <Loader loader={loader} size={'xs'} />}
      </Flex>

      <SelectLanguages isOpen={openSelectLanguage} onChange={() => setOpenSelectLanguage(false)} language={user?.preferredLanguage ?? ''} />
    </Flex>
  )
}
