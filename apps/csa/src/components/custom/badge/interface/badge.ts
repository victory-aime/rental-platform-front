import { BadgeProps } from '@chakra-ui/react/badge'
import { TYPES } from 'rental-platform-shared'
import React from 'react'
import { variantColorType } from '_components/custom/button'

type BadgeType = 'booking' | 'cars'
type StatusType = TYPES.ENUM.CommonBookingStatus | TYPES.ENUM.VehicleStatus

interface Props extends BadgeProps {
  label?: string
  color?: variantColorType
  status?: StatusType | undefined | string
  type?: BadgeType
  variant?: 'outline' | 'solid' | 'subtle' | 'surface' | 'plain' | undefined
  children?: React.ReactNode
}

export type { Props }
