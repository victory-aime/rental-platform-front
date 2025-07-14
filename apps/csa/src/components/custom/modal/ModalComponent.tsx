import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot } from '_components/ui/dialog'
import React from 'react'
import { BaseButton } from '../button'
import { variantColorType } from '_components/custom/button'
import { ModalProps } from './interface/modal'
import { BoxIcon } from '../boxIcon'
import { useTranslation } from 'react-i18next'
import { BaseText, TextVariant } from '_components/custom'

const ModalComponent = ({
  isOpen = false,
  ignoreFooter = true,
  onChange,
  title = 'Modal Title',
  colorSaveButton = 'primary',
  buttonSaveTitle = 'COMMON.VALIDATE',
  buttonCancelTitle = 'COMMON.CANCEL',
  showCloseButton = true,
  isLoading,
  onClick,
  isFull,
  modalType,
  icon,
  iconBackgroundColor = 'error.700',
  children,
  disabled,
  ref,
  ...rest
}: ModalProps) => {
  const { t } = useTranslation()

  return (
    <DialogRoot open={isOpen} lazyMount onOpenChange={(e) => onChange?.(e?.open)} placement={'center'} role={modalType} size={isFull ? 'full' : 'lg'} motionPreset="slide-in-top" {...rest}>
      <DialogContent width={'full'} padding={4}>
        <DialogHeader alignItems={'center'} display={'flex'} gap={4}>
          {icon && (
            <BoxIcon borderRadius={'7px'} color={iconBackgroundColor}>
              {icon}
            </BoxIcon>
          )}
          <BaseText variant={TextVariant.S}>{t(title)}</BaseText>
        </DialogHeader>
        <DialogBody autoFocus={false} mt={4} ref={ref}>
          {children}
        </DialogBody>
        {!ignoreFooter ? (
          <DialogFooter mt={8}>
            {isLoading ? (
              <BaseButton isLoading />
            ) : (
              <>
                {buttonCancelTitle && (
                  <DialogActionTrigger asChild>
                    <BaseButton disabled={disabled} withGradient onClick={onChange} variant="outline" colorType={'secondary'}>
                      {t(buttonCancelTitle)}
                    </BaseButton>
                  </DialogActionTrigger>
                )}
                <BaseButton disabled={disabled} withGradient onClick={() => onClick?.()} colorType={modalType === 'alertdialog' ? 'danger' : (colorSaveButton as variantColorType)}>
                  {t(buttonSaveTitle)}
                </BaseButton>
              </>
            )}
          </DialogFooter>
        ) : null}
        {showCloseButton && <DialogCloseTrigger />}
      </DialogContent>
    </DialogRoot>
  )
}

export default ModalComponent
