import { ButtonProps, FlexProps } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

export type variantColorType = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'success' | 'warning' | 'info'

export interface VariantColorStyle {
  bg: string
  gradient: string
  hover: string
  textColor: string
}

export interface ButtonBaseProps extends ButtonProps {
  children?: React.ReactNode
  withGradient?: boolean
  colorType?: variantColorType
  status?: string
  isLoading?: boolean
  rightIcon?: ReactNode
  leftIcon?: ReactNode
}

export interface ActionButtonTypes extends FlexProps {
  cancelTitle?: string
  validateTitle?: string
  refreshTitle?: string
  cancelColor?: variantColorType
  validateColor?: variantColorType
  icon?: ReactNode
  cancelIcon?: ReactNode
  requestId?: string
  isLoading?: boolean
  onClick?: () => void
  onCancel?: () => void
  onReload?: () => void
  onToggleFilter?: () => void
}
