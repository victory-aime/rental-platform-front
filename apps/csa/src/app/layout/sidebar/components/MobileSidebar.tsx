import React from 'react'
import { DrawerActionTrigger, DrawerBackdrop, DrawerBody, DrawerContent, DrawerHeader, DrawerRoot, DrawerTitle } from '_components/ui/drawer'
import { IconButton, VStack } from '@chakra-ui/react'
import { IoIosCloseCircle } from 'react-icons/io'
import { IMobileSidebar } from '../types'
import { RenderLinks } from './RenderLinks'
import { CommonModule } from 'rental-platform-state'

export const MobileSidebar = ({ isOpen, onClose, links }: IMobileSidebar) => {
  const cachedUser = CommonModule.UserModule.UserCache.getUser()

  return (
    <DrawerRoot open={isOpen} onOpenChange={onClose} placement={'start'} size={'xs'} closeOnEscape>
      <DrawerBackdrop />
      <DrawerContent height={'full'} bgColor={'primary.800'}>
        <DrawerHeader display={'flex'} alignItems={'center'} justifyContent={'space-between'} p={5}>
          <DrawerTitle color={'white'} fontSize={'2xl'}>
            {cachedUser?.establishment?.name}
          </DrawerTitle>
          <DrawerActionTrigger asChild>
            <IconButton aria-label="close-drawer" boxSize={'35px'} bgColor={'primary.500'} color={'white'} onClick={onClose}>
              <IoIosCloseCircle />
            </IconButton>
          </DrawerActionTrigger>
        </DrawerHeader>
        <DrawerBody width={'full'} height={'full'}>
          <VStack alignItems={'flex-start'} width={'full'} align="stretch" height="80%" overflow="auto">
            <RenderLinks links={links} sideToggled={isOpen} onShowSidebar={onClose} />
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  )
}
