import { createListCollection } from '@chakra-ui/react'
import { TYPES } from 'rental-platform-shared'

const typeList = (list: { label: string; value: string }[] = []) => {
  return createListCollection({
    items:
      list?.map((item) => ({
        label: item.label,
        value: item.value,
      })) || [],
  })
}

const maintenanceStatusList: any = (t?: any) => {
  return createListCollection({
    items:
      Object.values(TYPES.ENUM.CARS.MAINTENANCE.MaintenanceStatus).map((item) => ({
        label: t(`MAINTENANCE.STATUS.${item}`),
        value: item,
      })) || [],
  })
}

const maintenanceList = [
  {
    label: 'Vidande',
    value: 'vidange_car',
  },
  {
    label: 'reparation chassi',
    value: 'repair_chaisi',
  },
  {
    label: 'retro',
    value: 'retro',
  },
]

const getCarsName = (x: string, cars: any) => {
  const find = cars?.find((item: { id: string }) => item?.id === x)
  return find?.name
}

const getTitle = (value: string): string => {
  const item = maintenanceList?.find((i) => i.value === value)
  return item?.label ?? value
}

export { maintenanceStatusList, typeList, maintenanceList, getTitle, getCarsName }
