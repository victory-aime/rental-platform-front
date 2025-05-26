import { BaseText, ModalComponent, ModalOpenProps } from '_components/custom'
import { getCarsName } from '_modules/cars/constants/maintenance'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { IoIosClose } from 'react-icons/io'
import { UTILS } from 'rental-platform-shared'
import { CarsModule } from 'rental-platform-state'

export const CloseMaintenanceForm: FC<ModalOpenProps> = ({ isOpen, isLoading, onChange, callback, data }) => {
  const { t } = useTranslation()
  const cars = CarsModule.CarsCache.getCars()
  return (
    <ModalComponent
      title="MAINTENANCE.CLOSE.TITLE"
      icon={<IoIosClose size={24} />}
      open={isOpen}
      onChange={onChange}
      onClick={callback}
      isLoading={isLoading}
      ignoreFooter={false}
      modalType={'alertdialog'}
    >
      <BaseText>{t('MAINTENANCE.CLOSE.DESC', { carsName: getCarsName(data?.carId, cars), endDate: UTILS.formatDisplayDate(data?.plannedDates?.scheduledEndDate) })}</BaseText>
    </ModalComponent>
  )
}
