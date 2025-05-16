'use client'

import { BaseText, BoxContainer, ColumnsDataTable, CustomFormatNumber, DataTableContainer } from '_components/custom'
import { DisplayImage } from '../components/DisplayImage'
import { Box } from '@chakra-ui/react'
import React from 'react'
import { TYPES } from 'rental-platform-shared-lib'
import { useRouter } from 'next/navigation'
import { MODULES_CARS_ROUTES } from '../routes'
import { CarsModule, UserModule } from 'platform-state-management'

const ManageCarsPage = () => {
  const [toggle, setToggle] = React.useState(false)
  const router = useRouter()
  const currentUser = UserModule.UserCache.getUser()
  const { data: cars } = CarsModule.getAllCarsQueries({
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
      cell: (x) => {
        return <DisplayImage value={x} />
      },
    },
    {
      header: 'Nom',
      accessor: 'name',
    },
    {
      header: 'Marque',
      accessor: 'brand',
    },
    {
      header: 'Modele',
      accessor: 'model',
    },
    {
      header: 'Prix/Jour',
      accessor: 'dailyPrice',
      cell: (x) => {
        return <CustomFormatNumber value={x} currencyCode={TYPES.ENUM.Currency.XAF} notation="standard" />
      },
    },
    {
      header: 'Actions',
      accessor: 'actions',
      actions: [
        {
          name: 'edit',
          handleClick: () => {},
        },
        {
          name: 'view',
          handleClick: () => {},
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
      title={'Gestion de la flotte'}
      description={'Gerer votre flotte de vehicules'}
      border={'none'}
      withActionButtons
      isFilterActive={toggle}
      onToggleFilter={() => setToggle(!toggle)}
      actionsButtonProps={{
        validateTitle: 'Ajouter un vehicule',
        validateColor: 'primary',
        onClick() {
          router.push(MODULES_CARS_ROUTES.ADD_CAR)
        },
      }}
      filterComponent={
        <BaseText>
          <BaseText>Texte all</BaseText>
        </BaseText>
      }
    >
      <Box mt={'30px'}>
        <DataTableContainer data={cars} columns={columns} />
      </Box>
    </BoxContainer>
  )
}
export default ManageCarsPage
