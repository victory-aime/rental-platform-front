'use client'

import { Toaster as ChakraToaster, Portal, Spinner, Stack, Toast, createToaster } from '@chakra-ui/react'
import { useColorMode } from '_components/ui/color-mode'

export const toaster = createToaster({
  placement: 'top',
  offsets: { left: '20px', top: '20px', right: '20px', bottom: '20px' },
  overlap: true,
  max: 2,
  pauseOnPageIdle: true,
})

export const Toaster = () => {
  const { colorMode } = useColorMode()
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: '4' }}>
        {(toast) => (
          <Toast.Root bgColor={toast.type === 'info' ? 'info.500' : toast.type === 'success' ? 'success.500' : ''} width={{ md: 'sm' }} p={4} boxShadow={'md'}>
            {toast.type === 'loading' ? <Spinner size="sm" color="info.500" /> : <Toast.Indicator colorPalette={colorMode === 'light' ? 'black' : 'white'} />}
            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && <Toast.Title color={colorMode === 'light' ? 'black' : 'white'}>{toast.title}</Toast.Title>}
              {toast.description && <Toast.Description color={colorMode === 'light' ? 'black' : 'white'}>{toast.description}</Toast.Description>}
            </Stack>
            {toast.action && <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>}
            {toast.meta?.closable && <Toast.CloseTrigger p={2} />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  )
}
