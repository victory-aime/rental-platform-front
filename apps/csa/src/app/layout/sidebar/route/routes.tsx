import { HomeIcon } from '_assets/svg'
import { ILink } from '../types'
import { MODULES_HOTEL_ROUTES, MODULES_CARS_ROUTES } from '_modules/routes'

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
      label: 'Voitures',
      icon: HomeIcon,
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
