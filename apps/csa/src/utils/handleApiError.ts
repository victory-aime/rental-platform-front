import { CustomToast, ToastStatus } from '_components/custom/toast'

export const handleApiError = (
  response: {
    status: number
    message: string
  }
) => {
  const statusCode = response?.status || 500
  const defaultMessage = 'Connection Error'

  let description = ''
  let toastStatus: ToastStatus = ToastStatus.ERROR
  const title = 'Notification'

  switch (statusCode) {
    case 400:
      description = response?.message || 'Bad Request'
      toastStatus = ToastStatus.WARNING
      break
    case 401:
      description = response?.message || 'Unauthorized'
      toastStatus = ToastStatus.WARNING
      break
    case 403:
      description = 'Forbidden'
      toastStatus = ToastStatus.WARNING
      break
    case 404:
      description = response?.message || 'Not Found'
      toastStatus = ToastStatus.INFO
      break
    case 500:
      description = 'Service Error'
      toastStatus = ToastStatus.ERROR
      break
    default:
      description = response?.message || defaultMessage
      toastStatus = ToastStatus.ERROR
      break
  }

  CustomToast({
    title,
    description,
    type: toastStatus,
  })
}
