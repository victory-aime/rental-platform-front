'use client'
import { Box, useBreakpointValue, VStack } from '@chakra-ui/react'
import { MobileSidebar } from './components/MobileSidebar'
import { RenderLinks } from './components/RenderLinks'
import useSideBarStyle from './hooks/useSidebarStyle'
import { MENU_BY_ROLE } from './routes/routes'
import { SideBarProps } from './types'
import { CiShop } from 'react-icons/ci'

export const Sidebar = ({ sideToggled, onShowSidebar, session }: SideBarProps) => {
  const { toggledSideBarStyle } = useSideBarStyle({
    sideToggled,
  })
  const isMobile = useBreakpointValue({ base: true, md: false })

  const sidebarLinks = session?.roles?.flatMap((role) => MENU_BY_ROLE[role] || [])

  return (
    <>
      {isMobile ? (
        <MobileSidebar isOpen={sideToggled} onClose={onShowSidebar} links={sidebarLinks ?? []} />
      ) : (
        <Box {...toggledSideBarStyle} className="sidebar">
          <Box display="flex" alignItems="center" justifyContent="center" onClick={onShowSidebar} mt={30}>
            <CiShop color={'white'} size={40} />
          </Box>
          <VStack align="stretch" overflow="auto" mt={6}>
            <RenderLinks links={sidebarLinks ?? []} sideToggled={sideToggled} onShowSidebar={onShowSidebar} />
          </VStack>
        </Box>
      )}
    </>
  )
}
