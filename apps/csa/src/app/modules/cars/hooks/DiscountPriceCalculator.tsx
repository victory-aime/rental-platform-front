import { useFormikContext } from 'formik'
import { useEffect } from 'react'

export const DiscountedPriceCalculator = () => {
  const { values, setFieldValue } = useFormikContext<any>()

  useEffect(() => {
    const { dailyPrice, discountValue, hasDiscount } = values

    if (hasDiscount && dailyPrice && discountValue >= 0) {
      const finalPrice = dailyPrice - (dailyPrice * discountValue) / 100
      setFieldValue('rentalPriceDiscounted', finalPrice.toFixed(2))
    } else {
      setFieldValue('rentalPriceDiscounted', '')
    }
  }, [values.dailyPrice, values.discountValue, values.hasDiscount, setFieldValue])

  return null
}
