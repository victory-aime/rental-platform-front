import { Box, Flex, Link } from '@chakra-ui/react'
import { FC, useCallback } from 'react'
import { VariablesColors } from '_theme/variables'
import { hexToRGB } from '_theme/colors'
import { BaseText } from '_components/custom/base-text'
import useSideBarStyle from '../hooks/useSidebarStyle'
import { SubMenuProps } from '../types'
import { useTranslation } from 'react-i18next'

const SubMenu: FC<SubMenuProps> = ({ sideToggled, redirectToPath, isActiveLink, link }) => {
  const { t } = useTranslation()
  const { textStyle, linkStyle } = useSideBarStyle({
    sideToggled,
  })

  const setTextStyle = useCallback(
    (linkPath: string) =>
      isActiveLink(linkPath)
        ? {
            ...textStyle,
            fontWeight: '500',
            fontSize: '15px',
            color: 'white',
          }
        : textStyle,
    [isActiveLink, textStyle]
  )

  return (
    <Link
      key={link.key}
      onClick={(e) => {
        e.preventDefault()
        redirectToPath(link)
      }}
      {...linkStyle}
      py="0"
      ps={'0'}
      _hover={{
        bg: hexToRGB('neutral', 0.1, 500),
        borderRadius: '5px',
        textDecoration: 'none',
        pe: { base: '1rem', md: '0' },
      }}
      me={sideToggled ? '0' : '10px'}
      transition="all ease-in-out 350ms"
      pe={{ base: '1rem', md: '0' }}
    >
      <Box height="100%" width="8px" bg={isActiveLink(link.path ?? '') ? 'white' : 'transparent'} borderRadius="12px" transition="all 300ms ease" />
      <Flex
        align="center"
        justifyContent={{ base: 'flex-start', md: 'center' }}
        w="100%"
        h="100%"
        borderRadius="5px"
        px="10px"
        me={{ base: '15px', md: '10px' }}
        borderBottom={isActiveLink(link.path ?? '') ? '2px solid' : '0'}
        borderColor={isActiveLink(link.path ?? '') ? 'white' : 'transparent'}
        bg={isActiveLink(link.path ?? '') ? hexToRGB('neutral', 0.2) : 'transparent'}
      >
        {link.icon && <link.icon width="20px" height="20px" fill={isActiveLink(link.path ?? '') ? VariablesColors.white : VariablesColors.grayScale} />}

        <Box display={!sideToggled ? { lg: 'none' } : { base: 'block', lg: 'block' }} width={'full'} ms="1rem">
          <BaseText {...setTextStyle(link.path ?? '')}>{t(link.label)}</BaseText>
        </Box>
      </Flex>
    </Link>
  )
}

export default SubMenu
