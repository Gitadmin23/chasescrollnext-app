import { Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoIosAdd, IoIosRemove } from 'react-icons/io'
import CustomButton from '../general/Button'
import { CartIcon } from '../svg'
import useCustomTheme from '@/hooks/useTheme'
import { useRouter } from 'next/navigation'
import { IProduct } from '@/models/product' 

export default function ProductCheckout({item, qty, setQty} : {item: IProduct, qty: number, setQty: any}) {

    const { secondaryBackgroundColor, borderColor, mainBackgroundColor } = useCustomTheme() 
    const { push } = useRouter()

    return (
        <Flex w={["full", "full", "full"]} alignItems={"center"} p={["2", "2", "0px"]} borderWidth={["1px", "1px", "0px"]} rounded={"16px"} borderColor={borderColor} flexDir={["column", "column", "row"]} gap={"4"} >
            <Flex gap={"4"} alignItems={"center"} w={"full"} > 
                {/* <Flex w={"fit-content"} >
                    <Flex w={"80px"} h={"56px"} justifyContent={"center"} alignItems={"center"} rounded={"full"} bgColor={secondaryBackgroundColor} >
                        <CartIcon />
                    </Flex>
                </Flex> */}
                <Text fontWeight={"500"} >QTY</Text>
                <Flex bgColor={mainBackgroundColor} rounded={"39px"} alignItems={"center"} justifyContent={"center"} padding={"12px"} borderWidth={"1px"} gap={"3"} >
                    <Flex type='button' as={"button"} onClick={() => setQty((prev: any) => prev === 1 ? 1 : prev - 1)} w={"46px"} h={"39px"} rounded={"78px"} justifyContent={"center"} alignItems={"center"} bgColor={secondaryBackgroundColor}  >
                        <IoIosRemove />
                    </Flex>
                    <Text fontSize={"18px"} >{qty}</Text>
                    <Flex type='button' disabled={qty === item?.quantity} as={"button"} onClick={() => setQty((prev: any) => prev + 1)} w={"46px"} h={"39px"} rounded={"78px"} justifyContent={"center"} alignItems={"center"} bgColor={secondaryBackgroundColor}  >
                        <IoIosAdd />
                    </Flex>
                </Flex>
            </Flex>
            <CustomButton onClick={()=> push(`/dashboard/kisok/details/${item?.id}/address?qty=${qty}`)} text={"Check out"} height={"68px"} fontSize={"sm"} borderRadius={"9999px"} />
        </Flex>
    )
}
