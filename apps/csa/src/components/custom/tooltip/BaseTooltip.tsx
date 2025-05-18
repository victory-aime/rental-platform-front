import { useBreakpointValue } from '@chakra-ui/react'
import { Tooltip } from '_components/ui/tooltip'
import { FC, useId } from 'react'
import { useTranslation } from 'react-i18next'
import { ToggleTip } from '_components/ui/toggle-tip'
import { LuInfo } from 'react-icons/lu'
import { BaseTooltipProps } from './interface/tooltip'

export const BaseTooltip: FC<BaseTooltipProps> = ({ children, message = 'tooltip message', placement = 'top', arrow }) => {
  const id = useId()
  const { t } = useTranslation()
  const responsiveToggle = useBreakpointValue({ base: false, lg: true })
  return (
    <>
      {responsiveToggle ? (
        <Tooltip ids={{ trigger: id }} showArrow={arrow} positioning={{ placement }} content={t(message)} openDelay={100} closeDelay={100} lazyMount>
          {children}
        </Tooltip>
      ) : (
        <ToggleTip showArrow size={'md'} ids={{ trigger: id }} positioning={{ placement }} content={t(message)}>
          <LuInfo size={18} />
        </ToggleTip>
      )}
    </>
  )
}
