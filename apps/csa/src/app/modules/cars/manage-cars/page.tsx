'use client'

import { BaseBadge, BoxContainer, ColumnsDataTable, BaseFormatNumber, DataTableContainer } from '_components/custom'
import { DisplayImage } from '../components/DisplayImage'
import React from 'react'
import { TYPES } from 'rental-platform-shared'
import { useRouter } from 'next/navigation'
import { MODULES_CARS_ROUTES } from '../routes'
import { CarsModule } from 'rental-platform-state'
import { useCachedUser } from '_hooks/useCachedUser'

const ManageCarsPage = () => {
  const router = useRouter()
  const currentUser = useCachedUser()

  const {
    data: cars,
    isLoading,
    refetch,
  } = CarsModule.getAllCarsQueries({
    payload: {
      establishment: currentUser?.establishment?.id ?? '',
    },
    queryOptions: {
      enabled: !!currentUser?.establishment?.id,
    },
  })

  const columns: ColumnsDataTable[] = [
    {
      header: '',
      accessor: 'carImages',
      cell: (images) => {
        return <DisplayImage value={images} />
      },
    },
    {
      header: 'CARS.FORMS.NAME',
      accessor: 'name',
    },
    {
      header: 'CARS.FORMS.BRAND',
      accessor: 'brand',
    },
    {
      header: 'CARS.FORMS.MODELS',
      accessor: 'model',
    },
    {
      header: 'CARS.FORMS.DAILY_PRICE',
      accessor: 'dailyPrice',
      cell: (price) => {
        return <BaseFormatNumber value={price} currencyCode={TYPES.ENUM.COMMON.Currency.XAF} notation="standard" />
      },
    },
    {
      header: 'STATUS',
      accessor: 'status',
      cell: (status) => {
        return <BaseBadge status={status} />
      },
    },
    {
      header: 'Actions',
      accessor: 'actions',
      actions: [
        {
          name: 'edit',
          handleClick: (value) => {
            router.push(`${MODULES_CARS_ROUTES.MANAGE_CARS.ADD_CAR}?requestId=${value?.id}`)
          },
        },
      ],
    },
  ]

  return (
    <BoxContainer
      title={'SIDE_BAR.MANAGE_CARS'}
      description={'CARS.LIST_DESC'}
      border={'none'}
      withActionButtons
      actionsButtonProps={{
        validateTitle: 'CARS.ADD_CARS',
        validateColor: 'primary',
        onClick() {
          router.push(MODULES_CARS_ROUTES.MANAGE_CARS.ADD_CAR)
        },
        onReload() {
          refetch()
        },
      }}
    >
      <DataTableContainer data={cars ?? []} columns={columns} isLoading={isLoading} hidePagination />
    </BoxContainer>
  )
}
export default ManageCarsPage
