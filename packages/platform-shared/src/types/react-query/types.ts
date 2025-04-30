import { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export type QueryPayload<TParams, TData, TError = AxiosError> = (TParams extends void
  ? { payload?: undefined }
  : { payload: TParams }) & {
  queryOptions?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
}

export type MutationPayload<TResult> = Omit<
  UseMutationOptions<TResult, AxiosError, any>,
  'mutationKey' | 'mutationFn'
>
