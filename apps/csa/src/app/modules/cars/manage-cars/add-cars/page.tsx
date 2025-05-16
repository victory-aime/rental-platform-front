'use client'

import { Box, Flex, VStack, useBreakpointValue, Center, ListCollection, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormTextInput, FormSelect, CustomDragDropZone, ActionsButton, BaseText, CheckBoxFom, FormSwitch, TextVariant, TextWeight } from '_components/custom'
import { Formik } from 'formik'
import { LuBadgeDollarSign, LuBadgePercent } from 'react-icons/lu'
import { CarsModule, UserModule } from 'rental-platform-state'
import { TYPES, UTILS } from 'rental-platform-shared'
import { FormContainer } from '../../components/FormContainer'
import { fuelList, transmissionList, categoryList, statusList, equipmentsList } from '../constants/cars'
import { DiscountedPriceCalculator } from '_modules/cars/hooks/DiscountPriceCalculator'

const AddCarsPage = () => {
  const router = useRouter()
  const requestId = useSearchParams()?.get('requestId')
  const responsiveMode = useBreakpointValue({ base: false, md: true })
  const [initialValues, setInitialValues] = useState(TYPES.VALIDATION_SCHEMA.CARS.initialCarsValues)
  const [images, setImages] = useState<File[]>([])
  const [getCarsImages, setGetCarsImages] = useState<string[]>([])
  const [filesUploaded, setFilesUploaded] = useState<File[]>([])
  const [bookingStatus, setBookingsStatus] = useState<string | null>(null)

  const currentUser = UserModule.UserCache.getUser()
  const carsCache = CarsModule.CarsCache.getCars()
  const existingCarsFiles = UTILS.findDynamicIdInList(requestId ?? '', carsCache)
  const {} = CarsModule.getAllCarsQueries({
    payload: { establishment: currentUser?.establishment?.id ?? '' },
    queryOptions: { enabled: carsCache?.length === 0 && !!existingCarsFiles && !!requestId },
  })
  const { data: categories } = CarsModule.getCarsCategoriesQueries({})
  const { data: equipments } = CarsModule.getCarsEquipmentsQueries({})
  const { mutateAsync: createCars, isPending: createPending } = CarsModule.createCarsMutation({
    onSuccess: () => {
      CarsModule.CarsCache.invalidateCars()
      router.back()
    },
  })
  const { mutateAsync: updateCars, isPending: updatePending } = CarsModule.updateCarsMutation({
    onSuccess: () => {
      CarsModule.CarsCache.invalidateCars()
      router.back()
    },
  })

  const uploadImages = async () => {
    if (filesUploaded?.length > 0) {
      setImages(filesUploaded)
    }
  }

  const submitForm = async (values: TYPES.MODELS.CARS.ICreateCarDto) => {
    const formData = new FormData()

    formData.append('id', String(requestId))
    formData.append('agencyId', currentUser?.establishment?.id ?? '')
    formData.append('agencyName', String(currentUser?.establishment?.name))
    formData.append('name', values?.name)
    formData.append('brand', values?.brand)
    formData.append('model', values?.model)
    formData.append('plateNumber', values?.plateNumber)
    formData.append('doors', String(values?.doors))
    formData.append('seats', String(values?.seats))
    formData.append('transmission', values?.transmission?.[0] ?? '')
    formData.append('fuelType', values?.fuelType?.[0] ?? '')
    formData.append('discountType', TYPES.ENUM.DiscountType.PERCENTAGE)
    formData.append('discountValue', String(values?.discountValue))
    formData.append('rentalPriceDiscounted', String(values?.rentalPriceDiscounted))
    formData.append('dailyPrice', String(values?.dailyPrice))
    formData.append('status', values?.status?.[0] ?? '')
    formData.append('carCategoryId', values?.carCategoryId?.[0] ?? '')
    values?.equipmentIds?.forEach((value) => formData.append('equipmentIds', String(value)))
    images.forEach((file) => {
      formData.append('carImages', file)
    })

    if (requestId) {
      await updateCars(formData as unknown as TYPES.MODELS.CARS.ICreateCarDto)
    } else {
      await createCars(formData as unknown as TYPES.MODELS.CARS.ICreateCarDto)
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
        status: existingCarsFiles?.status && [existingCarsFiles.status],
        equipmentIds: existingCarsFiles?.equipments?.map((e: { name: string }) => e.name) ?? [],
      })
    }
  }, [requestId, existingCarsFiles])

  useEffect(() => {
    if (filesUploaded?.length > 0) {
      uploadImages().then()
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
        <Box w={'full'} mt={'30px'}>
          <Flex alignItems={'center'} justifyContent={'space-between'} flexDirection={{ base: 'column', md: 'row' }} gap={4}>
            <Stack gap={2}>
              <BaseText variant={TextVariant.H3} weight={TextWeight.Bold}>
                {!requestId ? 'Ajouter un vehicule' : 'Modifier les informations de ce vehicule'}
              </BaseText>
              <BaseText color={'fg.muted'}>Saisissez toutes les informations relatives a l'ajout de votre vehicule</BaseText>
            </Stack>

            {responsiveMode ? (
              <ActionsButton cancelTitle={'Annuler'} validateTitle={requestId ? 'Valider' : 'Ajouter'} requestId={requestId ?? ''} isLoading={createPending || updatePending} onClick={handleSubmit} />
            ) : null}
          </Flex>
          <Box alignItems={'flex-start'} justifyContent={'flex-start'} flexDirection={{ base: 'column', md: 'row' }} mt={'50px'} gap={4}>
            <Flex width={'full'} gap={8}>
              <FormContainer title={'Informations Generales'} tooltip={'Saisir les informations generales du produit'}>
                <VStack mt={10} gap={4} align="stretch" width="100%">
                  <Stack width={'full'} gap={4} direction={{ base: 'column', md: 'row' }}>
                    <FormTextInput
                      name="name"
                      label="Nom du véhicule"
                      placeholder="Ex: Mini Cooper"
                      value={values?.name}
                      isDisabled={bookingStatus === (TYPES.ENUM.CommonBookingStatus.ACTIVE ?? TYPES.ENUM.CommonBookingStatus.ACTIVE)}
                    />
                    <FormTextInput
                      name="brand"
                      label="Marque du véhicule"
                      placeholder="Ex: Toyota"
                      value={values?.brand}
                      isDisabled={bookingStatus === (TYPES.ENUM.CommonBookingStatus.ACTIVE ?? TYPES.ENUM.CommonBookingStatus.ACTIVE)}
                    />
                    <FormTextInput
                      name="model"
                      label="Modèle du véhicule"
                      placeholder="Ex: Corolla 2022"
                      value={values?.model}
                      isDisabled={bookingStatus === (TYPES.ENUM.CommonBookingStatus.ACTIVE ?? TYPES.ENUM.CommonBookingStatus.ACTIVE)}
                    />
                  </Stack>
                  <Stack width={'full'} gap={4} direction={{ base: 'column', md: 'row' }}>
                    <FormTextInput
                      name="plateNumber"
                      label="Numéro d'immatriculation"
                      placeholder="Ex: AA-123-BB"
                      value={values?.plateNumber}
                      isDisabled={bookingStatus === (TYPES.ENUM.CommonBookingStatus.ACTIVE ?? TYPES.ENUM.CommonBookingStatus.ACTIVE)}
                    />
                    <FormSelect
                      name="fuelType"
                      label="Type de carburant"
                      placeholder="Ex: Essence, Diesel, Hybride"
                      listItems={fuelList}
                      setFieldValue={setFieldValue}
                      isDisabled={bookingStatus === (TYPES.ENUM.CommonBookingStatus.ACTIVE ?? TYPES.ENUM.CommonBookingStatus.ACTIVE)}
                    />
                  </Stack>
                  <Stack width={'full'} gap={4} direction={{ base: 'column', md: 'row' }}>
                    <FormSelect
                      name="transmission"
                      label="Transmission"
                      placeholder="Ex: Manuelle, Automatique"
                      listItems={transmissionList}
                      setFieldValue={setFieldValue}
                      isDisabled={bookingStatus === (TYPES.ENUM.CommonBookingStatus.ACTIVE ?? TYPES.ENUM.CommonBookingStatus.ACTIVE)}
                    />
                    <FormTextInput
                      name="doors"
                      label="Nombre de portières"
                      placeholder="EX: 2"
                      type="number"
                      value={values?.doors}
                      isDisabled={bookingStatus === (TYPES.ENUM.CommonBookingStatus.ACTIVE ?? TYPES.ENUM.CommonBookingStatus.ACTIVE)}
                    />
                    <FormTextInput
                      name="seats"
                      label="Nombre de places"
                      placeholder="Ex: 5"
                      type="number"
                      value={values?.seats}
                      isDisabled={bookingStatus === (TYPES.ENUM.CommonBookingStatus.ACTIVE ?? TYPES.ENUM.CommonBookingStatus.ACTIVE)}
                    />
                  </Stack>
                </VStack>
              </FormContainer>
            </Flex>
            <Flex width={'full'} gap={8}>
              <FormContainer title="Tarification & Disponibilite" tooltip="Saisir les informations de tarification du produit">
                <VStack mt={10} gap={4} align="stretch" width="100%">
                  <Stack width="full" gap={4} direction={{ base: 'column', md: 'row' }}>
                    <FormTextInput
                      name="dailyPrice"
                      type="number"
                      leftAccessory={<LuBadgeDollarSign />}
                      label="Prix de location par jour"
                      placeholder="Ex: 75.00"
                      value={values?.dailyPrice}
                      isDisabled={bookingStatus === (TYPES.ENUM.CommonBookingStatus.ACTIVE ?? TYPES.ENUM.CommonBookingStatus.ACTIVE)}
                    />
                  </Stack>
                  {currentUser?.establishment?.subscription?.plan?.canUseDiscounts && <FormSwitch name="hasDiscount" label="Appliquer une remise ?" />}

                  {values?.hasDiscount && bookingStatus !== (TYPES.ENUM.CommonBookingStatus.ACTIVE || TYPES.ENUM.CommonBookingStatus.PENDING) && (
                    <Stack gap={4} direction={{ base: 'column', md: 'row' }}>
                      <FormTextInput
                        name="discountValue"
                        type="number"
                        leftAccessory={<LuBadgePercent />}
                        label="Remise (%)"
                        placeholder="Ex: 10"
                        toolTipInfo="Appliquer une remise en pourcentage sur le tarif."
                        value={values?.discountValue}
                        isDisabled={bookingStatus === (TYPES.ENUM.CommonBookingStatus.ACTIVE ?? TYPES.ENUM.CommonBookingStatus.ACTIVE)}
                      />
                      <FormTextInput
                        name="rentalPriceDiscounted"
                        type="number"
                        isDisabled
                        leftAccessory={<LuBadgeDollarSign />}
                        label="Prix final / jour"
                        placeholder="0.00"
                        toolTipInfo="Prix après application de la remise."
                        value={values?.rentalPriceDiscounted}
                      />
                    </Stack>
                  )}
                </VStack>
                <VStack mt={10} gap={4} align="stretch" width="100%">
                  <Stack alignItems={'center'} justifyContent={'center'} width={'full'} gap={4} direction={{ base: 'column', md: 'row' }}>
                    <FormTextInput name="parkingAddress" label={'Lieu de stationnement'} placeholder="Ex: Parking A" />
                    <FormSelect
                      name="carCategoryId"
                      label="Type de voiture"
                      setFieldValue={setFieldValue}
                      listItems={categoryList(categories) as ListCollection}
                      placeholder="Choisissez une categorie"
                      isDisabled={bookingStatus === (TYPES.ENUM.CommonBookingStatus.ACTIVE ?? TYPES.ENUM.CommonBookingStatus.ACTIVE)}
                    />
                  </Stack>
                  <FormSelect
                    listItems={statusList}
                    isClearable={false}
                    setFieldValue={setFieldValue}
                    name="status"
                    placeholder="Choisissez un status"
                    label="Status du vehicule"
                    isDisabled={bookingStatus === (TYPES.ENUM.CommonBookingStatus.ACTIVE ?? TYPES.ENUM.CommonBookingStatus.ACTIVE)}
                  />
                </VStack>
              </FormContainer>
              <FormContainer title={'Equipements'} tooltip={'Saisir les informations de tarification du produit'}>
                <Box mt={10} width={'fit-content'}>
                  <CheckBoxFom name="equipmentIds" items={equipmentsList(equipments)} itemsPerRow={3} />
                </Box>
              </FormContainer>
            </Flex>

            <FormContainer title={'Images'} tooltip={'Ajouter des images du produit'}>
              <CustomDragDropZone getFilesUploaded={setFilesUploaded} initialImageUrls={getCarsImages} />
            </FormContainer>
          </Box>
          {!responsiveMode && (
            <Center>
              <ActionsButton cancelTitle={'Annuler'} validateTitle={requestId ? 'Valider' : 'Ajouter'} requestId={requestId ?? ''} isLoading={createPending || updatePending} onClick={handleSubmit} />
            </Center>
          )}
          <DiscountedPriceCalculator />
        </Box>
      )}
    </Formik>
  )
}

export default AddCarsPage
