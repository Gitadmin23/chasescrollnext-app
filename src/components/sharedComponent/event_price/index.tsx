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

    const DataFormater = (number: number, prefix: string) => {
        if(number > 1000000000){
          return (prefix)+(number/1000000000).toString() + 'B';
        }else if(number > 1000000){
          return (prefix)+(number/1000000).toString() + 'M';
        }else if(number > 1000){
          return (prefix)+(number/1000).toString() + 'K';
        }else{
          return (prefix)+number.toString();
        }
      }

    return (
        <Text>
            {!indetail && (
                <>
                    {(minPrice === 0 && maxPrice === 0) ?
                        "Free" :
                        <>
                            {minPrice === maxPrice && (
                                <>
                                    {DataFormater(minPrice, currency === "USD" ? "$" : "₦")}
                                </>
                            )}
                            {minPrice !== maxPrice && (
                                <>
                                    {DataFormater(minPrice, currency === "USD" ? "$" : "₦")}
                                    {" - "}
                                    {DataFormater(maxPrice, currency === "USD" ? "$" : "₦")}
                                </>
                            )}
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
