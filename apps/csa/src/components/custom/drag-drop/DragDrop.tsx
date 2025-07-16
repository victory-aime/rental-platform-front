'use client'

import {
  Alert,
  Box,
  FileUpload,
  FileUploadDropzone,
  FileUploadDropzoneContent,
  FileUploadItemPreviewImage,
  Float,
  HStack,
  Icon,
  useFileUpload,
  useFileUploadContext,
  For,
  Flex,
  Circle,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { HiX } from 'react-icons/hi'
import { LuUpload } from 'react-icons/lu'
import { ACCEPTED_TYPES, MAX_FILE_SIZE, MAX_FILE_SIZE_MB, MAX_FILES } from './constant/constants'
import { convertUrlsToFiles } from 'rise-core-frontend'
import { Avatar } from '_components/ui/avatar'
import { BaseText, TextVariant } from '../base-text'
import { VariablesColors } from '_theme/variables'
import { useTranslation } from 'react-i18next'
import { useFileUploadErrors } from './useFileUploadErrors'
import { CustomSkeletonLoader } from '../custom-skeleton'
import { CiUser } from 'react-icons/ci'

const FileImageList = ({ getFilesUploaded, initialImageUrls, t }: { getFilesUploaded: (files: File[]) => void; initialImageUrls?: string[]; t: any }) => {
  const fileUpload = useFileUploadContext()
  const { error, errorType } = useFileUploadErrors({ onValidFiles: getFilesUploaded })

  useEffect(() => {
    if (initialImageUrls && initialImageUrls.length > 0 && fileUpload.acceptedFiles.length === 0) {
      convertUrlsToFiles(initialImageUrls).then((files) => {
        fileUpload.setFiles([...files])
      })
    }
  }, [initialImageUrls])

  return (
    <Box mt={6} w={'full'}>
      <HStack width={'full'} justifyContent={'flex-start'} wrap="wrap" gap="3">
        {fileUpload.acceptedFiles.map((file) => (
          <FileUpload.Item p="2" width="auto" key={file.name} file={file} pos="relative">
            <Float>
              <FileUpload.ItemDeleteTrigger p="0.5" rounded="l1" bg="red.500" borderWidth="1px">
                <HiX color={VariablesColors.white} />
              </FileUpload.ItemDeleteTrigger>
            </Float>
            <FileUploadItemPreviewImage boxSize="300px" objectFit="cover" />
          </FileUpload.Item>
        ))}
      </HStack>
      {error && (
        <Alert.Root status="error" mt={5} p={4} width={'fit-content'}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>
              {errorType === 'max_file' ? t('DRAG_DROP.ERROR.MAX_FILES_TITLE') : errorType === 'size' ? t('DRAG_DROP.ERROR.MAX_SIZES_TITLE') : t('DRAG_DROP.ERROR.TYPE_FILES_TITLE')}
            </Alert.Title>
            <Alert.Description>{error}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}
    </Box>
  )
}

export const CustomDragDropZone = ({ getFilesUploaded, initialImageUrls }: { getFilesUploaded: (files: File[]) => void; initialImageUrls: string[] }) => {
  const { getRootProps } = useFileUpload()
  const { t } = useTranslation()

  return (
    <FileUpload.Root {...getRootProps()} maxFiles={MAX_FILES} maxFileSize={MAX_FILE_SIZE} alignItems="stretch" accept={ACCEPTED_TYPES} _dragging={{ borderColor: 'primary.500' }}>
      <FileUpload.HiddenInput />
      <FileImageList getFilesUploaded={getFilesUploaded} initialImageUrls={initialImageUrls} t={t} />
      <FileUploadDropzone>
        <Icon fontSize="xl" color="fg.muted">
          <LuUpload />
        </Icon>
        <FileUploadDropzoneContent>
          <BaseText color={'fg.muted'} variant={TextVariant.S}>
            {t('DRAG_DROP.TITLE')}
          </BaseText>
          <BaseText color="fg.subtle">{t('DRAG_DROP.DESC', { max_size: MAX_FILE_SIZE_MB })}</BaseText>
        </FileUploadDropzoneContent>
      </FileUploadDropzone>
    </FileUpload.Root>
  )
}

const SimpleFileUpload = ({
  getFileUploaded,
  avatarImage,
  name,
  handleDeleteAvatar,
}: {
  getFileUploaded: (file: File | undefined) => void
  avatarImage?: string
  name?: string
  handleDeleteAvatar?: () => void
}) => {
  const { t } = useTranslation()
  const [previewUrl, setPreviewUrl] = useState<string>()
  const [isImageDeleted, setIsImageDeleted] = useState(false)
  const fileUpload = useFileUploadContext()
  const { error, errorType } = useFileUploadErrors({
    onValidFiles: (files) => getFileUploaded(files[0] || undefined),
  })

  useEffect(() => {
    if (typeof avatarImage === 'string' && avatarImage && fileUpload.acceptedFiles.length === 0) {
      convertUrlsToFiles(avatarImage).then((file) => {
        fileUpload.setFiles([...file])
      })
    }
  }, [avatarImage])

  useEffect(() => {
    if (fileUpload.acceptedFiles.length > 0) {
      const file = fileUpload.acceptedFiles[0]
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)

      return () => URL.revokeObjectURL(url)
    } else {
      setPreviewUrl(undefined)
    }
  }, [fileUpload.acceptedFiles])

  const handleDeleteImage = () => {
    fileUpload.setFiles([])
    getFileUploaded(undefined)
    setPreviewUrl(undefined)
    setIsImageDeleted(true)
    handleDeleteAvatar?.()
  }

  return (
    <Flex direction={{ base: 'column', md: 'row' }} w="full" align="flex-start" justify="flex-start" gap={5}>
      <Box pos="relative">
        <FileUpload.Trigger asChild cursor="pointer">
          <Avatar
            boxSize="130px"
            size="2xl"
            name={name}
            cursor="pointer"
            colorPalette={(previewUrl || avatarImage) && !isImageDeleted ? 'green' : 'none'}
            icon={<CiUser />}
            src={!isImageDeleted ? previewUrl || (avatarImage?.trim() ? avatarImage : undefined) : undefined}
            css={{
              outlineWidth: '2px',
              outlineColor: 'colorPalette.500',
              outlineOffset: '2px',
              outlineStyle: 'solid',
            }}
          />
        </FileUpload.Trigger>

        {!isImageDeleted && fileUpload?.acceptedFiles?.length > 0 && (
          <For each={fileUpload?.acceptedFiles}>
            {(file) => (
              <Float placement="bottom-end" offsetX="3" offsetY="3" key={file.name}>
                <FileUpload.Item rounded="full" bg="red.500" p="1" borderColor="none" width="auto" file={file} pos="relative">
                  <FileUpload.ItemDeleteTrigger>
                    <HiX color="white" />
                  </FileUpload.ItemDeleteTrigger>
                </FileUpload.Item>
              </Float>
            )}
          </For>
        )}
        {(previewUrl || avatarImage) && !isImageDeleted && (
          <Float placement="bottom-end" offsetX="3" offsetY="3" key={'image'} cursor={'pointer'}>
            <Circle bg="red.500" p="1" borderColor="none" width="auto" onClick={handleDeleteImage}>
              <HiX color="white" />
            </Circle>
          </Float>
        )}
      </Box>

      {error && (
        <Alert.Root status="error" mt={5} p={4} width="fit-content">
          <Alert.Indicator />
          <Alert.Content>
            {errorType === 'max_file' ? t('DRAG_DROP.ERROR.MAX_FILES_TITLE') : errorType === 'size' ? t('DRAG_DROP.ERROR.MAX_SIZES_TITLE') : t('DRAG_DROP.ERROR.TYPE_FILES_TITLE')}
            <Alert.Description>{error}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}
    </Flex>
  )
}

export const UploadAvatar = ({
  getFileUploaded,
  avatarImage,
  name,
  isLoading,
  handleDeleteAvatar,
}: {
  getFileUploaded: (file: File | undefined) => void
  avatarImage?: string
  name?: string
  isLoading?: boolean
  handleDeleteAvatar?: () => void
}) => {
  const { getRootProps } = useFileUpload()
  return (
    <>
      {isLoading ? (
        <CustomSkeletonLoader type="TEXT_IMAGE" numberOfLines={1} direction={'column'} height={'130px'} />
      ) : (
        <>
          <BaseText variant={TextVariant.S}>Avatar</BaseText>
          <FileUpload.Root {...getRootProps()} maxFiles={1} maxFileSize={MAX_FILE_SIZE} accept={ACCEPTED_TYPES}>
            <FileUpload.HiddenInput />
            <SimpleFileUpload getFileUploaded={getFileUploaded} avatarImage={avatarImage} name={name} handleDeleteAvatar={handleDeleteAvatar} />
          </FileUpload.Root>
          <BaseText variant={TextVariant.S} textTransform={'capitalize'}>
            {name}
          </BaseText>
        </>
      )}
    </>
  )
}
