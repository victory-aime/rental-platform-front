import { QueryClient } from '@tanstack/react-query'
import { QueryCache } from './cache'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30,
    },
  },
})
QueryCache.init(queryClient)
