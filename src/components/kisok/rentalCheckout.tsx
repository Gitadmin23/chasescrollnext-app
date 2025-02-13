import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { IoIosAdd, IoIosRemove } from 'react-icons/io'
import CustomButton from '../general/Button'
import { formatNumber } from '@/utils/numberFormat'
import { IRental } from '@/models/product'
import useCustomTheme from '@/hooks/useTheme'

export default function RentalCheckout({ setQty, qty, item }: { setQty: any, qty: number, item: IRental }) {

    const { borderColor, secondaryBackgroundColor } = useCustomTheme()

    return (
        <Flex w={"full"} bgColor={"white"}  rounded={"16px"} flexDirection={"column"} borderWidth={"1px"} p={"24px"} gap={"4"} borderColor={borderColor} style={{ boxShadow: "0px 20px 70px 0px #C2C2C21A" }} >
            <Text fontSize={"14px"} >Starting Price <span style={{ fontSize: "24px" }} >{formatNumber(item?.price)}</span></Text>
            <Flex alignItems={"center"} gap={"3"} >
                <Text fontWeight={"500"} >Numbers of days</Text>
                <Flex rounded={"39px"} alignItems={"center"} padding={"12px"} gap={"3"} >
                    <Flex as={"button"} onClick={() => setQty((prev: any) => prev === 1 ? 1 : prev - 1)} w={"46px"} h={"39px"} rounded={"78px"} justifyContent={"center"} alignItems={"center"} bgColor={secondaryBackgroundColor}  >
                        <IoIosRemove />
                    </Flex>
                    <Text fontSize={"18px"} >{qty}</Text>
                    <Flex as={"button"} onClick={() => setQty((prev: any) => prev + 1)} w={"46px"} h={"39px"} rounded={"78px"} justifyContent={"center"} alignItems={"center"} bgColor={secondaryBackgroundColor}  >
                        <IoIosAdd />
                    </Flex>
                </Flex>
            </Flex>
            <CustomButton text={`NGN ${formatNumber(Number(item?.price) * Number(qty))} Pay`} borderRadius={"999px"} height={"55px"} />
        </Flex>
    )
}
