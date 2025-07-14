import { createListCollection, HStack, VStack } from '@chakra-ui/react'
import { FormSelect, FormTextArea, FormTextInput, ModalComponent, ModalOpenProps, FormTimePicker, BaseText } from '_components/custom'
import { FormDatePicker } from '_components/custom/form/FormDatePicker'
import { Formik } from 'formik'
import React, { FC, useEffect, useRef, useState } from 'react'
import { GiAutoRepair } from 'react-icons/gi'
import { CarsModule } from 'rental-platform-state'
import { maintenanceStatusList, typeList, maintenanceList } from '../../constants/maintenance'
import { useTranslation } from 'react-i18next'
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

  const formatWithTime = (dateInput: Date, timeStr: string): Date => {
    const date = new Date(dateInput)
    const [hours, minutes] = timeStr.split(':').map(Number)
    date.setHours(hours)
    date.setMinutes(minutes)
    return date
  }

  const getTimeString = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  useEffect(() => {
    if (data) {
      const fromDate = new Date(data?.plannedDates?.scheduledStartDate)
      const toDate = new Date(data?.plannedDates?.scheduledEndDate)

      setInitialValues({
        plannedDate: { from: fromDate, to: toDate },
        title: data?.title && [data.title],
        description: data?.description || '',
        carId: data?.carId && [data.carId],
        price: data?.cost || '',
        status: data?.status && [data.status],
        startTime: getTimeString(fromDate),
        endTime: getTimeString(toDate),
      })
    }

    if (!isOpen) {
      setInitialValues({})
    }
  }, [data, isOpen])

  return (
    <Formik
      enableReinitialize
      initialValues={{ ...initialValues }}
      onSubmit={(values) => {
        const { plannedDate, startTime, endTime, ...rest } = values
        const scheduledStartDate = plannedDate?.from instanceof Date && startTime ? formatWithTime(plannedDate.from, startTime) : null
        const scheduledEndDate = plannedDate?.to instanceof Date && endTime ? formatWithTime(plannedDate.to, endTime) : null
        callback({
          ...rest,
          scheduledStartDate,
          scheduledEndDate,
        })
      }}
      validationSchema={TYPES.VALIDATION_SCHEMA.MAINTENANCE.maintenanceValidationSchema}
    >
      {({ handleSubmit, setFieldValue, resetForm, dirty }) => (
        <ModalComponent
          ref={contentRef}
          title={!data?.id ? 'MAINTENANCE.ADD' : 'MAINTENANCE.EDIT'}
          icon={<GiAutoRepair />}
          iconBackgroundColor={'tertiary.500'}
          isOpen={isOpen}
          isLoading={isLoading}
          onChange={() => {
            onChange(!isOpen)
            resetForm()
          }}
          onClick={handleSubmit}
          disabled={!dirty}
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

            <FormDatePicker required name={'plannedDate'} mode={'range'} placeholder={'MAINTENANCE.FORMS.DATES'} label={'MAINTENANCE.FORMS.DATES'} />

            <HStack width={'full'} gap={3}>
              <FormTimePicker name="startTime" label="MAINTENANCE.FORMS.START_TIME" required placeholder="--:--" />

              <FormTimePicker name="endTime" label="MAINTENANCE.FORMS.END_TIME" required placeholder="--:--" />
            </HStack>

            <FormTextInput required label={'MAINTENANCE.FORMS.COST'} name="price" placeholder={'MAINTENANCE.FORMS.COST'} />
            <FormTextArea name="description" label={'MAINTENANCE.FORMS.DESC'} placeholder={'MAINTENANCE.FORMS.DESC'} onChangeFunction={(e: any) => setFieldValue('description', e?.target?.value)} />
            <FormSelect ref={contentRef} name="status" required placeholder={'CARS.FORMS.STATUS'} label={'CARS.FORMS.STATUS'} listItems={maintenanceStatusList(t)} setFieldValue={setFieldValue} />
          </VStack>
        </ModalComponent>
      )}
    </Formik>
  )
}
