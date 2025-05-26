import { QueryClient } from '@tanstack/react-query'
import { QueryCache } from './cache'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30,
      networkMode: 'online',
      retry: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
})
QueryCache.init(queryClient)
