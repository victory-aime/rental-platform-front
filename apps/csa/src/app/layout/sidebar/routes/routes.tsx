import { HomeIcon, CarsIcon, ParkingIcon } from '_assets/svg'
import { ILink } from '../types'
import { MODULES_HOTEL_ROUTES, MODULES_CARS_ROUTES } from '_modules/routes'
import { GiAutoRepair } from 'react-icons/gi'
import { PiCalendarThin } from 'react-icons/pi'
import { FaUserCog, FaCog } from 'react-icons/fa'
import { MdLocalOffer } from 'react-icons/md'

export const MENU_BY_ROLE: Record<string, ILink[]> = {
  HOTELIER: [
    {
      path: MODULES_HOTEL_ROUTES.DASHBOARD,
      label: 'Hôtels',
      icon: HomeIcon,
    },
  ],
  AUTOMOBILISTE: [
    {
      path: MODULES_CARS_ROUTES.DASHBOARD,
      label: 'SIDE_BAR.DASHBOARD',
      icon: HomeIcon,
    },
    {
      path: MODULES_CARS_ROUTES.MANAGE_CARS.LIST_CARS,
      label: 'SIDE_BAR.MANAGE_CARS',
      icon: CarsIcon,
    },
    {
      path: MODULES_CARS_ROUTES.MANAGE_PARCS,
      label: 'SIDE_BAR.MANAGE_PARCS',
      icon: ParkingIcon,
    },
    {
      path: MODULES_CARS_ROUTES.MAINTENANCE,
      label: 'SIDE_BAR.MAINTENANCE',
      icon: GiAutoRepair,
    },
    {
      path: MODULES_CARS_ROUTES.AGENDA,
      label: 'SIDE_BAR.AGENDA',
      icon: PiCalendarThin,
    },
    {
      menuKey: 'settings',
      path: '',
      label: 'SIDE_BAR.SETTINGS',
      icon: FaCog,
      subItems: [
        {
          path: MODULES_CARS_ROUTES.SETTINGS.PROFILE,
          label: 'SIDE_BAR.PROFILE',
          icon: FaUserCog,
        },
        // {
        //   path: MODULES_CARS_ROUTES.SETTINGS.PLAN,
        //   label: 'SIDE_BAR.PLAN',
        //   icon: MdLocalOffer,
        // },
      ],
    },
  ],
  ADMIN: [
    {
      path: MODULES_HOTEL_ROUTES.DASHBOARD,
      label: 'Hôtels',
      icon: HomeIcon,
    },
    {
      path: MODULES_CARS_ROUTES.DASHBOARD,
      label: 'Voitures',
      icon: HomeIcon,
    },
  ],
}
