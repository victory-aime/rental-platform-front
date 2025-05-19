'use client'

import { BaseText, BoxContainer, ColumnsDataTable, DataTableContainer } from '_components/custom'
import React, { useEffect, useState } from 'react'
import { TYPES } from 'rental-platform-shared'
import { CarsModule, CommonModule } from 'rental-platform-state'
import { ParcFormModal } from './components/FormModal'
import { FilterParc } from '_modules/cars/manage-parc/components/FilterParc'

const ManageParcPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedParc, setSelectedParc] = useState<TYPES.MODELS.CARS.ParcDto | null>(null)
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false)
  const [filters, setFilters] = useState<TYPES.MODELS.CARS.ParcListDto | null>(null)
  const currentUser = CommonModule.UserModule.UserCache.getUser()
  const cachedParc = CarsModule.parcs.ParcsCache.getParcs()
  const agencyId = currentUser?.establishment.id

  const {
    data: parc,
    refetch,
    isLoading,
  } = CarsModule.parcs.getParcsQueries({
    payload: {
      agencyId,
      ...filters,
    },
    queryOptions: {
      enabled: !!agencyId && cachedParc?.content?.length === 0,
      refetchOnMount: false,
    },
  })

  const { mutateAsync: createParc, isPending: createPending } = CarsModule.parcs.createParcMutation({
    onSuccess: () => {
      setOpenModal(false)
      setSelectedParc(null)
      refetch().then()
    },
  })

  const { mutateAsync: updateParc, isPending: updatePending } = CarsModule.parcs.updateParcMutation({
    onSuccess: () => {
      setOpenModal(false)
      setSelectedParc(null)
      refetch().then()
    },
  })

  const handleSubmit = async (values: any) => {
    const request: TYPES.MODELS.CARS.ParcDto = {
      agencyId,
      name: values?.name,
      address: values?.address,
    }
    if (selectedParc?.id) {
      await updateParc({ id: selectedParc.id, ...request })
    } else {
      await createParc(request)
    }
  }

  const handleFilter = (values: TYPES.MODELS.CARS.ParcListDto | null) => {
    const request: TYPES.MODELS.CARS.ParcListDto = {
      name: values?.name,
      carsNumber: values?.carsNumber,
    }
    setFilters(request)
  }

  const onReset = () => {
    setFilters({})
    refetch().then()
  }

  useEffect(() => {
    if (filters) {
      refetch().then((r) => r)
    }
  }, [filters])

  const columns: ColumnsDataTable[] = [
    {
      header: 'PARC.FORMS.NAME',
      accessor: 'name',
    },
    {
      header: 'PARC.FORMS.ADDRESS',
      accessor: 'address',
    },
    {
      header: 'PARC.TOTAL_CARS',
      accessor: '_count',
      cell: (row) => <BaseText>{row?.listCar}</BaseText>,
    },
    {
      header: 'Actions',
      accessor: 'actions',
      actions: [
        {
          name: 'edit',
          handleClick: (data) => {
            setOpenModal(true)
            setSelectedParc(data)
          },
        },
        {
          name: 'delete',
          handleClick: () => {},
        },
      ],
    },
  ]

  return (
    <BoxContainer
      title={'SIDE_BAR.MANAGE_PARCS'}
      description={'PARC.DESC'}
      border="none"
      withActionButtons
      isFilterActive={isFilterActive}
      onToggleFilter={() => setIsFilterActive(!isFilterActive)}
      filterComponent={<FilterParc callback={handleFilter} onReset={onReset} />}
      actionsButtonProps={{
        validateTitle: 'PARC.ADD_TITLE',
        validateColor: 'primary',
        onClick() {
          setOpenModal(true)
          setSelectedParc(null)
        },
        onReload() {
          onReset()
        },
      }}
    >
      <DataTableContainer
        data={parc?.content ?? []}
        columns={columns}
        totalItems={parc?.totalPages}
        pageSize={parc?.totalDataPerPage}
        isLoading={isLoading}
        initialPage={parc?.currentPage}
        hidePagination
      />

      <ParcFormModal isOpen={openModal} onChange={() => setOpenModal(!openModal)} data={selectedParc} isLoading={createPending || updatePending} callback={handleSubmit} />
    </BoxContainer>
  )
}

export default ManageParcPage
