'use client'

import { Icon } from '@chakra-ui/react'
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from '_components/ui/accordion'
import React, { FC, useState } from 'react'
import { AccordionProps } from '_components/custom'

export const CustomAccordion: FC<AccordionProps> = ({ items, ...rest }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  return (
    <AccordionRoot
      collapsible
      width={'full'}
      variant={'plain'}
      defaultValue={[items[currentIndex]?.label]}
      value={[items[currentIndex]?.label]}
      onValueChange={(details: { value: string[] }) => {
        const index = items?.findIndex((item) => item?.label === details.value[0])
        setCurrentIndex(index)
      }}
      {...rest}
    >
      {items.map((item, index) => (
        <AccordionItem key={index} value={item.label}>
          <AccordionItemTrigger mb={4}>
            {item?.icon && (
              <Icon fontSize="lg" color="fg.subtle">
                {item.icon}
              </Icon>
            )}
            {item.label}
          </AccordionItemTrigger>
          <AccordionItemContent>{item.content}</AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  )
}
