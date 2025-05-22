import { DialogRootProps } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { variantColorType } from '_components/custom'

export interface ModalProps extends DialogRootProps {
  title?: string | undefined
  isOpen?: boolean | undefined
  onChange?: (value: any) => void
  showCloseButton?: boolean
  ignoreFooter?: boolean
  modalType?: 'dialog' | 'alertdialog' | undefined
  buttonSaveTitle?: string
  buttonCancelTitle?: string
  colorSaveButton?: variantColorType
  isFull?: boolean | undefined
  icon?: ReactNode
  iconBackgroundColor?: string
  onClick?: () => void
  isLoading?: boolean
  children: ReactNode
  ref?: React.Ref<HTMLDivElement> | undefined
}

export interface ModalOpenProps {
  onChange: (value: any) => void
  callback?: (value?: any) => void
  isOpen: boolean | undefined
  isLoading?: boolean
  data?: any
  isSuccess?: boolean
}
