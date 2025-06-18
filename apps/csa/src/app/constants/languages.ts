import { createListCollection } from '@chakra-ui/react'

export const listLanguages = ['fr', 'en', 'it']

export const selectLanguages = (t: any) => {
  return createListCollection({
    items: listLanguages.map((lang) => ({
      label: t(`COMMON.${lang}`),
      value: lang,
    })),
  })
}
