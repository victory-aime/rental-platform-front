import { ReactNode } from 'react'
import { ActionButtonTypes } from '../../button'
import { BoxProps } from '@chakra-ui/react'

export interface IBoxProps extends BoxProps {
  title?: string
  description?: string
  buttonTitle?: string
  onClick?: () => void
  withActionButtons?: boolean
  isFilterActive?: boolean
  onToggleFilter?: () => void
  loader?: boolean
  actionsButtonProps?: ActionButtonTypes
  filterComponent?: ReactNode
  numberOfLines?: number
}
