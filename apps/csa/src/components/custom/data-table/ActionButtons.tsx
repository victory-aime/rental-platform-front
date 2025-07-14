import { HStack, IconButton } from '@chakra-ui/react'
import { FaTrashAlt } from 'react-icons/fa'
import { IoCopyOutline, IoShareOutline } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'
import { BaseButton } from '../button'
import { TbRestore } from 'react-icons/tb'
import { BaseTooltip, ActionButtonsProps } from '_components/custom'
import { PiEyeLight } from 'react-icons/pi'

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
              <BaseTooltip message={'COMMON.DELETE'} key={index} show>
                <IconButton aria-label="Supprimer" color={'white'} bgColor="red.500" size="sm" onClick={() => action.handleClick(item)} disabled={isDisabled}>
                  <FaTrashAlt />
                </IconButton>
              </BaseTooltip>
            )
          case 'edit':
            return (
              <BaseTooltip message={'COMMON.EDIT'} key={index} show>
                <IconButton aria-label="Modifier" color={'white'} bgColor="info.500" size="sm" onClick={() => action.handleClick(item)} disabled={isDisabled}>
                  <MdEdit />
                </IconButton>
              </BaseTooltip>
            )
          case 'view':
            return (
              <BaseTooltip message={'COMMON.DETAIL'} key={index} show>
                <IconButton aria-label="Voir" color={'white'} bgColor="primary.500" size="sm" onClick={() => action.handleClick(item)} disabled={isDisabled}>
                  <PiEyeLight />
                </IconButton>
              </BaseTooltip>
            )
          case 'share':
            return (
              <BaseTooltip message={'COMMON.SHARE'} key={index} show>
                <IconButton aria-label="Partager" color={'white'} bgColor="tertiary.500" size="sm" onClick={() => action.handleClick(item)} disabled={isDisabled}>
                  <IoShareOutline />
                </IconButton>
              </BaseTooltip>
            )
          case 'duplicate':
            return (
              <BaseTooltip message={'COMMON.DUPLICATE'} key={index} show>
                <IconButton aria-label="Dupliquer" color={'white'} bgColor="secondary.500" size="sm" onClick={() => action.handleClick(item)} disabled={isDisabled}>
                  <IoCopyOutline />
                </IconButton>
              </BaseTooltip>
            )
          case 'restore':
            return (
              <BaseTooltip message={'COMMON.RESTORE'} key={index} show>
                <IconButton aria-label="restore" color={'white'} bgColor="orange.800" size="sm" onClick={() => action.handleClick(item)} disabled={isDisabled}>
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
