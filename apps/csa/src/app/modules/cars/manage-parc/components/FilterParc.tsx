import { Formik } from 'formik'
import { HStack } from '@chakra-ui/react'
import { ActionsButton, BoxContainer, FormTextInput } from '_components/custom'
import { RiSearch2Line } from 'react-icons/ri'
import { AiOutlineClear } from 'react-icons/ai'

export const FilterParc = ({ callback, onReset }: { callback: (value?: any) => void; onReset: () => void }) => {
  return (
    <Formik enableReinitialize initialValues={{ name: '', carsNumber: 0 }} onSubmit={callback} onReset={onReset}>
      {({ values, handleSubmit, resetForm }) => (
        <BoxContainer border={'none'}>
          <HStack width={'full'} gap={5}>
            <FormTextInput name={'name'} label={'PARC.FORMS.NAME'} placeholder={'PARC.FORMS.NAME'} value={values?.name} />
            <FormTextInput name={'carsNumber'} type={'number'} label={'PARC.TOTAL_CARS'} placeholder={'PARC.TOTAL_CARS'} value={values?.carsNumber} />
          </HStack>

          <ActionsButton
            mt={'20px'}
            alignItems={'flex-end'}
            justifyContent={'flex-end'}
            validateTitle={'COMMON.SEARCH'}
            icon={<RiSearch2Line />}
            onClick={handleSubmit}
            cancelTitle={'COMMON.CLEAR'}
            cancelIcon={<AiOutlineClear />}
            onCancel={() => resetForm()}
          />
        </BoxContainer>
      )}
    </Formik>
  )
}
