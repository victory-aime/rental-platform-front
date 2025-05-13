import { BadgeProps } from '@chakra-ui/react/badge'
import React from 'react'

interface Props extends BadgeProps {
  type?: 'cars'
  label?: string
  color?: string
  variant?: 'outline' | 'solid' | 'subtle' | 'surface' | 'plain' | undefined
  children?: React.ReactNode
}

export type { Props }
