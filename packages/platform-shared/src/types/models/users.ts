import { TYPES } from "../.."

export interface Establishment {
  id: string
  name: string
  type: string
  description: string
  address: string
  city: string
  country: string
  phone: string
  subscription: {
    id: string
    etablissementId: string
    planId: string
    startDate: string
    endDate: string
    canceledAt: string | null
    status: TYPES.ENUM.CommonStatus
    plan: {
      id: string
      name: TYPES.ENUM.PlanType
      price: number
      duration: number      
      maxListings: number     
       maxImagesPerListing: number
      maxReservationsPerMonth: number
      canUseDiscounts: true
      canAccessAnalytics: true
      prioritySupport: true
      createdAt: string
      updatedAt: string
    }
  }
}

export interface IUser {
  id: string
  name: string
  email: string
  etablissement: Establishment
}
