import { Badge } from '@chakra-ui/react'
import React, { FC } from 'react'
import { Props } from './interface/badge'
import { BaseText, TextVariant } from '../base-text'
import { variantColorType, getVariantStyles } from '../button'
import { TYPES } from 'rental-platform-shared'
import { useTranslation } from 'react-i18next'

const getBadgeContent = (status?: string, type?: string, t?: (key: string) => string): { variant: variantColorType; label: string } => {
  if (!t) return { variant: 'none', label: 'Inconnu' }

  if (type === 'cars') {
    switch (status) {
      case TYPES.ENUM.CARS.VehicleStatus.AVAILABLE:
        return { variant: 'success', label: t('VEHICLE_STATUS.AVAILABLE') }
      case TYPES.ENUM.CARS.VehicleStatus.MAINTENANCE:
        return { variant: 'warning', label: t('VEHICLE_STATUS.MAINTENANCE') }
      case TYPES.ENUM.CARS.VehicleStatus.UNAVAILABLE:
        return { variant: 'danger', label: t('VEHICLE_STATUS.UNAVAILABLE') }
      default:
        return { variant: 'none', label: 'Inconnu' }
    }
  } else if (type === 'maintenance') {
    switch (status) {
      case TYPES.ENUM.CARS.MAINTENANCE.MaintenanceStatus.PLANNED:
        return { variant: 'warning', label: t('MAINTENANCE.STATUS.PLANNED') }
      case TYPES.ENUM.CARS.MAINTENANCE.MaintenanceStatus.COMPLETED:
        return { variant: 'success', label: t('MAINTENANCE.STATUS.COMPLETED') }
      case TYPES.ENUM.CARS.MAINTENANCE.MaintenanceStatus.CANCELED:
        return { variant: 'danger', label: t('MAINTENANCE.STATUS.CANCELED') }
      default:
        return { variant: 'primary', label: t('MAINTENANCE.STATUS.IN_PROGRESS') }
    }
  } else if (type === 'booking') {
    switch (status) {
      case TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE:
        return { variant: 'success', label: t('COMMON.STATUS.ACTIVE') }
      case TYPES.ENUM.COMMON.CommonBookingStatus.PENDING:
        return { variant: 'warning', label: t('COMMON.STATUS.PENDING') }
      case TYPES.ENUM.COMMON.CommonBookingStatus.EXPIRED:
        return { variant: 'none', label: t('COMMON.STATUS.EXPIRED') }
      case TYPES.ENUM.COMMON.CommonBookingStatus.CANCELED:
        return { variant: 'danger', label: t('COMMON.STATUS.CANCELED') }
      default:
        return { variant: 'warning', label: 'Inconnu' }
    }
  } else {
    switch (status) {
      case 'success':
        return { variant: 'success', label: t('inconnu') }
      default:
        return { variant: 'success', label: t('inconnu') }
    }
  }
}

export const BaseBadge: FC<Props> = ({ children, variant = 'solid', label: customLabel, color, type = 'cars', status, ...props }) => {
  const { t } = useTranslation()
  const { variant: resolvedVariant, label: resolvedLabel } = getBadgeContent(status, type, t)
  const { bg, gradient, hover, textColor } = getVariantStyles(resolvedVariant)

  return (
    <Badge
      {...props}
      variant={variant}
      size="lg"
      borderRadius="7px"
      p={props.p ?? 2}
      bg={gradient ?? bg ?? 'none'}
      color={color || textColor}
      _hover={{ background: hover ?? `${bg}CC` }}
      _active={{ background: hover ?? `${bg}AA` }}
      _disabled={{ background: 'gray.300', cursor: 'not-allowed' }}
    >
      <BaseText variant={TextVariant.XS} textTransform="capitalize">
        {customLabel ?? resolvedLabel}
      </BaseText>
    </Badge>
  )
}
