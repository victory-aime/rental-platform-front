'use client'
import { ActionBar, Box, Center, CloseButton, Flex, Table } from '@chakra-ui/react'
import React, { useEffect, useState, FC } from 'react'
import { Checkbox } from '_components/ui/checkbox'
import { ActionBarRoot, ActionBarContent, ActionBarSelectionTrigger, ActionBarSeparator } from '_components/ui/action-bar'
import { TableProps, PaginationDataTable, BaseButton } from '_components/custom'
import { ActionButtons } from './ActionButtons'
import { NoDataFoundLottieAnimation } from '_lottie/animations/LottieAnimation'
import { CustomSkeletonLoader } from '_components/custom'
import { BaseText, TextVariant } from '../base-text'
import { useTranslation } from 'react-i18next'

export const DataTableContainer: FC<TableProps> = ({
  data,
  columns,
  handleRowSelection,
  handleDeleteActionBar,
  handleShareActionBar,
  minH = '10rem',
  hidePagination = false,
  isLoading,
  totalItems,
  initialPage = 1,
  pageSize = 5,
  lazy = false,
  animationType = 'folder',
}) => {
  const { t } = useTranslation()
  const [selection, setSelection] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState<number>(initialPage)
  const [openActionBar, setOpenActionBar] = useState<boolean>(false)
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: 'asc' | 'desc'
  } | null>(null)

  const hasSelection = selection.length > 0
  const indeterminate = hasSelection && selection.length < data.length

  const sortedData =
    Array.isArray(data) && data.length > 0
      ? [...data].sort((a, b) => {
          if (!sortConfig) return 0
          const { key, direction } = sortConfig
          return direction === 'asc' ? (a[key] > b[key] ? 1 : -1) : a[key] < b[key] ? 1 : -1
        })
      : []

  const paginatedItems = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handleSelectAll = (checked: boolean) => {
    setSelection(checked ? data.map((item) => item.id) : [])
  }

  useEffect(() => {
    handleRowSelection?.(data.filter((item) => selection.includes(item.id)))
    setOpenActionBar(selection.length > 0)
  }, [selection, data, openActionBar])

  if (isLoading) {
    return <CustomSkeletonLoader type={'DATA_TABLE'} />
  }

  const renderNodataAnimation = () => {
    switch (animationType) {
      case 'trash':
        return (
          <Center flexDir={'column'} gap={4}>
            <Flex alignItems={'center'} justifyContent={'center'} width={'1/2'} mt={20}>
              {/*<TrashLottieAnimationV2 />*/}
            </Flex>
            <BaseText variant={TextVariant.M}>{t('COMMON.NO_DATA')}</BaseText>
          </Center>
        )
      case 'folder':
        return (
          <Center flexDir={'column'} gap={4}>
            <Flex alignItems={'center'} justifyContent={'center'} width={{ base: 'full', lg: '300px' }}>
              <NoDataFoundLottieAnimation />
            </Flex>
            <BaseText variant={TextVariant.M}>{t('COMMON.NO_DATA')}</BaseText>
          </Center>
        )
      default:
        return null
    }
  }

  if (data?.length === 0) {
    return renderNodataAnimation()
  }

  return (
    <Box overflowX={'auto'} width={'full'}>
      <Table.Root minH={minH}>
        <Table.Header>
          <Table.Row>
            {columns.map((col) => (
              <Table.ColumnHeader
                minW={col.accessor !== 'select' ? '150px' : '0'}
                key={col.accessor.toString()}
                p={2}
                onClick={() =>
                  col.accessor !== 'select' &&
                  setSortConfig({
                    key: col.accessor.toString(),
                    direction: sortConfig?.direction === 'asc' ? 'desc' : 'asc',
                  })
                }
              >
                {col.accessor === 'select' ? (
                  <Checkbox aria-label="Select all rows" checked={indeterminate ? 'indeterminate' : selection.length > 0} onCheckedChange={(changes) => handleSelectAll(!!changes.checked)} />
                ) : (
                  <>
                    {t(col.header)} {sortConfig?.key === col.accessor && (sortConfig.direction === 'asc' ? '⬆' : '⬇')}
                  </>
                )}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedItems?.map((item) => (
            <Table.Row key={item.id}>
              {columns?.map((col) => (
                <Table.Cell minW={col.accessor !== 'select' ? '150px' : '0'} bgColor={selection.includes(item.id) ? 'whiteAlpha.200' : 'none'} p={2} key={col.accessor.toString()}>
                  {col.accessor === 'select' ? (
                    <Checkbox
                      aria-label="Select item"
                      checked={selection.includes(item.id)}
                      onCheckedChange={(changes) => {
                        setSelection((prev) => (changes.checked ? [...prev, item.id] : prev.filter((id) => id !== item.id)))
                      }}
                    />
                  ) : col.accessor === 'actions' && col.actions ? (
                    <ActionButtons actions={col?.actions} item={item} />
                  ) : col.cell ? (
                    col.cell(item[col.accessor])
                  ) : (
                    item[col.accessor]
                  )}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {selection?.length > 1 && (
        <ActionBarRoot
          open={openActionBar}
          onOpenChange={(e) => {
            setOpenActionBar(e?.open)
            setSelection([])
          }}
        >
          <ActionBarContent>
            <ActionBarSelectionTrigger>
              {selection?.length} {t('COMMON.ITEMS_SELECTED')}
            </ActionBarSelectionTrigger>
            <ActionBarSeparator />
            <BaseButton colorType={'danger'} p={'2'} variant={'outline'} onClick={handleDeleteActionBar}>
              {t('COMMON.DELETE')}
            </BaseButton>
            <BaseButton colorType={'secondary'} p={'2'} variant={'outline'} onClick={handleShareActionBar}>
              {t('COMMON.SHARE')}
            </BaseButton>
            <ActionBar.CloseTrigger asChild>
              <CloseButton size="sm" />
            </ActionBar.CloseTrigger>
          </ActionBarContent>
        </ActionBarRoot>
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
          onLazyLoad={(index) => setCurrentPage(index)}
        />
      )}
    </Box>
  )
}
