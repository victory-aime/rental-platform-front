import { Flex, Box } from '@chakra-ui/react'
import { FC } from 'react'
import { VariablesColors } from '_theme/variables'
import { hexToRGB } from '_theme/colors'
import { ArrowDown } from '_assets/svg'
import { BaseText } from '_components/custom/base-text'
import useIsActive from '../hooks/useIsActive'
import useSideBarStyle from '../hooks/useSidebarStyle'
import { MenuProps } from '../types'
import { useTranslation } from 'react-i18next'

export const Menu: FC<MenuProps> = ({ openedMenu, sideToggled, link, conditionsSubMenu }) => {
  const { t } = useTranslation()
  const { itHasActiveChildLink } = useIsActive()
  const { setMenuTextStyle } = useSideBarStyle({
    sideToggled,
  })

  return (
    <Box
      key={link?.menuKey}
      h={'40px'}
      display="flex"
      width={'full'}
      alignItems="center"
      pe={{ base: '1rem', md: '0' }}
      cursor="pointer"
      transition="all ease-in-out 350ms"
      onClick={() => conditionsSubMenu(link)}
      _hover={{
        bg: hexToRGB('neutral', 0.3, 500),
        borderRadius: '5px',
        ps: '0',
        pe: { base: '1rem', md: '0' },
        ms: '0',
      }}
      mt={3}
    >
      <Box height="100%" width="8px" bg={itHasActiveChildLink(link.subItems) ? 'white' : 'transparent'} borderRadius="12px" transition="all 300ms ease" />
      <Flex
        align="center"
        justifyContent={{ base: 'flex-start', md: 'center' }}
        w="100%"
        h="100%"
        borderRadius={'5px'}
        py="0"
        ps="0"
        ms={{ base: '7px', md: '10px' }}
        me={sideToggled ? '0' : '10px'}
        pe={{ base: '1rem', md: '0.5rem' }}
        bg={itHasActiveChildLink(link.subItems) ? hexToRGB('neutral', 0.3) : 'transparent'}
        px={'10px'}
      >
        <link.icon width="22px" height="22px" color={itHasActiveChildLink(link.subItems) ? VariablesColors.white : VariablesColors.grayScale} />

        <Box display={!sideToggled ? { lg: 'none' } : { base: 'block', lg: 'block' }} width={'full'} ms="1rem">
          <BaseText {...setMenuTextStyle(link.subItems)}>{t(link.label)}</BaseText>
        </Box>

        {sideToggled ? (
          <Box transition="all ease-in-out 200ms" transform={link?.subItems && (itHasActiveChildLink(link?.subItems) || openedMenu === link?.menuKey) ? 'rotate(180deg)' : ''}>
            <ArrowDown width="18px" height="18px" fill={VariablesColors.grayScale} />
          </Box>
        ) : null}
      </Flex>
    </Box>
  )
}
