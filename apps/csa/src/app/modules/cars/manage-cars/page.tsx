'use client'

import { BaseText, BoxContainer, ColumnsDataTable, CustomFormatNumber, DataTableContainer } from '_components/custom'
import { DisplayImage } from '../components/DisplayImage'
import { Box } from '@chakra-ui/react'
import React from 'react'
import { TYPES } from 'platform-shared'
import { useRouter } from 'next/navigation'
import { MODULES_CARS_ROUTES } from '../routes'

const ManageCarsPage = () => {
  const [toggle, setToggle] = React.useState(false)
  const router = useRouter()
  const mockCars = [
    {
      id: 'car-001',
      name: 'Tesla Model S',
      price: 79999,
      images: ['https://th.bing.com/th/id/OIP.c1tx-MTZsVMl9TnHgqrYEgHaE8?cb=iwp2&rs=1&pid=ImgDetMain'],
    },
    {
      id: 'car-002',
      name: 'BMW i8',
      price: 120000,
      images: ['https://th.bing.com/th/id/OIP.c1tx-MTZsVMl9TnHgqrYEgHaE8?cb=iwp2&rs=1&pid=ImgDetMain'],
    },
    {
      id: 'car-003',
      name: 'Audi R8',
      price: 150000,
      images: ['https://th.bing.com/th/id/OIP.0H6a4tOc6DItsEWJIU3sEQHaEo?cb=iwp2&rs=1&pid=ImgDetMain'],
    },
    {
      id: 'car-004',
      name: 'Mercedes AMG GT',
      price: 130000,
      images: ['https://th.bing.com/th/id/OIP.0H6a4tOc6DItsEWJIU3sEQHaEo?cb=iwp2&rs=1&pid=ImgDetMain'],
    },
    {
      id: 'car-005',
      name: 'Porsche 911',
      price: 140000,
      images: [
        'https://th.bing.com/th/id/R.4e7acec211a711b2669d91a771c0b4ca?rik=1ij3ke4tcnxHcQ&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f08%2fFree-Cars-Full-HD-Images-1080p.jpg&ehk=IN1J%2f8CvnnGiJh698L6AgrSF8jq83lL9DMc9lb6t3TA%3d&risl=&pid=ImgRaw&r=0',
      ],
    },
    {
      id: 'car-006',
      name: 'Lamborghini Huracan',
      price: 210000,
      images: ['https://images.pexels.com/photos/810357/pexels-photo-810357.jpeg?cs=srgb&dl=pexels-mikebirdy-810357.jpg&fm=jpg'],
    },
  ]

  const columns: ColumnsDataTable[] = [
    {
      header: '',
      accessor: 'images',
      cell: (x) => {
        return <DisplayImage value={x} />
      },
    },
    {
      header: 'Marque',
      accessor: 'name',
    },
    {
      header: 'Prix/Jour',
      accessor: 'price',
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
        <DataTableContainer data={mockCars} columns={columns} />
      </Box>
    </BoxContainer>
  )
}
export default ManageCarsPage
