import { TYPES } from "../..";

export interface ICreateCarDto {
  id: string
  brand: string

  agenceId: string;

   name: string;


   model: string;

   plateNumber: string;

   dailyPrice: number;

  
   weeklyPrice?: number;
  discountType?: TYPES.ENUM.DiscountType;
   discountValue?: number;

  

  
  
  color?: string;

  
   transmission?: TYPES.ENUM.TransmissionType;

  
   fuelType?: TYPES.ENUM.FuelType;

  
  doors?: number;

  
  seats?: number;

  
  carCategoryId?: string;
 available?: boolean;
  equipmentIds?: TYPES.MODELS.COMMON.CarEquipments[];
}
