'use client'

import { BaseAgenda } from '_components/custom/agenda/FullCalendar'
import React from 'react'
import { CarsModule, CommonModule } from 'rental-platform-state'
import { getTitle } from '../constants/maintenance'
import { VariablesColors } from '_theme/variables'

const MyAgenda = () => {
  const currentUser = CommonModule.UserModule.UserCache.getUser()
  const maintenaceCahe = CarsModule.maintenance.MaintenanceCache.getMaintenanceList()
  const { data: maintenance } = CarsModule.maintenance.getMaintenanceListQueries({
    payload: {
      filters: { agencyId: currentUser?.establishment?.id },
    },
    queryOptions: {
      enabled: !!currentUser?.establishment?.id && !maintenaceCahe?.length,
    },
  })

  const maintenanceEvents = maintenance?.map((item: any) => ({
    id: item.id,
    title: getTitle(item?.title),
    start: item.plannedDates.scheduledStartDate,
    end: item.plannedDates.scheduledEndDate,
    backgroundColor: VariablesColors.orange,
    borderColor: VariablesColors.orange,
    textColor: VariablesColors.white,
    extendedProps: {
      description: item.description,
      cost: item.cost,
      status: item.status,
      type: item.type,
    },
  }))

  return <BaseAgenda events={maintenanceEvents ?? []} />
}

export default MyAgenda
