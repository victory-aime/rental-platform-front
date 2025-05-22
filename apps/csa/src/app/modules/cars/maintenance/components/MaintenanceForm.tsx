import { createListCollection, HStack, VStack } from '@chakra-ui/react'
import { BaseText, FormSelect, FormTextArea, FormTextInput, ModalComponent, ModalOpenProps } from '_components/custom'
import { FormDatePicker } from '_components/custom/form/FormDatePicker'
import { Formik } from 'formik'
import React, { FC, useEffect, useRef, useState } from 'react'
import { GiAutoRepair } from 'react-icons/gi'
import { CarsModule } from 'rental-platform-state'
import { maintenanceStatusList, typeList } from '../../constants/maintenance'
import { useTranslation } from 'react-i18next'
import { DateRange } from 'react-day-picker'

const MaintenanceForm: FC<ModalOpenProps> = ({ isOpen, isLoading, onChange, callback = () => {}, data, isSuccess }) => {
  const { t } = useTranslation()
  const [initialValues, setInitialValues] = useState({
    plannedDate: { from: undefined, to: undefined } as DateRange,
    title: '',
    description: '',
    carId: '',
    price: '',
    status: '',
  })
  const carsCache = CarsModule.CarsCache.getCars()
  const contentRef = useRef<HTMLDivElement>(null)

  const extractItemCars = createListCollection({
    items:
      carsCache?.map((item: { name: string; id: string }) => ({
        label: item.name,
        value: item.id,
      })) || [],
  })

  const maintenanceList = [
    {
      label: 'Vidande',
      value: 'vidange_car',
    },
    {
      label: 'reparation chassi',
      value: 'repair_chaisi',
    },
    {
      label: 'retro',
      value: 'retro',
    },
  ]

  useEffect(() => {
    if (data?.id) {
      setInitialValues({
        plannedDate: { from: new Date(data?.scheduledStartDate), to: new Date(data?.scheduledEndDate) } as DateRange,
        title: (data?.title && [data?.title]) || '',
        description: data?.description || '',
        carId: (data?.carId && [data?.carId]) || '',
        price: data?.cost || '',
        status: (data?.status && [data?.status]) || '',
      })
    }
  }, [data])

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        callback(values)
        if (isSuccess) {
          actions.resetForm()
        }
      }}
    >
      {({ values, handleSubmit, setFieldValue, resetForm }) => (
        <ModalComponent
          ref={contentRef}
          title={!data?.id ? 'Programmer une maintenance' : 'Modifier la maintenance'}
          icon={<GiAutoRepair />}
          iconBackgroundColor={'orange.500'}
          isOpen={isOpen}
          isLoading={isLoading}
          onChange={() => {
            onChange(!isOpen)
            resetForm()
          }}
          onClick={handleSubmit}
          closeOnInteractOutside={false}
          ignoreFooter={false}
        >
          <BaseText>{JSON.stringify(values, null, 2)}</BaseText>
          <VStack width={'full'} gap={8}>
            <HStack width={'full'} gap={3}>
              <FormSelect ref={contentRef} name="title" label="Type de maintence" listItems={typeList(maintenanceList)} setFieldValue={setFieldValue} />
              <FormSelect ref={contentRef} name="carId" label="Choisir le vehicule" listItems={extractItemCars} setFieldValue={setFieldValue} />
            </HStack>

            <FormDatePicker name={'plannedDate'} mode={'range'} placeholder="Definir les dates" />

            <FormTextInput name="price" placeholder="cout" toolTipInfo="Cout de la maintenance" type="number" />
            <FormTextArea name="description" placeholder="Description de la reparation" onChangeFunction={(e: any) => setFieldValue('description', e?.target?.value)} />
            <FormSelect ref={contentRef} name="status" placeholder={'CARS.FORMS.STATUS'} label={'CARS.FORMS.STATUS'} listItems={maintenanceStatusList(t)} setFieldValue={setFieldValue} />
          </VStack>
        </ModalComponent>
      )}
    </Formik>
  )
}

export default MaintenanceForm
