import { Box, Flex, Link, Text, useBreakpointValue } from '@chakra-ui/react'
import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { Dot } from '_assets/svg'
import { VariablesColors } from '_theme/variables'
import { hexToRGB } from '_theme/colors'
import useSideBarStyle from '../hooks/useSidebarStyle'
import { ActiveMenuProps } from '../types'

export const ActiveMenu: FC<ActiveMenuProps> = ({ subLink, sideToggled, onShowSidebar, isActiveLink }) => {
  const navigate = useRouter()
  const { linkStyle, setMenuItemTextStyle, setMenuItemPointStyle } = useSideBarStyle({
    sideToggled,
  })
  const sidebarConditionInverse = useBreakpointValue({ base: false, lg: true })

  return (
    <Link
      key={subLink.path}
      {...linkStyle}
      width={'full'}
      ps={'35px'}
      p={'0'}
      onClick={() => {
        navigate.push(subLink?.path)
        if (!sidebarConditionInverse) {
          onShowSidebar()
        }
      }}
      h={'auto'}
    >
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} width="100%">
        <Flex
          width={'full'}
          bgColor={isActiveLink(subLink?.path) ? hexToRGB('neutral', 0.3) : 'none'}
          gap={4}
          alignItems={'center'}
          borderRadius={'5px'}
          height={'full'}
          ms="10px"
          me={{ base: '15px', md: '0px' }}
          px={'10px'}
          py={'10px'}
        >
          {subLink?.icon ? (
            <subLink.icon width="14px" height="14px" fill={isActiveLink(subLink.path ?? '') ? VariablesColors.white : VariablesColors.grayScale} />
          ) : (
            <Dot width="9px" height="9px" fill={setMenuItemPointStyle(subLink.path)} />
          )}
          <Text {...setMenuItemTextStyle(subLink.path)}>{subLink?.label}</Text>
        </Flex>
      </Box>
    </Link>
  )
}
