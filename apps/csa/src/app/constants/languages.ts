import { createListCollection } from '@chakra-ui/react'

export const listLanguages = ['fr', 'en', 'it']

export const selectLanguages = () => {
  return createListCollection({
    items: listLanguages.map((lang) => ({
      label: lang,
      value: lang,
    })),
  })
}
