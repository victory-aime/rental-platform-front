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
  Circle,
  Center,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { HiUpload, HiX } from 'react-icons/hi'
import { LuUpload } from 'react-icons/lu'
import { ACCEPTED_TYPES, MAX_FILE_SIZE, MAX_FILE_SIZE_MB, MAX_FILES } from './constant/constants'
import { UTILS } from 'rental-platform-shared'
import { Avatar } from '_components/ui/avatar'
import { BaseText, TextVariant } from '../base-text'
import { VariablesColors } from '_theme/variables'
import { useTranslation } from 'react-i18next'

const FileImageList = ({ getFilesUploaded, initialImageUrls, t }: { getFilesUploaded: (files: File[]) => void; initialImageUrls?: string[]; t: any }) => {
  const fileUpload = useFileUploadContext()
  const [error, setError] = useState<string | null>(null)
  const [errorType, setErrorType] = useState<'size' | 'max_file' | 'type' | null>(null)

  useEffect(() => {
    if (fileUpload.acceptedFiles.length > MAX_FILES) {
      setErrorType('max_file')
      setError(t('DRAG_DROP.ERROR.MAX_FILES', { max_files: MAX_FILES }))
    } else if (fileUpload.rejectedFiles.length > 0) {
      const oversizedFiles = fileUpload.rejectedFiles.filter((file) => file.errors.includes('FILE_TOO_LARGE'))

      const invalidTypeFiles = fileUpload.rejectedFiles.filter((file) => file.errors.includes('FILE_INVALID_TYPE'))

      const limitFiles = fileUpload.rejectedFiles.filter((file) => file.errors.includes('TOO_MANY_FILES'))

      if (oversizedFiles.length > 0) {
        setErrorType('size')
        setError(t('DRAG_DROP.ERROR.MAX_SIZES', { max_sizes: MAX_FILE_SIZE / (1024 * 1024) }))
      } else if (invalidTypeFiles.length > 0) {
        setErrorType('type')
        setError(t('DRAG_DROP.ERROR.TYPE_FILES', { type_files: ACCEPTED_TYPES }))
      } else if (limitFiles.length > 0) {
        setErrorType('max_file')

        setError(t('DRAG_DROP.ERROR.MAX_FILES', { max_files: MAX_FILES }))
      } else {
        setError(null)
        setErrorType(null)
      }
    }
    getFilesUploaded(fileUpload.acceptedFiles)
  }, [fileUpload])

  useEffect(() => {
    if (initialImageUrls && initialImageUrls.length > 0 && fileUpload.acceptedFiles.length === 0) {
      UTILS.convertUrlsToFiles(initialImageUrls).then((files) => {
        fileUpload.setFiles([...files])
      })
    }
  }, [initialImageUrls])

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null)
        setErrorType(null)
        fileUpload.clearRejectedFiles()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

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

const SimpleFileUpload = ({ getFileUploaded, avatarImage, name }: { getFileUploaded: (file: File | null) => void; avatarImage?: string; name?: string }) => {
  const fileUpload = useFileUploadContext()
  const [error, setError] = useState<string | null>(null)
  const [errorType, setErrorType] = useState<'size' | 'type' | null>(null)

  useEffect(() => {
    if (fileUpload.rejectedFiles.length > 0) {
      const oversizedFiles = fileUpload.rejectedFiles.some((file) => file.errors.includes('FILE_TOO_LARGE'))
      const invalidTypeFiles = fileUpload.rejectedFiles.some((file) => file.errors.includes('FILE_INVALID_TYPE'))
      if (oversizedFiles) {
        setErrorType('size')
        setError(`Ce fichier dépasse la taille maximale de ${MAX_FILE_SIZE / (1024 * 1024)} MB.`)
      } else if (invalidTypeFiles) {
        setErrorType('type')
        setError('Ce fichier a un format non supporté. Formats acceptés : .png, .jpg, .jpeg')
      } else {
        setError(null)
        setErrorType(null)
      }
    }
    getFileUploaded(fileUpload.acceptedFiles[0])
  }, [fileUpload])

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null)
        setErrorType(null)
        fileUpload.clearRejectedFiles()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  return (
    <Center flexDir={'column'}>
      <Avatar
        boxSize={'100px'}
        size={'2xl'}
        colorPalette={'yellow'}
        name={name}
        src={avatarImage}
        css={{
          outlineWidth: '2px',
          outlineColor: 'colorPalette.500',
          outlineOffset: '2px',
          outlineStyle: 'solid',
        }}
      >
        <Float placement="bottom-end" offsetX="2" offsetY="2">
          <Circle bg="gray.500" size="25px" width={'full'} outline="0.2em solid" outlineColor="bg">
            {!avatarImage ? (
              <FileUpload.Trigger asChild>
                <HiUpload size={'14px'} color={'white'} />
              </FileUpload.Trigger>
            ) : (
              <>
                {fileUpload.acceptedFiles.map((file: any) => (
                  <FileUpload.Item p="2" width="auto" key={file.name} file={file} pos="relative" rounded={'full'} bg={'red.500'} outline="0.2em solid" outlineColor="bg">
                    <FileUpload.ItemDeleteTrigger>
                      <HiX color={'white'} />
                    </FileUpload.ItemDeleteTrigger>
                  </FileUpload.Item>
                ))}
              </>
            )}
          </Circle>
        </Float>
      </Avatar>
      {error && (
        <Alert.Root status="error" mt={5} p={4} width={'fit-content'}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{errorType === 'size' ? 'Taille limite dépassée' : 'Format non accepté'}</Alert.Title>
            <Alert.Description>{error}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}
    </Center>
  )
}

export const UploadAvatar = ({ getFileUploaded, avatarImage, name }: { getFileUploaded: (file: File | null) => void; avatarImage?: string | any; name?: string }) => {
  const { getRootProps } = useFileUpload()
  return (
    <FileUpload.Root {...getRootProps()} maxFiles={1} maxFileSize={MAX_FILE_SIZE} accept={ACCEPTED_TYPES} alignItems={'center'} justifyContent={'center'}>
      <FileUpload.HiddenInput />
      <SimpleFileUpload getFileUploaded={getFileUploaded} avatarImage={avatarImage} name={name} />
    </FileUpload.Root>
  )
}
