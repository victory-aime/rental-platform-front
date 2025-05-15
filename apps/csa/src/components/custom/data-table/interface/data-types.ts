import { JSX } from 'react'

export type DataActionsButtonType = 'edit' | 'delete' | 'view'

interface ActionProps<T = any> {
  name: DataActionsButtonType | ((data: T) => string) // Nom ou fonction retournant un nom dynamique
  title?: string // Titre de l'action pour affichage (ex. Tooltip)
  handleClick: (data: T) => void // Fonction exécutée lors du clic sur l'action
  isDisabled?: (data: T) => boolean // Désactive l'action selon certaines conditions
  isShown?: boolean | ((data: T) => boolean) // Détermine si l'action doit être affichée
  isChecked?: (data: T) => boolean // Indique si l'action a un état de sélection
}

interface ActionButtonsProps<T> {
  actions: ActionProps<T>[]
  item: T
}

interface ColumnsDataTable {
  header: string
  accessor: string | 'fullObject'
  cell?: (x?: any) => JSX.Element | string | Date | undefined
  actions?: ActionProps[] // For multiple actions
  disabled?: (data?: any) => boolean
}

interface PaginationProps {
  table?: any
  totalItems?: number
  pageSize: number
  currentPage?: number
  lazy: boolean
  onLazyLoad?: (index: number) => void
}

interface ColumnsDataTable {
  header: string
  accessor: string | 'fullObject'
  cell?: (x?: any) => JSX.Element | string | Date | undefined
  disabled?: (data?: any) => boolean
}

type NoDataFoundType = 'trash' | 'folder'

interface TableProps {
  data: any[]
  columns: ColumnsDataTable[]
  totalItems?: number
  initialPage?: number
  minH?: number | string
  page?: number
  pageSize?: number
  lazy?: boolean
  animationType?: NoDataFoundType
  handleRowSelection?: (item: any) => void
  enabledSort?: boolean
  hidePagination?: boolean
  isLoading?: boolean
  isShow?: {
    edit?: boolean
    delete?: boolean
    details?: boolean
  }
}

export type { ActionProps, PaginationProps, ColumnsDataTable, TableProps, ActionButtonsProps }
