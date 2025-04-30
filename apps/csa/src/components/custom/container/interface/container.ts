import { ActionButtonTypes } from '../../button'
import { BoxProps } from '@chakra-ui/react'

export interface IBoxProps extends BoxProps {
  title?: string
  description?: string
  buttonTitle?: string
  onClick?: () => void
  withActionButtons?: boolean
  loader?: boolean
  actionsButtonProps?: ActionButtonTypes
  numberOfLines?: number
}
