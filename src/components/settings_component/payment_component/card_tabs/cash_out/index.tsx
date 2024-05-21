import React, { useState } from 'react'
import { Flex, Text, Input } from '@chakra-ui/react'
import CashoutBtn from './cashout_btn'
import useSettingsStore from '@/global-state/useSettingsState'
import CustomButton from '@/components/general/Button'
import { formatNumber } from '@/utils/numberFormat'

interface Props {
    currency: string
}

function CashOut(props: Props) {
    const {
        currency
    } = props

    const { amount, setAmount } = useSettingsStore((state) => state);

    const [show, setShow] = useState(false)


    return (
        <Flex width={"full"} pt={"8"} flexDirection={"column"} alignItems={"center"} >
            {!show && (
                <Flex w={"full"} gap={"4"} alignItems={"center"} flexDir={"column"} >
                    <Text fontWeight={"semibold"} >Enter Amount</Text>
                    <Input value={amount} onChange={(e) => setAmount(e.target.value)} width={"full"} type='number' textAlign={"center"} borderColor={"transparent"} focusBorderColor="transparent" placeholder={currency === "USD" ? '$0.00' : "₦0.00"} fontSize={"20px"} _hover={{ color: "black" }} />
                </Flex>
            )}
            {show && (
                <Flex w={"full"} gap={"4"} flexDir={"column"} >
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                        <Text lineHeight={"19.2px"} color={"#626262"} >Total Amount </Text>
                        <Text lineHeight={"25.2px"} fontSize={"lg"} color={"#101828B2"} >{formatNumber((Number(amount)), "₦")}</Text>
                    </Flex>
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                        <Text lineHeight={"19.2px"} color={"#626262"} >Service Fee</Text>
                        <Text lineHeight={"25.2px"} fontSize={"lg"} color={"#101828B2"} >{formatNumber((Number(amount) * 0.03), "₦")}</Text>
                    </Flex>
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                        <Text lineHeight={"19.2px"} color={"#626262"} >Cashout Amount</Text>
                        <Text lineHeight={"25.2px"} fontWeight={"bold"} fontSize={"lg"} color={"#101828B2"} >{formatNumber(Number(amount) - (Number(amount) * 0.03), "₦")}</Text>
                    </Flex>
                </Flex>
            )}
            {!show && (
                <CustomButton backgroundColor={"#12299C"} borderRadius={"8px"} onClick={() => setShow(true)} text='Cash out' marginTop={"8"} />
            )}
            {show && (
                <Flex flexDir={"column"} gap={"3"} w={"full"} >
                    <CashoutBtn currency={currency} amount={amount} />
                    <CustomButton color={"#5465E0"} borderRadius={"8px"} backgroundColor={"white"} border={"1px solid #5D70F980"} onClick={() => setShow(false)} text='Cancel' />
                </Flex>
            )}

        </Flex>
    )
}

export default CashOut
