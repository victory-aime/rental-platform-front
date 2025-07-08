import { Field, Flex } from '@chakra-ui/react'
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from '_components/ui/select'
import React, { FC } from 'react'
import { FullSelectProps } from './interface/input'
import { useField } from 'formik'
import { BaseText } from '../base-text'
import { useTranslation } from 'react-i18next'
import { HiOutlineInformationCircle } from 'react-icons/hi2'
import { BaseTooltip } from '../tooltip'
import { CustomSkeletonLoader } from '../custom-skeleton'

const FormSelect: FC<FullSelectProps> = ({
  listItems,
  label,
  name,
  required,
  isMultiSelect = false,
  placeholder = 'COMMON.SELECT_OPTIONS',
  infoMessage,
  width = 'full',
  variant = 'subtle',
  validate,
  isDisabled = false,
  isClearable = true,
  showDropdownIcon = true,
  toolTipInfo = '',
  onChangeFunc,
  setFieldValue,
  isLoading,
  ref,
  customRenderSelected,
}) => {
  const { t } = useTranslation()
  const fieldHookConfig = {
    name,
    validate,
  }
  const [field, { touched, error }] = useField(fieldHookConfig)
  const isError = error ? !!error : !!(touched && error)

  const extractSingleValue = (value: any) => {
    return Array?.isArray(value) ? value[0] : value
  }

  return (
    <Field.Root id={name} invalid={isError} disabled={isDisabled} width={'full'}>
      <SelectRoot
        name={field.name}
        value={field.value}
        variant={variant}
        required={required}
        lazyMount
        unmountOnExit
        onValueChange={(item: any) => {
          const newValue = isMultiSelect ? item?.map((i: any) => i.value) : item?.value
          setFieldValue(name, newValue)
          onChangeFunc?.(newValue)
        }}
        multiple={isMultiSelect}
        onBlur={(e) => {
          field?.onBlur(e)
        }}
        collection={listItems?.items?.length ? listItems : undefined}
        size={'lg'}
        width={width}
      >
        {label && (
          <SelectLabel display={'flex'} gap={'6px'} mb={'4px'} fontSize={{ base: '14px', md: '12px' }} alignItems={'center'}>
            {isLoading ? (
              <CustomSkeletonLoader type="TEXT" numberOfLines={1} />
            ) : (
              <>
                {t(label)}
                {required && <BaseText color={'red'}> * </BaseText>}
                {toolTipInfo && (
                  <BaseTooltip message={toolTipInfo}>
                    <HiOutlineInformationCircle size={14} />
                  </BaseTooltip>
                )}
              </>
            )}
          </SelectLabel>
        )}

        {isLoading ? (
          <CustomSkeletonLoader type="FORM" height={'50px'} width={'100%'} />
        ) : (
          <>
            <SelectTrigger clearable={isClearable} showDropdownIcon={showDropdownIcon}>
              {customRenderSelected ? (
                customRenderSelected(
                  listItems?.items.filter((i: any) => {
                    const currentValue = extractSingleValue(field.value)
                    return i.value === currentValue
                  })
                )
              ) : (
                <SelectValueText placeholder={t(placeholder)} fontSize={{ base: '16px', md: '12px' }} />
              )}
            </SelectTrigger>

            <SelectContent borderRadius={7} p={3} portalRef={ref}>
              {listItems?.items?.length ? (
                listItems?.items?.map((item: { id: string; label: string; value: string }) => (
                  <SelectItem _highlighted={{ color: 'primary.500' }} py={1} item={item.value} key={item.value} fontSize={{ base: '16px', md: '12px' }}>
                    {item.label}
                  </SelectItem>
                ))
              ) : (
                <BaseText fontSize="sm" color="gray.400" px={2} py={1}>
                  {t('COMMON.NO_SELECT_OPTIONS')}
                </BaseText>
              )}
            </SelectContent>
          </>
        )}
      </SelectRoot>
      {isError && (
        <Flex gap={1} mt={1} alignItems={'center'}>
          <Field.ErrorIcon width={4} height={4} color={'red.500'} />
          <Field.ErrorText>{error}</Field.ErrorText>
        </Flex>
      )}
      {infoMessage && (
        <>
          {isLoading ? (
            <CustomSkeletonLoader type="TEXT" numberOfLines={2} />
          ) : (
            <Flex gap={1} mt={1} alignItems={'center'}>
              <Field.ErrorIcon width={4} height={4} color={'info.500'} />
              <Field.HelperText p={1}>{t(infoMessage)}</Field.HelperText>
            </Flex>
          )}
        </>
      )}
    </Field.Root>
  )
}

export default FormSelect
