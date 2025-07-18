'use client'

import { BaseText, BoxContainer, ColumnsDataTable, DataTableContainer } from '_components/custom'
import React, { useEffect, useState } from 'react'
import { TYPES } from 'rental-platform-shared'
import { CarsModule, CommonModule } from 'rental-platform-state'
import { ParcFormModal } from './components/FormModal'
import { FilterParc } from '_modules/cars/manage-parc/components/FilterParc'
import { DeleteParcModal } from './components/DeleteParcModal'
import { useCachedUser } from '_hooks/useCachedUser'

const ManageParcPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [selectedParc, setSelectedParc] = useState<TYPES.MODELS.CARS.ParcDto | null>(null)
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false)
  const [filters, setFilters] = useState<TYPES.MODELS.CARS.ParcListDto | null>(null)
  const currentUser = useCachedUser()

  const agencyId = currentUser?.establishment?.id

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
      enabled: !!agencyId,
      refetchOnMount: false,
    },
  })

  const { mutateAsync: createParc, isPending: createPending } = CarsModule.parcs.createParcMutation({
    mutationOptions: {
      onSuccess: () => {
        setOpenModal(false)
        setSelectedParc(null)
        refetch().then()
      },
    },
  })

  const { mutateAsync: updateParc, isPending: updatePending } = CarsModule.parcs.updateParcMutation({
    mutationOptions: {
      onSuccess: () => {
        setOpenModal(false)
        setSelectedParc(null)
        refetch().then()
      },
    },
  })
  const { mutateAsync: deleteParc, isPending: deleteParcPending } = CarsModule.parcs.deleteParcMutation({
    mutationOptions: {
      onSuccess: () => {
        setSelectedParc(null)
        refetch().then()
      },
    },
  })

  const handleSubmit = async (values: any) => {
    const request: TYPES.MODELS.CARS.ParcDto = {
      name: values?.name,
      address: values?.address,
    }
    if (selectedParc?.id) {
      await updateParc({
        payload: request,
        params: { agencyId },
      })
    } else {
      await createParc({
        payload: request,
        params: { agencyId },
      })
    }
  }

  const handleDelete = async () => {
    await deleteParc({
      params: {
        agencyId,
        name: selectedParc?.name,
      },
    })
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
          handleClick: (data) => {
            setDeleteModal(true)
            setSelectedParc(data)
          },
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
      <DeleteParcModal onChange={() => setDeleteModal(!deleteModal)} isOpen={deleteModal} isLoading={deleteParcPending} callback={handleDelete} data={selectedParc} />
    </BoxContainer>
  )
}

export default ManageParcPage
