import { Flex, useBreakpointValue } from '@chakra-ui/react'
import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import useIsActive from '../hooks/useIsActive'
import { IRenderLinks, ILink } from '../types'
import { ActiveMenu } from './ActiveMenu'
import SubMenu from './SubMenu'
import { Menu } from './Menu'

export const RenderLinks: FC<IRenderLinks> = ({ sideToggled, links, onShowSidebar }) => {
  const navigate = useRouter()
  const { isActiveLink } = useIsActive()
  const [openedMenu, setOpenedMenu] = useState<any>(false)
  const shouldApplySideToggled = useBreakpointValue({ base: false, md: true })
  const sidebarConditionInverse = useBreakpointValue({ base: false, lg: true })

  const conditionsSubMenu = (link: { subItems: { path: string; label: string }[]; menuKey: string }) => {
    if (link?.subItems && openedMenu === link.menuKey) {
      setOpenedMenu('')
    } else {
      setOpenedMenu(link.menuKey)
    }
  }

  const redirectToPath = async (link: ILink): Promise<void> => {
    if (link?.path) {
      navigate.push(link.path)
    }
    if (!sidebarConditionInverse) {
      onShowSidebar()
    }
  }

  return (
    <>
      {links.map((link: ILink, index: number) => (
        <Flex direction="column" width={'full'} alignItems={'flex-start'} justifyContent={'flex-start'} key={index} pe={!sideToggled ? { lg: '0' } : { lg: '10px' }}>
          {!link.subItems && link?.path && <SubMenu isActiveLink={isActiveLink} redirectToPath={redirectToPath} sideToggled={sideToggled} link={link} />}
          {link.menuKey && link.subItems && <Menu redirectToPath={redirectToPath} sideToggled={sideToggled} openedMenu={openedMenu} link={link} conditionsSubMenu={conditionsSubMenu} />}
          {link.subItems &&
            openedMenu === link.menuKey &&
            link?.subItems?.map((subLink) => {
              if (shouldApplySideToggled && !sideToggled) {
                return null
              }
              return <ActiveMenu subLink={subLink} key={subLink.path} isActiveLink={isActiveLink} sideToggled={sideToggled} onShowSidebar={onShowSidebar} />
            })}
        </Flex>
      ))}
    </>
  )
}
