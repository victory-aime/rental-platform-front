'use client'

import { BaseText, BoxContainer, ColumnsDataTable, BaseFormatNumber, DataTableContainer, BaseBadge } from '_components/custom'
import React, { useState } from 'react'
import { CarsModule, CommonModule } from 'rental-platform-state'
import { MaintenanceForm } from './components/MaintenanceForm'
import { TYPES, UTILS } from 'rental-platform-shared'
import { FormikValues } from 'formik'
import { getCarsName, getTitle } from '../constants/maintenance'
import { CloseMaintenanceForm } from './components/CloseMaintenanceForm'

const MaintenancePage = () => {
  const [activeFilter, setActiveFilter] = useState<boolean>(false)
  const [openModalForm, setOpenModalForm] = useState<boolean>(false)
  const [openCloseForm, setOpenCloseForm] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<{ id: string } | null>({
    id: '',
  })
  const { data: currentUser } = CommonModule.UserModule.userInfoQueries({ payload: { userId: '' }, queryOptions: { enabled: false } })
  const { data: cars } = CarsModule.getAllCarsQueries({
    payload: {
      establishment: currentUser?.establishment?.id ?? '',
    },
    queryOptions: {
      enabled: !!currentUser?.establishment?.id,
    },
  })

  const { data: maintenance } = CarsModule.maintenance.getMaintenanceListQueries({
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
        CarsModule.maintenance.MaintenanceCache.invalidateMaintenanceList()
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
        CarsModule.maintenance.MaintenanceCache.invalidateMaintenanceList()
      },
    },
  })

  const { mutateAsync: closeMutate, isPending: closePending } = CarsModule.maintenance.closeMaintenanceMutation({
    mutationOptions: {
      onSuccess: () => {
        setSelectedItem(null)
        setOpenCloseForm(false)
        CarsModule.maintenance.MaintenanceCache.invalidateMaintenanceList()
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
      await updateMaintenance({ id: selectedItem.id, ...request })
    } else {
      await addMaintenance(request)
    }
  }

  const handleClose = async () => {
    await closeMutate({ requestId: selectedItem?.id ?? '' })
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
            {UTILS.formatDisplayDate(plannedDates?.scheduledStartDate)} ~ {UTILS.formatDisplayDate(plannedDates?.scheduledEndDate)}
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
      isFilterActive={activeFilter}
      onToggleFilter={() => setActiveFilter(!activeFilter)}
      filterComponent={<>h</>}
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
