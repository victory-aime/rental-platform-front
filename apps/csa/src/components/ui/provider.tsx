'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode'
import { customTheme } from '_theme/theme'
import { i18nInit } from '_hooks/i18n'

export function ThemeProvider(props: ColorModeProviderProps) {
  i18nInit()
  return (
    <ChakraProvider value={customTheme}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
