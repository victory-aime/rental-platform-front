import { Box, Circle, Flex, Float, For, Separator, SimpleGrid, useBreakpointValue, VStack } from '@chakra-ui/react'
import { BaseBadge, BaseButton, ImageRatio, PaginationDataTable, PaginationProps } from '_components/custom'
import { BaseText, TextVariant, TextWeight } from '_components/custom/base-text'
import NoDataFound from '_components/custom/no-data-found/NoDataFound'
import { useRouter } from 'next/navigation'
import React, { FC, useState } from 'react'
import { GoTrash } from 'react-icons/go'
import { AiFillHeart } from 'react-icons/ai'

interface CarsListProps extends PaginationProps {
  cars: any[]
  initialPage?: number
  hidePagination?: boolean
  table?: any
  showDeleteButton?: boolean
  onDeleteButton?: (value: any) => void
}

export const CarsDataContainer: FC<CarsListProps> = ({ cars, initialPage = 1, hidePagination = false, totalItems, pageSize = 5, lazy = false, showDeleteButton = false, onDeleteButton }) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage)
  const router = useRouter()
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: 'asc' | 'desc'
  } | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const isMobile = useBreakpointValue({ base: true, sm: false, lg: false })

  const sortedData =
    Array.isArray(cars) && cars.length > 0
      ? [...cars].sort((a, b) => {
          if (!sortConfig) return 0
          const { key, direction } = sortConfig
          return direction === 'asc' ? (a[key] > b[key] ? 1 : -1) : a[key] < b[key] ? 1 : -1
        })
      : []

  const paginatedItems = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <Box width={'full'}>
      {paginatedItems?.length !== 0 ? (
        <SimpleGrid columns={{ base: 2, md: 2 }} gap={10} width={'full'}>
          <For each={paginatedItems}>
            {(item, index) => (
              <Box key={index} width={'full'} cursor={'pointer'} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
                <Flex width={'full'} bgColor={'red.200'} gap={2}>
                  <Box width={'1/2'} position={'relative'}>
                    <ImageRatio
                      image={item?.images[0]}
                      style={{
                        borderRadius: '7px',
                        transform: `${isMobile || hoveredIndex === index ? 'scale(1.05)' : 'scale(1)'}`,
                        transition: 'transform 0.3s',
                      }}
                    />
                  </Box>
                  <Flex width={'full'} bgColor={'yellow'}>
                    <VStack width={'full'} gap={4} alignItems={'flex-start'} bgColor={'pink.900'}>
                      <BaseText variant={TextVariant.H2} weight={TextWeight.Bold} textTransform={'capitalize'} truncate>
                        {item?.name}
                      </BaseText>

                      <Flex width={'full'} alignItems={'center'} justifyContent={'space-between'} gap={4}>
                        <SimpleGrid columns={2} gap={3} width={'full'}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Flex key={i} alignItems={'center'} gap={2} p={1} bgColor={'white'} width={'full'}>
                              <AiFillHeart />
                              <BaseText variant={TextVariant.L} weight={TextWeight.Black} color="blue.500">
                                ${item?.price}
                              </BaseText>
                            </Flex>
                          ))}
                        </SimpleGrid>
                      </Flex>
                      <Separator colorPalette={'blue'} />
                    </VStack>
                  </Flex>
                </Flex>
              </Box>
            )}
          </For>
        </SimpleGrid>
      ) : (
        <NoDataFound />
      )}

      {!hidePagination && (
        <PaginationDataTable
          table={{
            setPageIndex: (index: number) => setCurrentPage(index + 1),
          }}
          totalItems={totalItems!}
          pageSize={pageSize}
          currentPage={currentPage}
          lazy={lazy}
          onLazyLoad={(index: React.SetStateAction<number>) => setCurrentPage(index)}
        />
      )}
    </Box>
  )
}
