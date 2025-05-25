import { createListCollection, HStack, VStack } from '@chakra-ui/react'
import { BaseText, FormSelect, FormTextArea, FormTextInput, ModalComponent, ModalOpenProps, FormTimePicker } from '_components/custom'
import { FormDatePicker } from '_components/custom/form/FormDatePicker'
import { Formik } from 'formik'
import React, { FC, useEffect, useRef, useState } from 'react'
import { GiAutoRepair } from 'react-icons/gi'
import { CarsModule } from 'rental-platform-state'
import { maintenanceStatusList, typeList, maintenanceList } from '../../constants/maintenance'
import { useTranslation } from 'react-i18next'
import { TYPES } from 'rental-platform-shared'
import * as yup from 'yup'

export const maintenanceValidationSchema = yup.object({
  title: yup.string().required().min(1, 'Le titre est requis'),
  carId: yup.string().required().min(1, 'La voiture est requise'),
  plannedDate: yup
    .object({
      from: yup.date().required('La date de début est requise'),
      to: yup.date().required('La date de fin est requise'),
    })
    .required('Les dates sont requises'),
  startTime: yup
    .string()
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, 'Heure de début invalide')
    .required('Heure de début requise'),
  endTime: yup
    .string()
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, 'Heure de fin invalide')
    .required('Heure de fin requise'),
  price: yup.number().typeError('Le prix doit être un nombre').required('Le prix est requis'),
  description: yup.string().nullable(),
  status: yup.string().required().min(1, 'Le statut est requis'),
})

export const MaintenanceForm: FC<ModalOpenProps> = ({ isOpen, isLoading, onChange, callback = () => {}, data, isSuccess }) => {
  const { t } = useTranslation()
  const [initialValues, setInitialValues] = useState<TYPES.VALIDATION_SCHEMA.MAINTENANCE.initialMaintenanceValues | {}>(TYPES.VALIDATION_SCHEMA.MAINTENANCE.initialMaintenanceValues)
  const carsCache = CarsModule.CarsCache.getCars()
  const contentRef = useRef<HTMLDivElement>(null)
  const [startTime, setStartTime] = useState<string | null>(null)
  const [endTime, setEndTime] = useState<string | null>(null)

  const extractItemCars = createListCollection({
    items:
      carsCache?.map((item: { name: string; id: string }) => ({
        label: item.name,
        value: item.id,
      })) || [],
  })

  useEffect(() => {
    if (data?.id) {
      const fromDate = new Date(data?.plannedDates.scheduledStartDate)
      const toDate = new Date(data?.plannedDates.scheduledEndDate)

      const getTimeString = (date: Date): string => {
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `${hours}:${minutes}`
      }

      setInitialValues({
        plannedDate: { from: fromDate, to: toDate },
        title: data?.title ? [data.title] : '',
        description: data?.description || '',
        carId: data?.carId ? [data.carId] : '',
        price: data?.cost || '',
        status: data?.status ? [data.status] : '',
        startTime: getTimeString(fromDate),
        endTime: getTimeString(toDate),
      })
      setStartTime(getTimeString(fromDate))
      setEndTime(getTimeString(toDate))
    }

    if (!isOpen || isSuccess) {
      setInitialValues({})
      setStartTime(null)
      setEndTime(null)
    }
  }, [data, isOpen])

  return (
    <Formik
      enableReinitialize
      initialValues={{ ...initialValues, startTime: startTime ?? '', endTime: endTime ?? '' }}
      onSubmit={(values) => {
        const { plannedDate, startTime, endTime, ...rest } = values

        const formatWithTime = (dateInput: Date, timeStr: string): Date => {
          const date = new Date(dateInput)
          const [hours, minutes] = timeStr.split(':').map(Number)
          date.setHours(hours)
          date.setMinutes(minutes)
          return date
        }

        const scheduledStartDate = plannedDate?.from instanceof Date && startTime ? formatWithTime(plannedDate.from, startTime) : null

        const scheduledEndDate = plannedDate?.to instanceof Date && endTime ? formatWithTime(plannedDate.to, endTime) : null

        callback({
          ...rest,
          scheduledStartDate,
          scheduledEndDate,
        })
      }}
      validationSchema={maintenanceValidationSchema}
    >
      {({ handleSubmit, setFieldValue, resetForm, values }) => (
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

            <HStack width={'full'} gap={3}>
              <FormTimePicker name="startTime" label="Heure de début" required placeholder="Sélectionnez une heure" toolTipInfo="Timz info " />

              <FormTimePicker name="endTime" label="Heure de fin" required placeholder="Sélectionnez une heure" toolTipInfo="Time info " />
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
