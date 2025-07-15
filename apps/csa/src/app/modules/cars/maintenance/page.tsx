'use client'

import { BaseText, BoxContainer, ColumnsDataTable, BaseFormatNumber, DataTableContainer, BaseBadge } from '_components/custom'
import React, { useState } from 'react'
import { CarsModule } from 'rental-platform-state'
import { MaintenanceForm } from './components/MaintenanceForm'
import { TYPES } from 'rental-platform-shared'
import { formatDisplayDate } from 'rise-core-frontend'
import { FormikValues } from 'formik'
import { getCarsName, getTitle } from '../constants/maintenance'
import { CloseMaintenanceForm } from './components/CloseMaintenanceForm'
import { useCachedUser } from '_hooks/useCachedUser'

const MaintenancePage = () => {
  const [openModalForm, setOpenModalForm] = useState<boolean>(false)
  const [openCloseForm, setOpenCloseForm] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<{ id: string } | null>({
    id: '',
  })
  const currentUser = useCachedUser()

  const { data: cars } = CarsModule.getAllCarsQueries({
    payload: {
      establishment: currentUser?.establishment?.id ?? '',
    },
    queryOptions: {
      enabled: !!currentUser?.establishment?.id,
    },
  })

  const { data: maintenance, refetch } = CarsModule.maintenance.getMaintenanceListQueries({
    payload: {
      filters: {
        agencyId: currentUser?.establishment?.id,
      },
    },
    queryOptions: {
      enabled: !!currentUser?.establishment?.id,
    },
  })

  const {
    mutateAsync: addMaintenance,
    isPending: createPending,
    isSuccess: createSuccess,
  } = CarsModule.maintenance.createMaintenanceMutation({
    mutationOptions: {
      onSuccess: () => {
        setOpenModalForm(false)
        refetch()
      },
    },
  })

  const {
    mutateAsync: updateMaintenance,
    isPending: updatePending,
    isSuccess: updateSuccess,
  } = CarsModule.maintenance.updateMaintenanceMutation({
    mutationOptions: {
      onSuccess: () => {
        setSelectedItem(null)
        setOpenModalForm(false)
        refetch()
      },
    },
  })

  const { mutateAsync: closeMutate, isPending: closePending } = CarsModule.maintenance.closeMaintenanceMutation({
    mutationOptions: {
      onSuccess: () => {
        setSelectedItem(null)
        setOpenCloseForm(false)
        refetch()
      },
    },
  })

  const submitForm = async (values: FormikValues) => {
    const request: TYPES.MODELS.CARS.MAINTENANCE.CreateMaintenanceDto = {
      carId: values?.carId && values?.carId?.[0],
      agencyId: currentUser?.establishment?.id,
      description: values?.description,
      title: values?.title && values?.title?.[0],
      cost: parseFloat(values?.price),
      status: values?.status && values?.status?.[0],
      scheduledStartDate: values?.scheduledStartDate,
      scheduledEndDate: values?.scheduledEndDate,
    }

    if (selectedItem?.id) {
      await updateMaintenance({ payload: { ...request, id: selectedItem.id }, params: { agencyId: currentUser?.establishment?.id } })
    } else {
      await addMaintenance({ payload: request, params: { agencyId: currentUser?.establishment?.id } })
    }
  }

  const handleClose = async () => {
    await closeMutate({ params: { requestId: selectedItem?.id } })
  }

  const findCarsName = (carId: string) => {
    return getCarsName(carId, cars)
  }

  const columns: ColumnsDataTable[] = [
    {
      header: 'CARS.TITLE',
      accessor: 'carId',
      cell(carId) {
        return findCarsName(carId)
      },
    },
    {
      header: 'MAINTENANCE.TITLE',
      accessor: 'title',
      cell(title) {
        return getTitle(title)
      },
    },
    {
      header: 'MAINTENANCE.PLANNED',
      accessor: 'plannedDates',
      cell(plannedDates) {
        return (
          <BaseText>
            {formatDisplayDate(plannedDates?.scheduledStartDate)} ~ {formatDisplayDate(plannedDates?.scheduledEndDate)}
          </BaseText>
        )
      },
    },
    {
      header: 'MAINTENANCE.FORMS.COST',
      accessor: 'cost',
      cell(cost) {
        return <BaseFormatNumber value={cost} />
      },
    },
    {
      header: 'MAINTENANCE.STATE',
      accessor: 'type',
    },
    {
      header: 'CARS.FORMS.STATUS',
      accessor: 'status',
      cell(status) {
        return <BaseBadge status={status} type="maintenance" />
      },
    },
    {
      header: 'Actions',
      accessor: 'actions',
      actions: [
        {
          name: 'edit',
          handleClick(data) {
            setOpenModalForm(true)
            setSelectedItem(data)
          },
          isDisabled: (data) => data?.status === (TYPES.ENUM.CARS.MAINTENANCE.MaintenanceStatus.COMPLETED || TYPES.ENUM.CARS.MAINTENANCE.MaintenanceStatus.CANCELED),
        },
        {
          name: 'delete',
          handleClick(data) {
            setSelectedItem(data)
            setOpenCloseForm(true)
          },
          isDisabled: (data) => data?.status === (TYPES.ENUM.CARS.MAINTENANCE.MaintenanceStatus.COMPLETED || TYPES.ENUM.CARS.MAINTENANCE.MaintenanceStatus.CANCELED),
        },
      ],
    },
  ]

  return (
    <BoxContainer
      title={'SIDE_BAR.MAINTENANCE'}
      description={'MAINTENANCE.DESC'}
      border={'none'}
      withActionButtons
      actionsButtonProps={{
        validateColor: 'primary',
        validateTitle: 'MAINTENANCE.ADD',
        onClick() {
          setOpenModalForm(true)
          setSelectedItem(null)
        },
      }}
    >
      <DataTableContainer data={maintenance ?? []} columns={columns} hidePagination />
      <MaintenanceForm
        isOpen={openModalForm}
        onChange={() => setOpenModalForm(!openModalForm)}
        isLoading={createPending || updatePending}
        callback={submitForm}
        data={selectedItem}
        isSuccess={createSuccess || updateSuccess}
      />
      <CloseMaintenanceForm isOpen={openCloseForm} onChange={() => setOpenCloseForm(!openCloseForm)} data={selectedItem} callback={handleClose} isLoading={closePending} />
    </BoxContainer>
  )
}

export default MaintenancePage
