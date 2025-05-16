import { createListCollection } from '@chakra-ui/react'
import { TYPES } from 'rental-platform-shared'

const categoryList = (categories: { name: string; id: string }[] = []) => {
  return createListCollection({
    items: categories.map((item) => ({
      label: item.name,
      value: item.id,
    })),
  })
}

const equipmentsList = (equipments: { name: string; id: string }[] = []) => {
  return equipments.map((item) => ({
    name: item.name,
    value: item.id,
  }))
}

const transmissionList: any = createListCollection({
  items: Object.values(TYPES.ENUM.TransmissionType).map((item) => ({
    label: item,
    value: item,
  })),
})
const fuelList: any = createListCollection({
  items: Object.values(TYPES.ENUM.FuelType).map((item) => ({
    label: item,
    value: item,
  })),
})

const statusList: any = createListCollection({
  items: Object.values(TYPES.ENUM.VehicleStatus).map((item) => ({
    label: item,
    value: item,
  })),
})

export { statusList, categoryList, equipmentsList, transmissionList, fuelList }
