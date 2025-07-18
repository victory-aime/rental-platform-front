'use client'

import { Box, Flex, VStack, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormTextInput, FormSelect, CustomDragDropZone, CheckBoxFom, FormSwitch, BoxContainer } from '_components/custom'
import { Formik } from 'formik'
import { LuBadgeDollarSign, LuBadgePercent } from 'react-icons/lu'
import { CarsModule } from 'rental-platform-state'
import { TYPES } from 'rental-platform-shared'
import { findDynamicIdInList } from 'rise-core-frontend'
import { fuelList, transmissionList, categoryList, statusList, equipmentsList, parcList } from '../../constants/cars'
import { DiscountedPriceCalculator } from '_modules/cars/hooks/DiscountPriceCalculator'
import { useTranslation } from 'react-i18next'
import { useCachedUser } from '_hooks/useCachedUser'

const AddCarsPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const requestId = useSearchParams()?.get('requestId')
  const isDuplicate = useSearchParams()?.get('isDuplicate')
  const [initialValues, setInitialValues] = useState(TYPES.VALIDATION_SCHEMA.CARS.initialCarsValues)
  const [images, setImages] = useState<File[]>([])
  const [getCarsImages, setGetCarsImages] = useState<string[]>([])
  const [filesUploaded, setFilesUploaded] = useState<File[]>([])
  const [bookingStatus, setBookingsStatus] = useState<string | null>(null)
  const currentUser = useCachedUser()

  const {
    data: allCars,
    isLoading: fetchCarsLoading,
    refetch,
  } = CarsModule.getAllCarsQueries({
    payload: { establishment: currentUser?.establishment?.id ?? '' },
    queryOptions: { enabled: !!requestId && !!currentUser?.establishment?.id },
  })
  const existingCarsFiles = findDynamicIdInList(requestId!, allCars)
  const { data: categories } = CarsModule.getCarsCategoriesQueries({})
  const { data: equipments } = CarsModule.getCarsEquipmentsQueries({})
  const { data: parcs } = CarsModule.parcs.getParcsQueries({
    payload: {
      agencyId: currentUser?.establishment?.id,
    },
    queryOptions: {
      enabled: !!currentUser?.establishment?.id,
    },
  })
  const { mutateAsync: createCars, isPending: createPending } = CarsModule.createCarsMutation({
    mutationOptions: {
      onSuccess: () => {
        CarsModule.parcs.ParcsCache.invalidateParcs()
        refetch()
        router.back()
      },
    },
  })
  const { mutateAsync: updateCars, isPending: updatePending } = CarsModule.updateCarsMutation({
    mutationOptions: {
      onSuccess: () => {
        CarsModule.parcs.ParcsCache.invalidateParcs()
        refetch()
        router.back()
      },
    },
  })

  const uploadImages = () => {
    if (filesUploaded?.length > 0) {
      setImages(filesUploaded)
    }
  }

  const submitForm = async (values: TYPES.MODELS.CARS.ICreateCarDto) => {
    const formData = new FormData()

    formData.append('name', String(values?.name))
    formData.append('brand', String(values?.brand))
    formData.append('model', String(values?.model))
    formData.append('plateNumber', String(values?.plateNumber))
    formData.append('doors', String(values?.doors))
    formData.append('seats', String(values?.seats))
    formData.append('transmission', values?.transmission?.[0] ?? '')
    formData.append('fuelType', values?.fuelType?.[0] ?? '')
    formData.append('discountType', TYPES.ENUM.CARS.DiscountType.PERCENTAGE)
    formData.append('discountValue', String(values?.discountValue))
    formData.append('rentalPriceDiscounted', String(values?.rentalPriceDiscounted))
    formData.append('dailyPrice', String(values?.dailyPrice))
    formData.append('status', values?.status?.[0] ?? '')
    formData.append('carCategoryId', values?.carCategoryId?.[0] ?? '')
    formData.append('parkingCarId', values?.parkingCarId?.[0] ?? '')
    values?.equipmentIds?.forEach((value) => formData.append('equipmentIds', String(value)))
    images.forEach((file) => {
      formData.append('carImages', file)
    })

    if (requestId && !isDuplicate) {
      await updateCars({
        payload: formData as TYPES.MODELS.CARS.ICreateCarDto,
        params: {
          requestId: requestId,
        },
      })
    } else {
      await createCars({ payload: formData as TYPES.MODELS.CARS.ICreateCarDto, params: { agencyId: currentUser?.establishment?.id, agencyName: currentUser?.establishment?.name } })
    }
  }

  useEffect(() => {
    if (requestId && existingCarsFiles) {
      setGetCarsImages(existingCarsFiles?.carImages)
      setBookingsStatus(existingCarsFiles?.bookingStatus?.map((value: { status: string }) => value?.status))
      setInitialValues({
        ...existingCarsFiles,
        fuelType: existingCarsFiles?.fuelType && [existingCarsFiles.fuelType],
        transmission: existingCarsFiles?.transmission && [existingCarsFiles.transmission],
        carCategoryId: existingCarsFiles?.carCategoryId && [existingCarsFiles.carCategoryId],
        parkingCarId: existingCarsFiles?.parkingCarId ? [existingCarsFiles.parkingCarId] : '',
        status: existingCarsFiles?.status && [existingCarsFiles.status],
        equipmentIds: existingCarsFiles?.equipments?.map((e: { name: string }) => e.name) ?? [],
      })
    }
  }, [requestId, existingCarsFiles])

  useEffect(() => {
    if (filesUploaded?.length > 0) {
      uploadImages()
    }
  }, [filesUploaded?.length])

  return (
    <Formik
      enableReinitialize
      initialValues={{
        ...initialValues,
        hasDiscount: false,
      }}
      onSubmit={submitForm}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <BoxContainer
          border={'none'}
          p={{ base: 0, md: '3' }}
          title={!requestId ? 'CARS.ADD_CARS' : isDuplicate ? 'CARS.DUPLICATE_CARS' : 'CARS.EDIT_CARS'}
          description={!requestId ? 'CARS.ADD_DESC' : isDuplicate ? 'CARS.DUPLICATE_DESC' : 'CARS.EDIT_DESC'}
          withActionButtons
          actionsButtonProps={{
            requestId: requestId!,
            isLoading: createPending || updatePending,
            cancelTitle: 'COMMON.CANCEL',
            validateTitle: requestId && !isDuplicate ? 'COMMON.EDIT' : isDuplicate ? 'COMMON.DUPLICATE' : 'COMMON.VALIDATE',
            onClick() {
              handleSubmit()
            },
          }}
        >
          <Box alignItems={'flex-start'} justifyContent={'flex-start'} flexDirection={{ base: 'column', md: 'row' }} mt={'50px'} gap={4}>
            <Flex width={'full'} gap={8}>
              <BoxContainer title={'INFO_GEN_TITLE'} tooltip={'CARS.FORMS.INFO.TITLE'}>
                <VStack mt={10} gap={4} mb={4} align="stretch" width="100%">
                  <Stack width={'full'} gap={4} direction={{ base: 'column', md: 'row' }}>
                    <FormTextInput
                      name="name"
                      label={'CARS.FORMS.NAME'}
                      placeholder={'CARS.FORMS.NAME'}
                      value={values?.name}
                      isDisabled={bookingStatus === (TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE ?? TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE)}
                      isLoading={fetchCarsLoading}
                    />
                    <FormTextInput
                      name="brand"
                      label={'CARS.FORMS.BRAND'}
                      placeholder={'CARS.FORMS.BRAND'}
                      value={values?.brand}
                      isDisabled={bookingStatus === (TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE ?? TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE)}
                      isLoading={fetchCarsLoading}
                    />
                    <FormTextInput
                      name="model"
                      label={'CARS.FORMS.MODELS'}
                      placeholder={'CARS.FORMS.MODELS'}
                      value={values?.model}
                      isDisabled={bookingStatus === (TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE ?? TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE)}
                      isLoading={fetchCarsLoading}
                    />
                  </Stack>
                  <Stack width={'full'} gap={4} direction={{ base: 'column', md: 'row' }}>
                    <FormTextInput
                      name="plateNumber"
                      label={'CARS.FORMS.PLATE_NUMBER'}
                      placeholder={'CARS.FORMS.PLATE_NUMBER'}
                      value={values?.plateNumber}
                      isDisabled={bookingStatus === (TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE ?? TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE)}
                      isLoading={fetchCarsLoading}
                    />
                    <FormSelect
                      name="fuelType"
                      label={'CARS.FORMS.FUEL'}
                      placeholder={'CARS.FORMS.FUEL'}
                      listItems={fuelList(t)}
                      setFieldValue={setFieldValue}
                      isDisabled={bookingStatus === (TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE ?? TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE)}
                      isLoading={fetchCarsLoading}
                    />
                  </Stack>
                  <Stack width={'full'} gap={4} direction={{ base: 'column', md: 'row' }}>
                    <FormSelect
                      name="transmission"
                      label={'CARS.FORMS.TRANSMISSION'}
                      placeholder={'CARS.FORMS.TRANSMISSION'}
                      listItems={transmissionList(t)}
                      setFieldValue={setFieldValue}
                      isDisabled={bookingStatus === (TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE ?? TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE)}
                      isLoading={fetchCarsLoading}
                    />
                    <FormTextInput
                      name="doors"
                      label={'CARS.FORMS.DOORS'}
                      placeholder={'CARS.FORMS.DOORS'}
                      type="number"
                      value={values?.doors}
                      isDisabled={bookingStatus === (TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE ?? TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE)}
                      isLoading={fetchCarsLoading}
                    />
                    <FormTextInput
                      name="seats"
                      label={'CARS.FORMS.SEATS'}
                      placeholder={'CARS.FORMS.SEATS'}
                      type="number"
                      value={values?.seats}
                      isDisabled={bookingStatus === (TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE ?? TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE)}
                      isLoading={fetchCarsLoading}
                    />
                  </Stack>
                </VStack>
              </BoxContainer>
            </Flex>
            <Flex width={'full'} gap={8} flexDir={{ base: 'column', md: 'row' }}>
              <BoxContainer title={'PRICE_INFO'} tooltip={'CARS.FORMS.INFO.PRICE'}>
                <VStack mt={10} gap={4} mb={4} align="stretch" width="100%">
                  <Stack width="full" gap={4} direction={{ base: 'column', md: 'row' }}>
                    <FormTextInput
                      name="dailyPrice"
                      type="number"
                      leftAccessory={<LuBadgeDollarSign />}
                      label={'CARS.FORMS.DAILY_PRICE'}
                      placeholder={'CARS.FORMS.DAILY_PRICE'}
                      value={values?.dailyPrice}
                      isDisabled={bookingStatus === (TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE ?? TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE)}
                      isLoading={fetchCarsLoading}
                    />
                  </Stack>
                  {currentUser?.establishment?.subscription?.plan?.canUseDiscounts && <FormSwitch name="hasDiscount" label="COMMON.REMISE" />}

                  {values?.hasDiscount && bookingStatus !== (TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE || TYPES.ENUM.COMMON.CommonBookingStatus.PENDING) && (
                    <Stack gap={4} direction={{ base: 'column', md: 'row' }}>
                      <FormTextInput
                        name="discountValue"
                        type="number"
                        leftAccessory={<LuBadgePercent />}
                        label="CARS.FORMS.DISCOUNT_VALUE"
                        placeholder={'CARS.FORMS.DISCOUNT_VALUE'}
                        toolTipInfo="CARS.FORMS.INFO.DISCOUNT_VALUE"
                        value={values?.discountValue}
                        isDisabled={bookingStatus === (TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE ?? TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE)}
                        isLoading={fetchCarsLoading}
                      />
                      <FormTextInput
                        name="rentalPriceDiscounted"
                        type="number"
                        isDisabled
                        leftAccessory={<LuBadgeDollarSign />}
                        label="CARS.FORMS.DISCOUNT"
                        placeholder="0.00"
                        toolTipInfo="CARS.FORMS.INFO.DISCOUNT"
                        value={values?.rentalPriceDiscounted}
                        isLoading={fetchCarsLoading}
                      />
                    </Stack>
                  )}
                </VStack>
                <VStack mt={10} gap={4} mb={4} align="stretch" width="100%">
                  <Stack mb={4} alignItems={'center'} justifyContent={'center'} width={'full'} gap={4} direction={{ base: 'column', md: 'row' }}>
                    <FormSelect
                      name="parkingCarId"
                      label={'CARS.FORMS.PARKING'}
                      placeholder={'CARS.FORMS.PARKING'}
                      setFieldValue={setFieldValue}
                      listItems={parcList(parcs?.content) ?? []}
                      isLoading={fetchCarsLoading}
                    />

                    <FormSelect
                      name="carCategoryId"
                      label={'CARS.FORMS.CATEGORY'}
                      setFieldValue={setFieldValue}
                      listItems={categoryList(categories)}
                      placeholder={'CARS.FORMS.CATEGORY'}
                      isDisabled={bookingStatus === (TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE ?? TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE)}
                      isLoading={fetchCarsLoading}
                    />
                  </Stack>

                  <FormSelect
                    listItems={statusList(t)}
                    isClearable={false}
                    setFieldValue={setFieldValue}
                    name="status"
                    placeholder={'CARS.FORMS.STATUS'}
                    label={'CARS.FORMS.STATUS'}
                    toolTipInfo={'CARS.FORMS.INFO.STATUS'}
                    isDisabled={bookingStatus === (TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE ?? TYPES.ENUM.COMMON.CommonBookingStatus.ACTIVE)}
                    isLoading={fetchCarsLoading}
                  />
                </VStack>
              </BoxContainer>
              <BoxContainer title={'CARS.FORMS.EQUIPMENTS'} tooltip={'CARS.FORMS.INFO.EQUIPMENTS'}>
                <Box mt={10} mb={4} width={'full'}>
                  <CheckBoxFom name="equipmentIds" items={equipmentsList(equipments)} itemsPerRow={3} />
                </Box>
              </BoxContainer>
            </Flex>

            <BoxContainer title={'CARS.FORMS.IMAGE'} tooltip={'CARS.FORMS.INFO.IMAGES'}>
              <CustomDragDropZone getFilesUploaded={setFilesUploaded} initialImageUrls={getCarsImages} />
            </BoxContainer>
          </Box>
          <DiscountedPriceCalculator />
        </BoxContainer>
      )}
    </Formik>
  )
}

export default AddCarsPage
