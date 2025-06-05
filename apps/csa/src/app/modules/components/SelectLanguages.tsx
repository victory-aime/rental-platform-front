import { Flex, For, VStack } from '@chakra-ui/react'
import { BaseText, CustomToast, ModalComponent, ModalOpenProps, TextVariant, ToastStatus } from '_components/custom'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StorageKey } from '_constants/StorageKeys'
import { ImFlag } from 'react-icons/im'
import { VariablesColors } from '_theme/variables'
import { FlagImagesIcon } from './flag/FlagImages'
import { FlagKeys } from '_assets/images/flag'
import { hexToRGB } from '_theme/colors'
import { listLanguages } from '_constants/languages'

export const SelectLanguages: FC<ModalOpenProps> = ({ onChange, isOpen }) => {
  const { t, i18n } = useTranslation()
  const [selectLanguage, setSelectLanguage] = useState(i18n.language)
  const [fallbackLoad, setFallbackLoad] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)

  const handleChangeLanguage = async (lang: string) => {
    if (lang === i18n.language || loading) return
    setFallbackLoad(true)
    setSelectLanguage(lang)
    setLoading(true)

    setTimeout(async () => {
      try {
        await i18n.changeLanguage(lang)
        localStorage.setItem(StorageKey.LANGUAGE, lang)
        CustomToast({ description: t('PROFILE.PREFERRED_LANGUAGE') })
        onChange?.(!isOpen)
      } catch (error) {
        CustomToast({ description: t('PROFILE.ERROR_LANGUAGE'), type: ToastStatus.ERROR })
      } finally {
        setFallbackLoad(false)
        setLoading(false)
      }
    }, 1000)
  }

  return (
    <ModalComponent iconBackgroundColor={hexToRGB('lighter', 0.6)} icon={<ImFlag color={VariablesColors.grayScale} />} open={isOpen} title={'SELECT_LANGUAGES'} onChange={onChange}>
      <VStack gap={5} alignItems={'flex-start'}>
        <BaseText variant={TextVariant.XS}>{t('SELECT_LANGUAGES_DESC')}</BaseText>
        <Flex gap={6} mt={6} width="full" alignItems="center" justifyContent="center" pointerEvents={loading ? 'none' : 'auto'} opacity={loading ? 0.6 : 1}>
          <For each={listLanguages}>
            {(language, i) => (
              <Flex
                key={i}
                alignItems="center"
                justifyContent="center"
                padding={4}
                borderWidth={2}
                borderColor={selectLanguage === language ? VariablesColors.green : hexToRGB('lighter', 0.6)}
                boxShadow={selectLanguage === language ? 'lg' : 'none'}
                borderTopRightRadius="20px"
                borderBottomLeftRadius="20px"
                cursor="pointer"
                onClick={() => handleChangeLanguage(language)}
              >
                <FlagImagesIcon isLoading={fallbackLoad && selectLanguage === language} countryImage={language?.toUpperCase() as FlagKeys} style={{ width: '30px', height: '30px' }} />
              </Flex>
            )}
          </For>
        </Flex>
      </VStack>
    </ModalComponent>
  )
}
