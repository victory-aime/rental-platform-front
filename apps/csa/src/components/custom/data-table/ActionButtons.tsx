import { HStack, IconButton } from '@chakra-ui/react'
import { FaTrashAlt } from 'react-icons/fa'
import { IoNewspaperOutline } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'
import { BaseButton } from '../button'
import { ActionButtonsProps } from './interface/data-types'
import { TbRestore } from 'react-icons/tb'
import { BaseTooltip } from '_components/custom'

export const ActionButtons = <T,>({ actions, item }: ActionButtonsProps<T>) => {
  return (
    <HStack gap={2}>
      {actions.map((action, index) => {
        const isShown = typeof action.isShown === 'function' ? action.isShown(item) : action.isShown !== false
        const isDisabled = action.isDisabled ? action.isDisabled(item) : false
        const label = typeof action.name === 'function' ? action.name(item) : action.name
        if (!isShown) return null

        switch (label) {
          case 'delete':
            return (
              <BaseTooltip message={'COMMON.DELETE'} key={index}>
                <IconButton aria-label="Supprimer" colorPalette="red" size="sm" onClick={() => action.handleClick(item)} disabled={isDisabled}>
                  <FaTrashAlt />
                </IconButton>
              </BaseTooltip>
            )
          case 'edit':
            return (
              <BaseTooltip message={'COMMON.EDIT'} key={index}>
                <IconButton aria-label="Modifier" colorPalette="blue" size="sm" onClick={() => action.handleClick(item)} disabled={isDisabled}>
                  <MdEdit />
                </IconButton>
              </BaseTooltip>
            )
          case 'view':
            return (
              <BaseTooltip message={'COMMON.DETAIL'} key={index}>
                <IconButton aria-label="Voir" colorPalette="green" size="sm" onClick={() => action.handleClick(item)} disabled={isDisabled}>
                  <IoNewspaperOutline />
                </IconButton>
              </BaseTooltip>
            )
          case 'restore':
            return (
              <BaseTooltip message={'COMMON.RESTORE'} key={index}>
                <IconButton aria-label="restore" colorPalette="blue" size="sm" onClick={() => action.handleClick(item)} disabled={isDisabled}>
                  <TbRestore />
                </IconButton>
              </BaseTooltip>
            )
          default:
            return (
              <BaseButton key={index} size="sm" onClick={() => action.handleClick(item)} disabled={isDisabled}>
                {label}
              </BaseButton>
            )
        }
      })}
    </HStack>
  )
}
