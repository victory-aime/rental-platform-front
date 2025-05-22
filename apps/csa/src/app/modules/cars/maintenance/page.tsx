'use client'
import { BaseText, BoxContainer, ColumnsDataTable, BaseFormatNumber, DataTableContainer } from '_components/custom'
import React, { useState } from 'react'
import { CarsModule, CommonModule } from 'rental-platform-state'
import MaintenanceForm from './components/MaintenanceForm'
import { TYPES, UTILS } from 'rental-platform-shared'
import { FormikValues } from 'formik'

const MaintenancePage = () => {
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
      enabled: !carsIncache && !!currentUser?.establishment?.id,
    },
  })
  const { data: maintenance } = CarsModule.maintenance.getMaintenanceListQueries({
    payload: {
      filters: {
        agencyId: currentUser?.establishment?.id,
      },
    },
    queryOptions: {
      enabled: true,
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
    console.log('request', request)

    if (selectedItem?.id) {
      //await updateMaintenance({ id: selectedItem.id, ...request })
    } else {
      //await addMaintenance(request)
    }
  }

  const test = (x: string) => {
    const find = cars?.find((item: { id: string }) => item?.id === x)
    return <BaseText> {find?.name} </BaseText>
  }

  // {"json":{"carId":"716f5885-9193-4f6a-9938-88c75305dbb0","title":"vidange_car","description":"zez","type":"PREVENTIVE","status":"PLANNED","scheduledStartDate":"2025-05-21T23:00:00.000Z","scheduledEndDate":"2025-05-24T23:00:00.000Z","completedAt":null,"cost":1000,}}

  const columns: ColumnsDataTable[] = [
    {
      header: 'Voiture',
      accessor: 'carId',
      cell(x) {
        return test(x)
      },
    },
    {
      header: 'Title',
      accessor: 'title',
    },
    {
      header: 'Dates prevues',
      accessor: 'scheduledStartDate',
      cell() {
        return (
          <>
            {maintenance?.map((dates: { scheduledStartDate: string; scheduledEndDate: string }, i: number) => (
              <BaseText key={i}>
                {UTILS.formatDisplayDate(dates?.scheduledStartDate)} ~ {UTILS.formatDisplayDate(dates.scheduledEndDate)}
              </BaseText>
            ))}
          </>
        )
      },
    },
    {
      header: 'Price',
      accessor: 'cost',
      cell(cost) {
        return <BaseFormatNumber value={cost} />
      },
    },
    {
      header: 'Type',
      accessor: 'type',
    },
    {
      header: 'Status',
      accessor: 'status',
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
      title={'Maintenance'}
      description={'Gerer votre maintenance'}
      border={'none'}
      withActionButtons
      isFilterActive={activeFilter}
      onToggleFilter={() => setActiveFilter(!activeFilter)}
      filterComponent={<>h</>}
      actionsButtonProps={{
        validateColor: 'primary',
        validateTitle: 'Programmer une maintenance',
        onClick() {
          setOpenModalForm(true)
          setSelectedItem(null)
        },
      }}
    >
      <DataTableContainer data={maintenance} columns={columns} hidePagination />
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
