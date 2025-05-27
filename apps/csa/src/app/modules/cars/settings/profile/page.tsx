'use client'
import { Flex, HStack, Stack, VStack, For } from '@chakra-ui/react'
import { BaseButton, BaseText, BoxContainer, FormSelect, FormSwitch, FormTextInput, TextVariant } from '_components/custom'
import { FormGroupColorPicker } from '_components/custom/form/FormGroupColorPicker'
import { Avatar } from '_components/ui/avatar'
import { selectLanguages } from '_constants/languages'
import { selectTimeZones } from '_utils/getTimeZones'
import { Formik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CiUser } from 'react-icons/ci'
import { HiOutlineMail } from 'react-icons/hi'
import { CommonModule } from 'rental-platform-state'
import { calendarStartDays, dateFormats, timeFormats } from '../../constants/settings-options'
import { Radio, RadioGroup } from '_components/ui/radio'
import { ProfileForm } from './components/ProfileForm'

const ProfilePage = () => {
  const { t, i18n } = useTranslation()
  const { data: currentUser } = CommonModule.UserModule.userInfoQueries({
    payload: {
      userId: '',
    },
    queryOptions: {
      enabled: false,
    },
  })

  return (
    <BoxContainer title="SIDE_BAR.SETTINGS" border={'none'} p={4}>
      <Formik
        enableReinitialize
        initialValues={{
          name: currentUser?.name,
          fullName: currentUser?.firstName,
          email: currentUser?.email,
          newPassword: '',
          enable2FA: false,
          currentLanguage: [i18n.language],
          timezone: [Intl.DateTimeFormat().resolvedOptions().timeZone],
          calendarStartDay: '1',
          timeFormat: '24h',
          dateFormat: 'yyyy-mm-dd',
        }}
        onSubmit={() => console.log('submit')}
      >
        {({ values, handleSubmit, setFieldValue, dirty }) => (
          <VStack gap={10} alignItems={'flex-start'}>
            <ProfileForm title="SIDE_BAR.PROFILE" description="Your personal information and account security settings">
              <Stack alignItems={'flex-start'} mb={5}>
                <BaseText variant={TextVariant.S}>Avatar</BaseText>
                <Avatar name={currentUser?.name + '' + currentUser?.firstName} size={'2xl'} boxSize={'100px'} color={'white'} bgColor={'rebeccapurple'} />
                <BaseText variant={TextVariant.S} textTransform={'capitalize'}>
                  {currentUser?.name + ' ' + currentUser?.firstName}
                </BaseText>
              </Stack>
              <VStack gap={4} alignItems={'flex-start'} mt={10}>
                <HStack width={'full'} gap={4}>
                  <FormTextInput name="name" label="Name" placeholder="" value={values?.fullName} leftAccessory={<CiUser />} />
                  <FormTextInput name="fullName" label="First name" placeholder="" value={values?.fullName} leftAccessory={<CiUser />} />
                </HStack>
                <FormTextInput name="email" label="Email" placeholder="" type="email" value={values?.email} leftAccessory={<HiOutlineMail />} />
                <FormTextInput name="newPassword" label="Password" placeholder="Enter new password" type="password" value={values?.newPassword} />
              </VStack>
            </ProfileForm>

            <ProfileForm
              title="Two-factor authentication (2FA){enabled}"
              description="Keep your account secure by enabling 2FA via SMS or using a temporary one-time passcode (TOTP) from an authenticator app."
            >
              <FormSwitch name="enable2FA" label="Authenticator App (TOTP)" description="Use an app to receive a temporary one-time passcode each time you log in." />
            </ProfileForm>
            <ProfileForm title="Theme colors" description="Choose a preferred theme for the app">
              <FormGroupColorPicker />
            </ProfileForm>
            <ProfileForm title="Langue et region" description="Customize your language and region">
              <VStack width={{ base: '100%', md: 'full' }} alignItems={'flex-start'} gap={4}>
                <FormSelect name="currentLanguage" label="Language" setFieldValue={setFieldValue} listItems={selectLanguages()} />
                <FormSelect name="timezone" label="Timezone" setFieldValue={setFieldValue} listItems={selectTimeZones()} />
              </VStack>
            </ProfileForm>
            <ProfileForm title="Time and date format" description="Select the way times & dates are displayed">
              <VStack alignItems={'flex-start'} gap={8}>
                <VStack alignItems={'flex-start'}>
                  <BaseText variant={TextVariant.S}>Start of the calendar</BaseText>
                  <VStack alignItems={'flex-start'} gap={3} mt={2}>
                    <For each={calendarStartDays}>
                      {(item, i) => (
                        <RadioGroup size={'sm'} value={values?.calendarStartDay} onValueChange={(val) => setFieldValue('calendarStartDay', val)}>
                          <Radio value={item.value}>{item.label}</Radio>
                        </RadioGroup>
                      )}
                    </For>
                  </VStack>
                </VStack>

                <VStack alignItems={'flex-start'}>
                  <BaseText variant={TextVariant.S}>Time format</BaseText>
                  <VStack alignItems={'flex-start'} gap={3} mt={2}>
                    <For each={timeFormats}>
                      {(item, i) => (
                        <RadioGroup key={i} size={'sm'} value={values?.timeFormat} onValueChange={(val) => setFieldValue('timeFormat', val)}>
                          <Radio value={item.value}>{item.label}</Radio>
                        </RadioGroup>
                      )}
                    </For>
                  </VStack>
                </VStack>

                <VStack alignItems={'flex-start'}>
                  <BaseText variant={TextVariant.S}>Date format</BaseText>
                  <VStack alignItems={'flex-start'} gap={3} mt={2}>
                    <For each={dateFormats}>
                      {(item, i) => (
                        <RadioGroup size={'sm'} key={i} value={values?.dateFormat} onValueChange={(val) => setFieldValue('dateFormat', val)}>
                          <Radio value={item.value}>{item.label}</Radio>
                        </RadioGroup>
                      )}
                    </For>
                  </VStack>
                </VStack>
              </VStack>
            </ProfileForm>

            <ProfileForm title="Danger zone" description="Proced with caution">
              <Flex alignItems={'flex-start'} justifyContent={'space-between'} flexDir={{ base: 'column', md: 'row' }}>
                <BaseText variant={TextVariant.S}>Log out all sessions including any session on mobile, iPad, and other browsers</BaseText>
                <VStack gap={4}>
                  <BaseButton borderColor={'gray.400'} colorType={'none'}>
                    {'Log out of all sessions'}
                  </BaseButton>
                  <BaseButton withGradient colorType={'danger'}>
                    Delete account
                  </BaseButton>
                </VStack>
              </Flex>
            </ProfileForm>

            <BaseButton disabled={!dirty} colorType={'success'} onClick={() => handleSubmit()}>
              Save changes
            </BaseButton>
          </VStack>
        )}
      </Formik>
    </BoxContainer>
  )
}

export default ProfilePage
