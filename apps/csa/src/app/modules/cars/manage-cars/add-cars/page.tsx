'use client'

import { Box, Flex, Heading, Separator, VStack, Text, createListCollection, useBreakpointValue, Center, ListCollection, CheckboxGroup, Checkbox, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormTextInput, FormTextArea, FormSelect, CustomDragDropZone, ActionsButton, BaseButton, BaseText, ImageRatio, CheckBoxFom, FormSwitch, FormColorPicker } from '_components/custom'
import { FieldArray, Formik } from 'formik'
import { LuBadgeDollarSign, LuBadgePercent } from 'react-icons/lu'
//import { ProductContainer } from '../components/ProductContainer'
import { APP_ROUTES } from '_config/routes'
import { CarsModule } from 'platform-state-management'
import { TYPES, UTILS } from 'platform-shared'
import { GiCancel } from 'react-icons/gi'
import { ProductContainer } from './ProductContainer'
//import { ProfitCalculator } from '_hooks/profit-calculator'

const AddProductPage = () => {
  const router = useRouter()
  const requestId = useSearchParams()?.get('requestId')
  const responsiveMode = useBreakpointValue({ base: false, md: true })
  //   const [initialValues, setInitialValues] = useState(TYPES.VALIDATION_SCHEMA.PRODUCTS_SCHEMA.initialProductValues)
  //   const currentUser = UsersModule.UserCache.getUser()
  //   const privateProducts = ProductModule.ProductCache.getPrivateProduct()

  //   const { mutateAsync: createProduct, isPending: createPending } = ProductModule.createProductMutation({
  //     onSuccess: () => {
  //       ProductModule.ProductCache.invalidatePrivateProduct()
  //       router.back()
  //     },
  //   })
  //   const { mutateAsync: updateProduct, isPending } = ProductModule.updateProductMutation({
  //     onSuccess: () => {
  //       ProductModule.ProductCache.invalidatePrivateProduct()
  //       router.back()
  //     },
  //   })
  //   const { data: categories } = ProductModule.getCategories({})
  //   const [images, setImages] = useState<string[]>([])
  //   const [getProductImages, setGetProductImages] = useState<string[]>([])
  //   const [filesUploaded, setFilesUploaded] = useState<File[]>([])

  //   const existingProductFiles = UTILS.findDynamicIdInList(requestId ?? '', privateProducts)

  //   const fetchBase64Images = async () => {
  //     if (filesUploaded?.length > 0) {
  //       const base64Images = await Promise.all(filesUploaded?.map((file) => UTILS.fileToBase64(file)))
  //       setImages(base64Images)
  //     }
  //   }

  //   const submitForm = async (values: TYPES.MODELS.PRODUCTS.ICreateProduct) => {
  //     const requestData: TYPES.MODELS.PRODUCTS.ICreateProduct = {
  //       name: values?.name,
  //       description: values?.description,
  //       price: values?.price,
  //       stock: values?.stock,
  //       articlePrice: parseFloat(`${values?.articlePrice}`),
  //       profit: parseFloat(`${values?.profit}`),
  //       profitMargin: parseFloat(`${values?.profitMargin}`),
  //       categoryName: values?.categoryName && values?.categoryName[0],
  //       variants:
  //         values?.variants &&
  //         values?.variants?.map((variant: any) => ({
  //           name: variant.name,
  //           variantValue: variant.value,
  //         })),
  //       status: values?.status && values?.status[0],
  //       images,
  //       storeId: currentUser?.store?.id ?? '',
  //     }
  //     if (requestId) {
  //       await updateProduct({ id: requestId, ...requestData })
  //     } else {
  //       await createProduct(requestData)
  //     }
  //   }

  //   useEffect(() => {
  //     if (filesUploaded?.length > 0) {
  //       fetchBase64Images()
  //     }
  //   }, [filesUploaded?.length])

  //   useEffect(() => {
  //     if (requestId && existingProductFiles) {
  //       setGetProductImages(existingProductFiles?.product?.images)
  //       setInitialValues({
  //         ...existingProductFiles,
  //         name: existingProductFiles?.product?.name,
  //         variants: existingProductFiles?.product?.variants?.map((item: { name: string; variantValue: string }) => ({
  //           name: item?.name,
  //           value: item?.variantValue,
  //         })),
  //         categoryName: [existingProductFiles?.categoryName],
  //         status: [existingProductFiles.status],
  //       })
  //     }
  //   }, [requestId, existingProductFiles])

  const values = [{ name: 'Electronics' }, { name: 'Clothing' }]
  const categoryList: any = createListCollection({
    items:
      values?.map((item) => ({
        label: item.name,
        value: item?.name,
      })) || [],
  })

  const equipmentOptions = [
    { name: 'GPS intégré', value: 'gps' },
    { name: 'Climatisation', value: 'climatisation' },
    { name: 'Bluetooth', value: 'bluetooth' },
    { name: 'Caméra de recul', value: 'camera_recul' },
    { name: 'Radar de stationnement', value: 'radar_stationnement' },
    { name: 'Régulateur de vitesse', value: 'regulateur_vitesse' },
    { name: 'Sièges chauffants', value: 'sieges_chauffants' },
    { name: 'Connecteur USB', value: 'usb' },
    { name: 'Apple CarPlay / Android Auto', value: 'carplay_androidauto' },
    { name: 'Système audio premium', value: 'audio_premium' },
    { name: 'Toit ouvrant', value: 'toit_ouvrant' },
    { name: 'Verrouillage centralisé', value: 'verrouillage' },
    { name: 'Vitres électriques', value: 'vitres_electriques' },
    { name: 'Antidémarrage électronique', value: 'antidemarrage' },
    { name: 'Détecteur d’angle mort', value: 'angle_mort' },
    { name: 'Aide au maintien de voie', value: 'aide_maintien_voie' },
    { name: 'Freinage automatique d’urgence', value: 'freinage_urgence' },
    { name: 'Roue de secours', value: 'roue_secours' },
    { name: 'Kit de sécurité (triangle, gilet...)', value: 'kit_securite' },
    { name: 'Support pour smartphone', value: 'support_tel' },
  ]

  return (
    <Formik enableReinitialize initialValues={{ equipements: [], hasDiscount: false, color: '#000' }} onSubmit={() => {}}>
      {({ values, setFieldValue, handleSubmit }) => (
        <Box w={'full'} mt={'30px'}>
          <BaseText>{JSON.stringify(values)}</BaseText>
          <Flex alignItems={'center'} justifyContent={'space-between'} flexDirection={{ base: 'column', md: 'row' }} gap={4}>
            <Stack gap={2}>
              <Heading>{!requestId ? 'Ajouter un vehicule' : 'Modifier les informations de ce vehicule'}</Heading>
              <Text color={'gray.400'}>Saisissez toutes les informations relatives a l'ajout de votre vehicule</Text>
            </Stack>

            {responsiveMode ? (
              <ActionsButton
                cancelTitle={'Annuler'}
                goBackUrl={'/'}
                validateTitle={requestId ? 'Valider' : 'Ajouter'}
                requestId={requestId ?? ''}
                //isLoading={isPending || createPending}
                onClick={handleSubmit}
              />
            ) : null}
          </Flex>
          <Flex alignItems={'flex-start'} justifyContent={'flex-start'} flexDirection={{ base: 'column', md: 'row' }} mt={'50px'} gap={4}>
            <VStack alignItems={'flex-start'} gap={8} width={'full'}>
              <ProductContainer title={'Informations Generales'} tooltip={'Saisir les informations generales du produit'}>
                <VStack mt={10} gap={4} align="stretch" width="100%">
                  <Stack width={'full'} gap={4} direction={{ base: 'column', md: 'row' }}>
                    <FormTextInput name="brand" label="Marque du véhicule" placeholder="Ex: Toyota" />
                    <FormTextInput name="model" label="Modèle du véhicule" placeholder="Ex: Corolla 2022" />
                  </Stack>
                  <Stack width={'full'} gap={4} direction={{ base: 'column', md: 'row' }}>
                    <FormTextInput name="registrationNumber" label="Numéro d'immatriculation" placeholder="Ex: AA-123-BB" />
                    <FormTextInput name="fuelType" label="Type de carburant" placeholder="Ex: Essence, Diesel, Hybride" />
                  </Stack>
                  <Stack width={'full'} gap={4} direction={{ base: 'column', md: 'row' }}>
                    <FormTextInput name="transmission" label="Transmission" placeholder="Ex: Manuelle, Automatique" />
                    <FormColorPicker name="color" label="Couleur de la voiture" value={values?.color} />
                  </Stack>
                  <FormTextArea
                    name={'description'}
                    label={'Description'}
                    placeholder={'Saisissez la description du produit ici...'}
                    onChangeFunction={(e: any) => setFieldValue('description', e.target.value)}
                  />
                </VStack>
              </ProductContainer>
              <ProductContainer title="Tarification" tooltip="Saisir les informations de tarification du produit">
                <VStack mt={10} gap={4} align="stretch" width="100%">
                  <Stack width="full" gap={4} direction={{ base: 'column', md: 'row' }}>
                    <FormTextInput name="rentalPricePerDay" type="number" leftAccessory={<LuBadgeDollarSign />} label="Prix de location par jour" placeholder="Ex: 75.00" />
                    <FormTextInput name="rentalPricePerWeek" type="number" leftAccessory={<LuBadgeDollarSign />} label="Prix de location par semaine" placeholder="Ex: 480.00" />
                  </Stack>

                  <FormSwitch name="hasDiscount" label="Appliquer une remise ?" />

                  {values.hasDiscount && (
                    <Stack gap={4} direction={{ base: 'column', md: 'row' }}>
                      <FormTextInput
                        name="discount"
                        type="number"
                        leftAccessory={<LuBadgePercent />}
                        label="Remise (%)"
                        placeholder="Ex: 10"
                        toolTipInfo="Appliquer une remise en pourcentage sur le tarif."
                      />

                      <FormTextInput
                        name="finalRentalPricePerDay"
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
              </ProductContainer>

              <ProductContainer title={'Disponibilite'} tooltip={'Saisir les informations de tarification du produit'}>
                <VStack mt={10} gap={4} align="stretch" width="100%">
                  <Stack width={'full'} gap={4} direction={{ base: 'column', md: 'row' }}>
                    <FormTextInput name="stock" label={'Lieu de stationnement'} placeholder="Ex: Parking A" />
                  </Stack>
                  <FormSelect name="categoryName" setFieldValue={setFieldValue} listItems={categoryList} placeholder="Choisissez une categorie" />
                  <FormSelect listItems={categoryList} isClearable={false} setFieldValue={setFieldValue} name="status" placeholder="Choisissez un status" />
                </VStack>
              </ProductContainer>
              <ProductContainer title={'Documents'} tooltip={'Saisir les informations de tarification du produit'}>
                <VStack mt={10} gap={4} align="stretch" width="100%">
                  <FormTextInput name="insurancePolicyNumber" label="Numéro de police d’assurance" placeholder="Ex: 123456789" />
                  <FormTextInput name="technicalInspectionDate" label="Date du dernier contrôle technique" placeholder="Ex: 2025-01-15" />
                  <FormTextInput name="registrationCertificateNumber" label="Numéro du certificat d'immatriculation" placeholder="Ex: Z123456789" />
                </VStack>
              </ProductContainer>
            </VStack>
            <VStack alignItems={'flex-start'} gap={8} width={{ base: '100%', md: '1/2' }}>
              <ProductContainer title={'Images'} tooltip={'Ajouter des images du produit'}>
                <CustomDragDropZone getFilesUploaded={() => {}} base64Images={[]} />
              </ProductContainer>
              <Box bgColor={'red.300'} width={'full'} borderRadius={'7px'}>
                <ImageRatio
                  image={
                    'https://th.bing.com/th/id/R.4e7acec211a711b2669d91a771c0b4ca?rik=1ij3ke4tcnxHcQ&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f08%2fFree-Cars-Full-HD-Images-1080p.jpg&ehk=IN1J%2f8CvnnGiJh698L6AgrSF8jq83lL9DMc9lb6t3TA%3d&risl=&pid=ImgRaw&r=0'
                  }
                />
              </Box>
              <ProductContainer title={'Equipements'} tooltip={'Saisir les informations de tarification du produit'}>
                <Stack mt={10} width={'full'}>
                  <CheckBoxFom name="equipements" items={equipmentOptions} />
                </Stack>
              </ProductContainer>
            </VStack>
          </Flex>

          {!responsiveMode && (
            <Center>
              <ActionsButton cancelTitle={'annuler'} goBackUrl={'/'} validateTitle={requestId ? 'Valider' : 'Ajouter'} requestId={requestId ?? ''} isLoading={false} onClick={handleSubmit} />
            </Center>
          )}
          {/* <ProfitCalculator /> */}
        </Box>
      )}
    </Formik>
  )
}

export default AddProductPage
