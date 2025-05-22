import { createListCollection, HStack, VStack } from '@chakra-ui/react'
import { FormSelect, FormTextArea, FormTextInput, ModalComponent, ModalOpenProps } from '_components/custom'
import { FormDatePicker } from '_components/custom/form/FormDatePicker'
import { Formik } from 'formik'
import React, { FC, useEffect, useRef, useState } from 'react'
import { GiAutoRepair } from 'react-icons/gi'
import { CarsModule } from 'rental-platform-state'
import { maintenanceStatusList, typeList, maintenanceList } from '../../constants/maintenance'
import { useTranslation } from 'react-i18next'
import { DateRange } from 'react-day-picker'
import { TYPES } from 'rental-platform-shared'

export const MaintenanceForm: FC<ModalOpenProps> = ({ isOpen, isLoading, onChange, callback = () => {}, data, isSuccess }) => {
  const { t } = useTranslation()
  const [initialValues, setInitialValues] = useState<TYPES.VALIDATION_SCHEMA.MAINTENANCE.initialMaintenanceValues | {}>(TYPES.VALIDATION_SCHEMA.MAINTENANCE.initialMaintenanceValues)
  const carsCache = CarsModule.CarsCache.getCars()
  const contentRef = useRef<HTMLDivElement>(null)

  const extractItemCars = createListCollection({
    items:
      carsCache?.map((item: { name: string; id: string }) => ({
        label: item.name,
        value: item.id,
      })) || [],
  })

  useEffect(() => {
    if (data?.id) {
      setInitialValues({
        plannedDate: { from: new Date(data?.plannedDates.scheduledStartDate), to: new Date(data?.plannedDates.scheduledEndDate) } as DateRange,
        title: (data?.title && [data?.title]) || '',
        description: data?.description || '',
        carId: (data?.carId && [data?.carId]) || '',
        price: data?.cost || '',
        status: (data?.status && [data?.status]) || '',
      })
    }
    if (!isOpen || isSuccess) {
      setInitialValues({})
    }
  }, [data, isOpen])

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values) => {
        callback(values)
      }}
    >
      {({ handleSubmit, setFieldValue, resetForm }) => (
        <ModalComponent
          ref={contentRef}
          title={!data?.id ? 'MAINTENANCE.ADD' : 'MAINTENANCE.EDIT'}
          icon={<GiAutoRepair />}
          iconBackgroundColor={'orange.500'}
          isOpen={isOpen}
          isLoading={isLoading}
          onChange={() => {
            onChange(!isOpen)
            resetForm()
          }}
          onClick={handleSubmit}
          buttonSaveTitle={!data?.id ? 'COMMON.VALIDATE' : 'COMMON.EDIT'}
          closeOnInteractOutside={false}
          ignoreFooter={false}
        >
          <VStack width={'full'} gap={8}>
            <HStack width={'full'} gap={3}>
              <FormSelect
                ref={contentRef}
                name="title"
                required
                label={'MAINTENANCE.FORMS.TITLE'}
                placeholder={'MAINTENANCE.FORMS.TITLE'}
                listItems={typeList(maintenanceList)}
                setFieldValue={setFieldValue}
              />
              <FormSelect ref={contentRef} name="carId" required label={'MAINTENANCE.FORMS.CAR'} placeholder={'MAINTENANCE.FORMS.CAR'} listItems={extractItemCars} setFieldValue={setFieldValue} />
            </HStack>

            <FormDatePicker required name={'plannedDate'} mode={'range'} placeholder={t('MAINTENANCE.FORMS.DATES')} label={t('MAINTENANCE.FORMS.DATES')} />

            <FormTextInput required label={'MAINTENANCE.FORMS.COST'} name="price" placeholder={'MAINTENANCE.FORMS.COST'} type="number" />
            <FormTextArea name="description" label={'MAINTENANCE.FORMS.DESC'} placeholder={'MAINTENANCE.FORMS.DESC'} onChangeFunction={(e: any) => setFieldValue('description', e?.target?.value)} />
            <FormSelect ref={contentRef} name="status" required placeholder={'CARS.FORMS.STATUS'} label={'CARS.FORMS.STATUS'} listItems={maintenanceStatusList(t)} setFieldValue={setFieldValue} />
          </VStack>
        </ModalComponent>
      )}
    </Formik>
  )
}
