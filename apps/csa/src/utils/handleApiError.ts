import { CustomToast, ToastStatus } from '_components/custom/toast'

export const handleApiError = (
  response: {
    status: number
    message: string
  },
  toastType?: ToastStatus
) => {
  const statusCode = response?.status || 500
  const defaultMessage = 'Connection Error'

  let description = ''
  const title = 'Notification'
  switch (statusCode) {
    case 401:
      description = response?.message || 'Unauthorized'
      break
    case 404:
      description = response?.message || 'Not Found'
      break
    case 403:
      description = 'Forbidden'
      break
    case 500:
      description = 'Service Error'
      break
    default:
      description = response?.message || defaultMessage
      break
  }

  CustomToast({
    title,
    description,
    type: toastType ?? ToastStatus.ERROR,
  })
}
