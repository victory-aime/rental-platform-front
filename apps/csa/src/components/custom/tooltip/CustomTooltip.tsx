import { Tooltip } from '_components/ui/tooltip'
import { FC, ReactNode, useId } from 'react'

type Placement = 'top' | 'right' | 'bottom' | 'left' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end'

interface Props {
  children: ReactNode
  message: string
  placement?: Placement
  arrow?: boolean
}

export const CustomToolTip: FC<Props> = ({ children, message = 'tooltip message', placement = 'top', arrow }) => {
  const id = useId()
  return (
    <Tooltip ids={{ trigger: id }} showArrow={arrow} positioning={{ placement: placement }} content={message} openDelay={100} closeDelay={100} lazyMount>
      {children}
    </Tooltip>
  )
}
