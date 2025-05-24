import { BaseText, ModalComponent, ModalOpenProps } from '_components/custom'
import React, { FC } from 'react'
import { IoIosClose } from 'react-icons/io'
import { UTILS } from 'rental-platform-shared'

export const CloseMaintenanceForm: FC<ModalOpenProps> = ({ isOpen, isLoading, onChange, callback, data }) => {
  return (
    <ModalComponent title="Close maintenance" icon={<IoIosClose size={24} />} open={isOpen} onChange={onChange} onClick={callback} isLoading={isLoading} ignoreFooter={false} modalType={'alertdialog'}>
      <BaseText>Voulez vous vraiment terminer cette maintenance ? Elle est cense se cloturer automatique le {UTILS.formatDisplayDate(data?.plannedDates?.scheduledEndDate)}</BaseText>
    </ModalComponent>
  )
}
