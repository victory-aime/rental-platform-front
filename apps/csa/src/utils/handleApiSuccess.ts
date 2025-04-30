import { CustomToast, ToastStatus } from '_components/custom/toast'

export const handleApiSuccess = (response: { message: string; status: number }, toastType?: ToastStatus) => {
  const statusCode = response?.message || response?.status
  const defaultMessage = 'Operation successful'

  let description = ''
  const title = 'Notification'
  switch (statusCode) {
    case 200:
      description = response?.message || 'Success'
      break
    case 201:
      description = response?.message || 'Created'
      break
    case 204:
      description = 'No content'
      break
    default:
      description = response?.message || defaultMessage
      break
  }
  CustomToast({
    description,
    title,
    type: toastType ?? ToastStatus.SUCCESS,
  })
}
