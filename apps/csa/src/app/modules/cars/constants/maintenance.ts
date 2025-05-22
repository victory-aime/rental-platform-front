import { createListCollection } from '@chakra-ui/react'
import { TYPES } from 'rental-platform-shared'

const typeList = (list: {label:string, value: string}[] = []) => {
  return createListCollection({
    items: list?.map((item) => ({
      label: item.label,
      value: item.value,
    })) || [],
  })
}


const maintenanceStatusList: any = (t?: any) => {
  return createListCollection({
    items: Object.values(TYPES.ENUM.CARS.MAINTENANCE.MaintenanceStatus).map((item) => ({
      label: t(`MAINTENANCE_STATUS.${item}`),
      value: item,
    })) || [],
  })
}

export { maintenanceStatusList, typeList }
