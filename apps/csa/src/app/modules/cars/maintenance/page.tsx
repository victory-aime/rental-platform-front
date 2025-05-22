'use client'
import { BaseText, BoxContainer, ColumnsDataTable, BaseFormatNumber, DataTableContainer } from '_components/custom'
import React, { useState } from 'react'
import { CarsModule, CommonModule } from 'rental-platform-state'
import { MaintenanceForm } from './components/MaintenanceForm'
import { TYPES, UTILS } from 'rental-platform-shared'
import { FormikValues } from 'formik'
import { maintenanceList } from '../constants/maintenance'
import { useTranslation } from 'react-i18next'

const MaintenancePage = () => {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState<boolean>(false)
  const [openModalForm, setOpenModalForm] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<{ id: string } | null>({
    id: '',
  })

  const currentUser = CommonModule.UserModule.UserCache.getUser()
  const carsIncache = CarsModule.CarsCache.getCars()
  const { data: cars } = CarsModule.getAllCarsQueries({
    payload: {
      establishment: currentUser?.establishment?.id ?? '',
    },
    queryOptions: {
      enabled: !carsIncache?.length && !!currentUser?.establishment?.id,
    },
  })

  const { data: maintenance } = CarsModule.maintenance.getMaintenanceListQueries({
    payload: {
      filters: {
        agencyId: currentUser?.establishment?.id,
      },
    },
  })

  const {
    mutateAsync: addMaintenance,
    isPending: createPending,
    isSuccess: createSuccess,
  } = CarsModule.maintenance.createMaintenanceMutation({
    onSuccess: () => {
      setOpenModalForm(false)
      CarsModule.maintenance.MaintenanceCache.invalidateMaintenanceList()
    },
  })

  const {
    mutateAsync: updateMaintenance,
    isPending: updatePending,
    isSuccess: updateSucess,
  } = CarsModule.maintenance.updateMaintenanceMutation({
    onSuccess: () => {
      setSelectedItem(null)
      setOpenModalForm(false)
      CarsModule.maintenance.MaintenanceCache.invalidateMaintenanceList()
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
      scheduledStartDate: values?.plannedDate?.from,
      scheduledEndDate: values?.plannedDate?.to,
    }

    if (selectedItem?.id) {
      await updateMaintenance({ id: selectedItem.id, ...request })
    } else {
      await addMaintenance(request)
    }
  }

  const getCarsName = (x: string) => {
    const find = cars?.find((item: { id: string }) => item?.id === x)
    return <BaseText> {find?.name} </BaseText>
  }

  const getTitle = (value: string) => {
    const find = maintenanceList?.find((item: { value: string }) => item.value === value)
    return <BaseText> {find?.label} </BaseText>
  }

  const columns: ColumnsDataTable[] = [
    {
      header: 'CARS.TITLE',
      accessor: 'carId',
      cell(carId) {
        return getCarsName(carId)
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
        return t(`MAINTENANCE.STATUS.${status}`)
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
        },
        {
          name: 'delete',
          handleClick(data) {},
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
        isSuccess={createSuccess || updateSucess}
      />
    </BoxContainer>
  )
}

export default MaintenancePage
