'use client'

import { Toaster as ChakraToaster, Portal, Spinner, Stack, Toast, createToaster } from '@chakra-ui/react'

export const toaster = createToaster({
  placement: 'top',
  offsets: { left: '20px', top: '20px', right: '20px', bottom: '20px' },
  overlap: true,
  max: 1,
  pauseOnPageIdle: true,
})

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: '4' }}>
        {(toast) => (
          <Toast.Root bgColor={toast.type === 'info' ? 'blue.500' : toast.type === 'success' ? 'primary.500' : ''} width={{ md: 'sm' }} p={4}>
            {toast.type === 'loading' ? <Spinner size="sm" color="blue.solid" /> : <Toast.Indicator colorPalette={'gray'} />}
            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
              {toast.description && <Toast.Description>{toast.description}</Toast.Description>}
            </Stack>
            {toast.action && <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>}
            {toast.meta?.closable && <Toast.CloseTrigger p={2} />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  )
}
