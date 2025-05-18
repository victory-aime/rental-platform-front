export interface ParcDto {
  id?: string
  name?: string
  address?: string
  agencyId?: string | null
  listCar?: any[]
  createdAt?: string
  updateAt?: string
}
export interface ParcListDto {
  agencyId?: string
  page?: number
  limit?: number
}

export interface IResponseParc {
  content: ParcDto[]
  totalPages: number
  currentPage: number
  totalDataPerPage: number
}
