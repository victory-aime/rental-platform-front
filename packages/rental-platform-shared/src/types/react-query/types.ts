import { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export type QueryPayload<TParams = any, TData = any, TError = AxiosError> = {
  payload?: TParams
  params?: Record<string, any>
  queryOptions?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
}

export type MutationInput<TPayload = any, TParams = any> = {
  payload?: TPayload
  params?: TParams
}

export type MutationPayload<TPayload = any, TResult = any, TError = AxiosError> = {
  mutationOptions?: Omit<
    UseMutationOptions<TResult, TError, MutationInput<TPayload>>,
    'mutationFn' | 'mutationKey'
  >
}
