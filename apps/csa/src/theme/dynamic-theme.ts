import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'
import { keyframes, animations } from './animations'
import { breakpoints } from './breakpoints'
import { colors as baseColors } from './colors'
import { generateDynamicColorShades } from './gerenate-colorShades'

export const createDynamicTheme = (primaryBaseColor: string) => {
  const dynamicPrimary = generateDynamicColorShades(primaryBaseColor)

  const config = defineConfig({
    theme: {
      keyframes,
      breakpoints,
      tokens: {
        animations,
        colors: {
          ...baseColors,
          primary: dynamicPrimary,
        },
        fonts: {
          heading: { value: 'var(--font-lato)' },
          body: { value: 'var(--font-lato)' },
        },
      },
    },
  })

  return createSystem(defaultConfig, config)
}
