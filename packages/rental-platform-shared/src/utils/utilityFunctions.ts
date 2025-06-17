import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/fr'
import imageCompression from 'browser-image-compression'
dayjs.extend(customParseFormat)
dayjs.locale('fr')

export const YEAR_MONTH_DAY = 'yyyy-mm-dd'
export const DAY_MONTH_YEAR = 'dd/mm/yyyy'
export const MONTH_DAY_YEAR = 'mm/dd/yyyy'
export const APP_DATE_PATTERN = 'DD MMM YYYY' // Default date pattern e.g: 12 Dec 2025
export const COMMON_FORMAT_DATE = 'dd/MM/yyyy' // Application date format
export const COMMON_FORMAT_DATE_HEADER = 'MMMM yyyy' // Common header calendar date display
export const TIME_FORMAT = '24h'
export const HALF_TIME_FORMAT = '12h' // 12-hour format

/**
 * Converts a date in a standard format (e.g., 'YYYY-MM-DD') to the application's specific format.
 * @param date - The date to convert
 * @param inputFormat
 * @returns Formatted date according to the application format
 */
export const convertDateFormat = (
  date: string | Date,
  inputFormat: string = COMMON_FORMAT_DATE
): string => {
  return dayjs(date).isValid() ? dayjs(date).format(inputFormat) : ''
}

/**
 * Calculates the period in months based on the contract type.
 * @param nbePeriod - Number of periods
 * @param period - Period type ('T' = quarterly, 'S' = semiannual, 'A' = annual)
 * @returns The number of months corresponding to the period
 */
export const getPeriodInMonths = (
  nbePeriod: number,
  period: 'QUARTERLY' | 'SEMIANNUAL' | 'ANNUAL' | string
): number => {
  switch (period) {
    case 'QUARTERLY':
      return nbePeriod * 3
    case 'SEMIANNUAL':
      return nbePeriod * 6
    case 'ANNUAL':
      return nbePeriod * 12
    default:
      return nbePeriod
  }
}

/**
 * Formats the date for the audit table
 * @param date - The date to format
 * @returns The formatted date for the audit table
 */
export const formatDateFormAuditTable = (date: string): string => {
  if (!date || !dayjs(date).isValid()) return ''
  return dayjs(date).format('DD MMM YYYY')
}

/**
 * Returns the time value of a date in 'HH:mm' format.
 * @param date - The date to extract the time from
 * @returns The time in 'HH:mm' format
 */
export const getTimeValue = (date: string): string => {
  if (!date || !dayjs(date).isValid()) return ''
  return dayjs(date).format('HH:mm')
}

/**
 * Calculates the difference in days between two dates.
 * @param now - The current date
 * @param date - The date to compare
 * @returns The difference in days
 */
export const differenceInDays = (now: Date, date: Date): number => {
  return dayjs(now).diff(dayjs(date), 'day')
}

/**
 * Formats the createdAt date to a human-readable string.
 * @param createdAt - The createdAt date string
 * @returns The formatted date string
 */
export const formatCreatedAt = (createdAt: string): string => {
  if (!createdAt || !dayjs(createdAt).isValid()) return ''

  const date = dayjs(createdAt)
  const now = dayjs()
  const diffDays = now.diff(date, 'day')

  if (diffDays === 0) return `Auj. ${date.format('HH:mm')}`
  if (diffDays === 1) return `Hier ${date.format('HH:mm')}`
  if (diffDays < 7) return `Il y a ${diffDays}j`
  return date.format('DD MMM YYYY')
}

/**
 * Finds an object by id in a list.
 * @param id - The id to search for
 * @param list - The list to search in
 * @returns The found object or null if not found
 */
export const findDynamicIdInList = (id: string | undefined, list: any) => {
  if (!id || !list) return null

  const array = Array.isArray(list) ? list : Array.isArray(list.content) ? list.content : null
  if (!array) return null

  return array.find((item: { id: string }) => item.id === id) || null
}

/**
 * A generic function to parse a date from a string.
 * @param date - The date string to parse (e.g., '22/11/2024')
 * @param inputFormat - The expected input format (default is 'DD/MM/YYYY')
 * @returns A Date object or null if the date is invalid
 */
export const parseDateString = (
  date: Date | string | null | undefined,
  inputFormat: string = COMMON_FORMAT_DATE
): Date | null => {
  if (!date) return null

  if (date instanceof Date) {
    return date
  }
  const parsedDate = dayjs(date, inputFormat, true)
  return parsedDate.isValid() ? parsedDate.toDate() : null
}

/**
 * Parse and format a date string into a readable format like '12 Dec 2025'.
 * @param date - A date string, Date object, or null
 * @param inputFormat - Expected input format if not ISO (default 'DD/MM/YYYY')
 * @returns A formatted string or null if invalid
 */
export const formatDisplayDate = (
  date: Date | string | null | undefined,
  inputFormat: string = APP_DATE_PATTERN
): string | null => {
  if (!date) return null

  let parsed = null

  if (date instanceof Date && !isNaN(date.getTime())) {
    parsed = dayjs(date)
  } else if (typeof date === 'string') {
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/
    parsed = isoRegex.test(date) ? dayjs(date) : dayjs(date, inputFormat, true)
  }
  return parsed && parsed.isValid() ? parsed.format(APP_DATE_PATTERN) : null
}

/**
 * Retrieves the month from a date string.
 * @param dateString - The date string (e.g., '22/11/2024')
 * @param inputFormat - The expected input format (default is 'DD/MM/YYYY')
 * @param locale - Locale for the month (default is 'fr')
 * @returns The full month name (e.g., 'november') or null if the date is invalid
 */
export const getMonthFromDateString = (
  dateString: string,
  inputFormat: string = COMMON_FORMAT_DATE,
  locale: string = 'fr'
): string | null => {
  if (!dateString) return null

  const parsedDate = dayjs(dateString, inputFormat, true)
  if (!parsedDate.isValid()) return null

  return parsedDate.locale(locale).format('MMMM')
}

/**
 * Function to format data to get createdInfo and updatedInfo
 * @param data - The array of items to be formatted
 * @returns A new array with formatted items
 */
export const convertToCreatedUpdatedInfo = <
  T extends {
    createdBy?: string
    createdAt?: string
    updatedBy?: string
    updatedAt?: string
  },
>(
  data: T[]
): Array<
  T & {
    createdInfo: { createdBy?: string; createdAt?: string }
    updatedInfo: { updatedBy?: string; updatedAt?: string }
  }
> => {
  return data?.map((item) => ({
    ...item,
    createdInfo: {
      createdBy: item.createdBy,
      createdAt: item.createdAt,
    },
    updatedInfo: {
      updatedBy: item.updatedBy,
      updatedAt: item.updatedAt,
    },
  }))
}

/**
 * Function to compress images files
 */

export const compressImagesFiles = async (file: File) => {
  const options = {
    fileType: 'image/webp', // Convert to WebP
    maxSizeMB: 1, // Limiter à 1MB
    maxWidthOrHeight: 1920, // Limit la résolution à du Full HD
    initialQuality: 0.8, // Compression (1 = quality max)
    useWebWorker: true,
  }
  return await imageCompression(file, options)
}

/**
 * Convert image files into base64
 */

export const fileToBase64 = async (file: File): Promise<string> => {
  const compressedFiles = await compressImagesFiles(file)
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(compressedFiles)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

/**
 * Convert base64 filte to File
 */
export const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(',')
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg'
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

/**
 * Convert one or multiple Cloudinary URLs to File objects
 * @param urls - Single URL string or array of URL strings
 * @returns Array of File objects
 */
export const convertUrlsToFiles = async (urls: string | string[]): Promise<File[]> => {
  const urlArray = Array.isArray(urls) ? urls : [urls]

  const results = await Promise.all(
    urlArray.map(async (url, index) => {
      try {
        const response = await fetch(url)
        const data = await response.blob()
        const filename = url.split('/').pop() || `image-${index}.jpg`
        return new File([data], filename, { type: data.type })
      } catch {
        return null
      }
    })
  )

  return results.filter((f): f is File => !!f)
}
