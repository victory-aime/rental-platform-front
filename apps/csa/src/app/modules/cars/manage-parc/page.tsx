'use client'

import { Box } from '@chakra-ui/react'
import { BaseText, BoxContainer, ColumnsDataTable, DataTableContainer } from '_components/custom'
import React, { useState } from 'react'
import { TYPES } from 'rental-platform-shared'
import { CarsModule, CommonModule } from 'rental-platform-state'
import { ParcFormModal } from './components/FormModal'

const ManageParcPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedParc, setSelectedParc] = useState<TYPES.MODELS.CARS.ParcDto | null>(null)
  const currentUser = CommonModule.UserModule.UserCache.getUser()
  const {
    data: parc,
    refetch,
    isLoading,
  } = CarsModule.parcs.getParcsQueries({
    payload: {
      agencyId: currentUser?.establishment.id,
    },
  })

  const { mutateAsync: createParc, isPending: createPending } = CarsModule.parcs.createParcMutation({
    onSuccess: () => {
      setOpenModal(false)
      setSelectedParc(null)
      refetch()
    },
  })

  const { mutateAsync: updateParc, isPending: updatePending } = CarsModule.parcs.updateParcMutation({
    onSuccess: () => {
      setOpenModal(false)
      setSelectedParc(null)
      refetch()
    },
  })

  const handleSubmit = async (values: any) => {
    const request: TYPES.MODELS.CARS.ParcDto = {
      agencyId: currentUser?.establishment.id,
      name: values?.name,
      address: values?.address,
    }
    if (selectedParc?.id) {
      await updateParc({ id: selectedParc?.id, ...request })
    } else {
      await createParc(request)
    }
  }

  const columns: ColumnsDataTable[] = [
    {
      header: 'Name',
      accessor: 'name',
    },
    {
      header: 'Address',
      accessor: 'address',
    },
    {
      header: 'Nombre cars',
      accessor: '_count',
      cell(x) {
        return <BaseText>{x?.listCar}</BaseText>
      },
    },
    {
      header: 'Actions',
      accessor: 'actions',
      actions: [
        {
          name: 'edit',
          handleClick(data) {
            setOpenModal(true)
            setSelectedParc(data)
          },
        },
        {
          name: 'view',
          handleClick(data) {},
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
      title={'SIDE_BAR.MANAGE_PARCS'}
      description={'gere mes parcs'}
      border={'none'}
      withActionButtons
      isFilterActive
      onToggleFilter={() => {}}
      filterComponent={<></>}
      actionsButtonProps={{
        validateTitle: 'ajouter un parck',
        validateColor: 'primary',
        onClick() {
          setOpenModal(true)
          setSelectedParc(null)
        },
        onReload() {
          refetch()
        },
      }}
    >
      <Box mt={'80px'}>
        <DataTableContainer data={parc?.content ?? []} columns={columns} totalItems={parc?.totalPages} pageSize={parc?.totalDataPerPage} isLoading={isLoading} initialPage={parc?.currentPage} />
      </Box>
      <ParcFormModal isOpen={openModal} onChange={() => setOpenModal(!open)} data={selectedParc} isLoading={createPending || updatePending} callback={handleSubmit} />
    </BoxContainer>
  )
}

export default ManageParcPage
