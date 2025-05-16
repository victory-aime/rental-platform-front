enum CommonBookingStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
  EXPIRED = 'EXPIRED',
}

enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
  EXPIRED = 'EXPIRED',
}

enum EstablishmentType {
  HOTEL = 'HOTEL',
  AGENCY = 'AGENCY',
}

enum PlanType {
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  PRO = 'PRO',
}

enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  XOF = 'XOF',
  XAF = 'XAF',
}

enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED',
}

enum FuelType {
  GASOLINE = 'GASOLINE',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID',
}

enum TransmissionType {
  MANUAL = 'MANUAL',
  AUTOMATIC = 'AUTOMATIC',
}

export enum VehicleStatus {
  AVAILABLE = 'AVAILABLE',
  MAINTENANCE = 'MAINTENANCE',
  UNAVAILABLE = 'UNAVAILABLE',
}

export {
  Currency,
  CommonBookingStatus,
  SubscriptionStatus,
  EstablishmentType,
  PlanType,
  DiscountType,
  FuelType,
  TransmissionType,
}
