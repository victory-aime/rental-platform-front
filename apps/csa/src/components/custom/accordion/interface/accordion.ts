import { AccordionRootProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface AccordionProps extends AccordionRootProps {
  items: {
    label: string
    icon: ReactNode
    content: ReactNode | string | any
  }[]
}

export type { AccordionProps }
