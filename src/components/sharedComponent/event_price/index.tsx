import { formatNumber } from '@/utils/numberFormat'
import { Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
    maxPrice: any,
    minPrice?: any,
    currency: any,
    indetail?: boolean
}

function EventPrice(props: Props) {
    const {
        maxPrice,
        minPrice,
        currency,
        indetail
    } = props

    return (
        <Text>
            {!indetail && (
                <>
                    {(minPrice === 0 && maxPrice === 0) ?
                        "Free" :
                        <>
                            {currency === "USD" ? "$" : "₦"}{maxPrice}
                        </>
                    }
                </>
            )}
            {indetail && (
                <>
                    {(minPrice === 0 && maxPrice === 0) ?
                        "Free" :
                        <>
                            {minPrice === maxPrice && (
                                <>
                                    {formatNumber(minPrice, currency === "USD" ? "$" : "₦")}
                                </>
                            )}
                            {minPrice !== maxPrice && (
                                <> 
                                    {formatNumber(minPrice, currency === "USD" ? "$" : "₦")}
                                    -
                                    {formatNumber(maxPrice, currency === "USD" ? "$" : "₦")}
                                </>
                            )}
                        </>
                    }
                </>
            )}
        </Text>
    )
}

export default EventPrice
