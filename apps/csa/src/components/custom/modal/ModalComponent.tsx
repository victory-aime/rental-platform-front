import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle } from '_components/ui/dialog'
import React from 'react'
import { BaseButton } from '../button'
import { variantColorType } from '_components/custom/button'
import { ModalProps } from './interface/modal'
import { BoxIcon } from '../boxIcon'
import { useTranslation } from 'react-i18next'

const ModalComponent = ({
  isOpen = false,
  ignoreFooter = true,
  onChange,
  title = 'Modal Title',
  colorSaveButton = 'success',
  buttonSaveTitle = 'COMMON.VALIDATE',
  buttonCancelTitle = 'COMMON.CANCEL',
  showCloseButton = true,
  isLoading,
  onClick,
  isFull,
  modalType,
  icon,
  iconBackroungColor = 'red',
  children,
  ...rest
}: ModalProps) => {
  const { t } = useTranslation()
  return (
    <DialogRoot open={isOpen} lazyMount onOpenChange={(e) => onChange?.(e?.open)} placement={'center'} role={modalType} size={isFull ? 'full' : 'lg'} motionPreset="slide-in-top" {...rest}>
      <DialogContent width={'full'} padding={4}>
        <DialogHeader alignItems={'center'} display={'flex'} gap={4}>
          {icon && (
            <BoxIcon borderRadius={'7px'} color={iconBackroungColor}>
              {icon}
            </BoxIcon>
          )}
          <DialogTitle>{t(title)}</DialogTitle>
        </DialogHeader>
        <DialogBody mt={4}>{children}</DialogBody>
        {!ignoreFooter ? (
          <DialogFooter mt={8}>
            {buttonCancelTitle && (
              <DialogActionTrigger asChild>
                <BaseButton disabled={isLoading} onClick={onChange} variant="outline">
                  {t(buttonCancelTitle)}
                </BaseButton>
              </DialogActionTrigger>
            )}
            <BaseButton withGradient onClick={() => onClick?.()} isLoading={isLoading} colorType={modalType === 'alertdialog' ? 'danger' : (colorSaveButton as variantColorType)}>
              {t(buttonSaveTitle)}
            </BaseButton>
          </DialogFooter>
        ) : null}
        {showCloseButton && <DialogCloseTrigger />}
      </DialogContent>
    </DialogRoot>
  )
}

export default ModalComponent
