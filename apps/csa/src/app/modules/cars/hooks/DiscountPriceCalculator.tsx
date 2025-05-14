import { useFormikContext } from 'formik'
import { useEffect } from 'react'

export const DiscountedPriceCalculator = () => {
  const { values, setFieldValue } = useFormikContext<any>()

  useEffect(() => {
    const { rentalPricePerDay, discount, hasDiscount } = values

    if (hasDiscount && rentalPricePerDay && discount >= 0) {
      const finalPrice = rentalPricePerDay - (rentalPricePerDay * discount) / 100
      setFieldValue('finalRentalPricePerDay', finalPrice.toFixed(2))
    } else {
      setFieldValue('finalRentalPricePerDay', '')
    }
  }, [values.rentalPricePerDay, values.discount, values.hasDiscount, setFieldValue])

  return null
}
