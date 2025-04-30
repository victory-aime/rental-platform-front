import { QueryClient, QueryKey } from '@tanstack/react-query'

export class QueryCache {
  static queryClient: QueryClient

  static init(queryClient: QueryClient) {
    this.queryClient = queryClient
  }

  static get<T>(key: QueryKey): T | undefined {
    return this.queryClient.getQueryData<T>(key)
  }

  static set<T>(key: QueryKey, data: T): void {
    this.queryClient.setQueryData<T>(key, data)
  }

  static invalidate(key: QueryKey): void {
    this.queryClient.invalidateQueries({ queryKey: key, exact: false, refetchType: 'active' })
  }

  static refecthQueries(key: QueryKey): void {
    this.queryClient.refetchQueries({ queryKey: key })
  }

  static remove(key: QueryKey): void {
    this.queryClient.removeQueries({ queryKey: key, exact: false })
  }
}
