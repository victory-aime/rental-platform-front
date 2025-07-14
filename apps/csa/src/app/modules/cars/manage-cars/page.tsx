'use client'

import { BaseBadge, BoxContainer, ColumnsDataTable, BaseFormatNumber, DataTableContainer, DeleteModalAnimation, BaseText } from '_components/custom'
import { DisplayImage } from '../components/DisplayImage'
import React, { useState } from 'react'
import { TYPES } from 'rental-platform-shared'
import { useRouter } from 'next/navigation'
import { MODULES_CARS_ROUTES } from '../routes'
import { CarsModule } from 'rental-platform-state'
import { useCachedUser } from '_hooks/useCachedUser'
import { useTranslation } from 'react-i18next'

const ManageCarsPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const currentUser = useCachedUser()
  const [selectedCars, setSelectedCars] = useState<{ id: string; agenceId: string }[]>([])
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteModalData, setDeleteModalData] = useState<{ id: string }>({
    id: '',
  })

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

  const { mutate: deleteCarMutation, isPending: isDeletingCar } = CarsModule.deleteCarMutation({
    mutationOptions: {
      onSuccess: () => {
        refetch()
        setDeleteModal(false)
        setDeleteModalData({ id: '' })
      },
    },
  })

  const { mutateAsync: deleteAllCarsMutation, isPending: isDeletingAllCars } = CarsModule.deleteAllCarsMutation({
    mutationOptions: {
      onSuccess: () => {
        refetch()
        setDeleteModal(false)
        setSelectedCars([])
      },
    },
  })

  const handleRowSelection = (selectedRows: { id: string; agenceId: string }[]) => {
    setSelectedCars(selectedRows)
  }

  const handleDeleteCars = (data: { id: string }) => {
    if (selectedCars?.length > 0) {
      deleteAllCarsMutation({ params: { agencyId: selectedCars?.[0]?.agenceId, agencyName: currentUser?.establishment?.name } })
    } else {
      deleteCarMutation({ params: { carId: data?.id } })
    }
  }

  const columns: ColumnsDataTable[] = [
    // ...(cars && cars.length > 1
    //   ? [
    //       {
    //         header: '',
    //         accessor: 'select',
    //       } as ColumnsDataTable,
    //     ]
    //   : []),
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
        {
          name: 'delete',
          handleClick(value) {
            setDeleteModal(true)
            setDeleteModalData({ id: value?.id })
          },
          isDisabled: () => selectedCars?.length > 1,
        },
        {
          name: 'duplicate',
          handleClick: (value) => {
            router.push(`${MODULES_CARS_ROUTES.MANAGE_CARS.ADD_CAR}?requestId=${value?.id}&isDuplicate=true`)
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
      <DataTableContainer data={cars ?? []} columns={columns} isLoading={isLoading} hidePagination handleRowSelection={handleRowSelection} handleDeleteActionBar={() => setDeleteModal(true)} />
      <DeleteModalAnimation
        title={'CARS.DELETE_CARS'}
        onChange={() => {
          setSelectedCars([])
          setDeleteModal(false)
        }}
        isOpen={deleteModal}
        callback={() => handleDeleteCars(deleteModalData)}
        ignoreFooter={false}
        isLoading={isDeletingCar || isDeletingAllCars}
      >
        <BaseText>{selectedCars?.length > 1 ? t('CARS.DELETE_ALL') : t('CARS.DELETE_ONE_CAR')}</BaseText>
      </DeleteModalAnimation>
    </BoxContainer>
  )
}
export default ManageCarsPage
