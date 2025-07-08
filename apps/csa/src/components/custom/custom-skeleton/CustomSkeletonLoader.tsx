import { Box, Flex, SimpleGrid, Stack, Table } from '@chakra-ui/react'
import { FunctionComponent, JSX } from 'react'
import { Skeleton, SkeletonCircle, SkeletonText } from '_components/ui/skeleton'
import { BaseButton, CustomSkeletonLoaderProps, LoaderType } from '_components/custom'

export const CustomSkeletonLoader: FunctionComponent<CustomSkeletonLoaderProps> = ({
  tableColumns = 1,
  tableRows = 5,
  type,
  width = '250px',
  height = '300px',
  variant = 'pulse',
  direction,
  numberOfLines = 3,
  colorButton = 'info',
}) => {
  const DefaultBlockLoader = <Skeleton height={height} variant={variant} />

  const TableLoader = (
    <Table.Root minH={height}>
      <Table.Body minH="190px">
        {Array.from({ length: Math.max(1, tableRows) }, (_, j) => (
          <Table.Row key={`StyledTr-${j}`}>
            {Array.from({ length: Math.max(1, tableColumns) }, (_, k) => (
              <Skeleton key={`StyledTd-${j}-${k}`} height="25px" variant={variant} />
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )

  const PublicProductCard = (
    <SimpleGrid columns={{ base: 2, md: 4 }} width="full">
      {Array.from({ length: 6 }, (_, i) => (
        <Box key={i} p={5} width="full">
          <Skeleton borderRadius="7px" height={height} variant={variant} />
          <Stack mt={4}>
            <SkeletonText variant={variant} noOfLines={numberOfLines} />
          </Stack>
        </Box>
      ))}
    </SimpleGrid>
  )

  const DonutChartLoader = (
    <Box height={height} width={width ?? '250px'} position="relative" p={3}>
      <SkeletonCircle width="100%" height="90%" />
      <Box position="absolute" top="45%" left="50%" transform="translate(-50%, -50%)" width="50%" height="50%" bg="white" zIndex={1} borderRadius="50%" />
    </Box>
  )

  const SkeletonTextLoader = <SkeletonText noOfLines={numberOfLines} gap={2} variant={variant} width={width} />

  const SkeletonFormLoader = <Skeleton height={height} width={width} variant={variant} />

  const SkeletonImage = <SkeletonCircle size={height} />

  const SkeletonTextImage = (
    <Flex gap={direction === 'column' ? 4 : 1} width={width} flexDir={direction} alignItems={'flex-start'}>
      <SkeletonCircle size={height} />
      <SkeletonText noOfLines={numberOfLines} variant={variant} gap={3} />
    </Flex>
  )

  const SkeletonButton = (
    <Skeleton asChild loading={true} width={width}>
      <BaseButton colorType={colorButton} />
    </Skeleton>
  )

  const renderSkeletonSwitch = (param: LoaderType): JSX.Element | null => {
    switch (param) {
      case 'DATA_TABLE':
        return TableLoader
      case 'DONUT_CHART':
        return DonutChartLoader
      case 'PRODUCT_LIST_CARD':
        return PublicProductCard
      case 'DEFAULT':
        return DefaultBlockLoader
      case 'TEXT':
        return SkeletonTextLoader
      case 'TEXT_IMAGE':
        return SkeletonTextImage
      case 'IMAGE':
        return SkeletonImage
      case 'BUTTON':
        return SkeletonButton
      case 'FORM':
        return SkeletonFormLoader
      default:
        return null
    }
  }

  return renderSkeletonSwitch(type ?? 'DEFAULT')
}
