import { DateRange } from 'react-day-picker'
import * as yup from 'yup'
import { I18n } from '../../../../locales'

export const initialMaintenanceValues: initialMaintenanceValues = {
  plannedDate: { from: undefined, to: undefined },
  title: [''],
  description: '',
  carId: [''],
  price: '',
  status: [''],
  startTime: '',
  endTime: '',
}

export interface initialMaintenanceValues {
  plannedDate: { from: DateRange | undefined; to: DateRange | undefined }
  title: string | string[]
  description: string
  carId: string | string[]
  price: string
  status: string | string[]
  startTime: string
  endTime: string
}

export const maintenanceValidationSchema = yup.object({
  title: yup
    .array()
    .of(yup.string().required())
    .min(1, I18n.t('MAINTENANCE.VALIDATION.TITLE_REQUIRED'))
    .test(
      'no-empty-string',
      I18n.t('MAINTENANCE.VALIDATION.TITLE_REQUIRED'),
      (value) => Array.isArray(value) && value.every((v) => !!v && v.trim() !== '')
    ),

  carId: yup
    .array()
    .of(yup.string().required())
    .min(1, I18n.t('MAINTENANCE.VALIDATION.CAR_REQUIRED'))
    .test(
      'no-empty-string',
      I18n.t('MAINTENANCE.VALIDATION.CAR_REQUIRED'),
      (value) => Array.isArray(value) && value.every((v) => !!v && v.trim() !== '')
    ),

  plannedDate: yup
    .object({
      from: yup.date().required(I18n.t('MAINTENANCE.VALIDATION.DATE_FROM_REQUIRED')),
      to: yup.date().required(I18n.t('MAINTENANCE.VALIDATION.DATE_TO_REQUIRED')),
    })
    .required(I18n.t('MAINTENANCE.VALIDATION.DATES_REQUIRED')),

  startTime: yup
    .string()
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, I18n.t('MAINTENANCE.VALIDATION.START_TIME_INVALID'))
    .required(I18n.t('MAINTENANCE.VALIDATION.START_TIME_REQUIRED')),

  endTime: yup
    .string()
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, I18n.t('MAINTENANCE.VALIDATION.END_TIME_INVALID'))
    .required(I18n.t('MAINTENANCE.VALIDATION.END_TIME_REQUIRED')),

  price: yup
    .number()
    .typeError(I18n.t('MAINTENANCE.VALIDATION.PRICE_TYPE'))
    .required(I18n.t('MAINTENANCE.VALIDATION.PRICE_REQUIRED')),

  description: yup.string().nullable(),

  status: yup
    .array()
    .of(yup.string().required())
    .min(1, I18n.t('MAINTENANCE.VALIDATION.STATUS_REQUIRED'))
    .test(
      'no-empty-string',
      I18n.t('MAINTENANCE.VALIDATION.STATUS_REQUIRED'),
      (value) => Array.isArray(value) && value.every((v) => !!v && v.trim() !== '')
    ),
})
