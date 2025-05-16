'use client'

import { Box, Flex, VStack, useBreakpointValue, Center, ListCollection, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormTextInput, FormSelect, CustomDragDropZone, ActionsButton, BaseText, CheckBoxFom, FormSwitch, TextVariant, TextWeight } from '_components/custom'
import { Formik } from 'formik'
import { LuBadgeDollarSign, LuBadgePercent } from 'react-icons/lu'
import { CarsModule, UserModule } from 'platform-state-management'
import { TYPES, UTILS } from 'rental-platform-shared-lib'
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

  const uploadImages = async () => {
    if (filesUploaded?.length > 0) {
      setImages(filesUploaded)
    }
  }

  const currentUser = UserModule.UserCache.getUser()
  const carsCache = CarsModule.CarsCache.getCars()
  const { data: categories } = CarsModule.getCarsCategoriesQueries({})
  const { data: equipments } = CarsModule.getCarsEquipmentsQueries({})
  const { mutateAsync: createCars, isPending: createPending } = CarsModule.createCarsMutation({
    onSuccess: () => {
      CarsModule.CarsCache.invalidateCars()
      router.back()
    },
  })
  //   const { mutateAsync: updateCars, isPending } = CarsModule.updateCarsMutation({
  //     onSuccess: () => {
  //       CarsModule.CarsCache.invalidatePrivateCars()
  //       router.back()
  //     },
  //   })

  const existingCarsFiles = UTILS.findDynamicIdInList(requestId ?? '', carsCache)

  const submitForm = async (values: TYPES.MODELS.CARS.ICreateCarDto) => {
    const formData = new FormData()

    // Champs texte
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
      formData.append('carImages', file) // `carImages` correspond au nom dans @UploadedFiles()
    })

    // Envoi avec Axios ou ton ApiService
    if (requestId) {
      // await updateCars({ id: requestId, ...requestData }) // pour multipart, tu devrais adapter aussi cette méthode si tu veux update
    } else {
      await createCars(formData as unknown as TYPES.MODELS.CARS.ICreateCarDto) // doit accepter un FormData
    }
  }

  useEffect(() => {
    if (requestId && existingCarsFiles) {
      setGetCarsImages(existingCarsFiles?.Cars?.images)
      // setInitialValues({
      //   ...existingCarsFiles,
      //  // name: existingCarsFiles?.Cars?.name,
      //   categoryName: [existingCarsFiles?.categoryName],
      //   status: [existingCarsFiles.status],
      // })
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
          <BaseText>{JSON.stringify(values)}</BaseText>
          <Flex alignItems={'center'} justifyContent={'space-between'} flexDirection={{ base: 'column', md: 'row' }} gap={4}>
            <Stack gap={2}>
              <BaseText variant={TextVariant.H3} weight={TextWeight.Bold}>
                {!requestId ? 'Ajouter un vehicule' : 'Modifier les informations de ce vehicule'}
              </BaseText>
              <BaseText color={'fg.muted'}>Saisissez toutes les informations relatives a l'ajout de votre vehicule</BaseText>
            </Stack>

            {responsiveMode ? (
              <ActionsButton cancelTitle={'Annuler'} validateTitle={requestId ? 'Valider' : 'Ajouter'} requestId={requestId ?? ''} isLoading={createPending} onClick={handleSubmit} />
            ) : null}
          </Flex>
          <Box alignItems={'flex-start'} justifyContent={'flex-start'} flexDirection={{ base: 'column', md: 'row' }} mt={'50px'} gap={4}>
            <Flex width={'full'} gap={8}>
              <FormContainer title={'Informations Generales'} tooltip={'Saisir les informations generales du produit'}>
                <VStack mt={10} gap={4} align="stretch" width="100%">
                  <Stack width={'full'} gap={4} direction={{ base: 'column', md: 'row' }}>
                    <FormTextInput name="name" label="Nom du véhicule" placeholder="Ex: Mini Cooper" />
                    <FormTextInput name="brand" label="Marque du véhicule" placeholder="Ex: Toyota" />
                    <FormTextInput name="model" label="Modèle du véhicule" placeholder="Ex: Corolla 2022" />
                  </Stack>
                  <Stack width={'full'} gap={4} direction={{ base: 'column', md: 'row' }}>
                    <FormTextInput name="plateNumber" label="Numéro d'immatriculation" placeholder="Ex: AA-123-BB" />
                    <FormSelect name="fuelType" label="Type de carburant" placeholder="Ex: Essence, Diesel, Hybride" listItems={fuelList} setFieldValue={setFieldValue} />
                  </Stack>
                  <Stack width={'full'} gap={4} direction={{ base: 'column', md: 'row' }}>
                    <FormSelect name="transmission" label="Transmission" placeholder="Ex: Manuelle, Automatique" listItems={transmissionList} setFieldValue={setFieldValue} />
                    <FormTextInput name="doors" label="Nombre de portières" placeholder="EX: 2" type="number" />
                    <FormTextInput name="seats" label="Nombre de places" placeholder="Ex: 5" type="number" />
                  </Stack>
                </VStack>
              </FormContainer>
            </Flex>
            <Flex width={'full'} gap={8}>
              <FormContainer title="Tarification & Disponibilite" tooltip="Saisir les informations de tarification du produit">
                <VStack mt={10} gap={4} align="stretch" width="100%">
                  <Stack width="full" gap={4} direction={{ base: 'column', md: 'row' }}>
                    <FormTextInput name="dailyPrice" type="number" leftAccessory={<LuBadgeDollarSign />} label="Prix de location par jour" placeholder="Ex: 75.00" />
                  </Stack>
                  <FormSwitch name="hasDiscount" label="Appliquer une remise ?" />
                  {values?.hasDiscount && (
                    <Stack gap={4} direction={{ base: 'column', md: 'row' }}>
                      <FormTextInput
                        name="discountValue"
                        type="number"
                        leftAccessory={<LuBadgePercent />}
                        label="Remise (%)"
                        placeholder="Ex: 10"
                        toolTipInfo="Appliquer une remise en pourcentage sur le tarif."
                      />
                      <FormTextInput
                        name="rentalPriceDiscounted"
                        type="number"
                        isDisabled
                        leftAccessory={<LuBadgeDollarSign />}
                        label="Prix final / jour"
                        placeholder="0.00"
                        toolTipInfo="Prix après application de la remise."
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
                    />
                  </Stack>
                  <FormSelect listItems={statusList} isClearable={false} setFieldValue={setFieldValue} name="status" placeholder="Choisissez un status" label="Status du vehicule" />
                </VStack>
              </FormContainer>
              <FormContainer title={'Equipements'} tooltip={'Saisir les informations de tarification du produit'}>
                <Box mt={10} width={'fit-content'}>
                  <CheckBoxFom name="equipmentIds" items={equipmentsList(equipments)} itemsPerRow={3} />
                </Box>
              </FormContainer>
            </Flex>

            <FormContainer title={'Images'} tooltip={'Ajouter des images du produit'}>
              <CustomDragDropZone getFilesUploaded={setFilesUploaded} />
            </FormContainer>
          </Box>
          {!responsiveMode && (
            <Center>
              <ActionsButton cancelTitle={'annuler'} validateTitle={requestId ? 'Valider' : 'Ajouter'} requestId={requestId ?? ''} isLoading={false} onClick={handleSubmit} />
            </Center>
          )}
          <DiscountedPriceCalculator />
        </Box>
      )}
    </Formik>
  )
}

export default AddCarsPage
