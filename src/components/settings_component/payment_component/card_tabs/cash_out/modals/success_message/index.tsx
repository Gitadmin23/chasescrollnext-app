import CustomButton from '@/components/general/Button'
import { SuccessIcon } from '@/components/svg'
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
    close?: any
}

function SuccessMessage(props: Props) {
    const {
        close
    } = props

    return (
        <Flex flexDir={"column"} alignItems={"center"} py={"8"} px={"14"} >
            <SuccessIcon />
            <Text fontSize={"24px"} color={"#151515"} lineHeight={"44.8px"} fontWeight={"500"} mt={"4"} >Transaction Successful</Text>
            <Text fontSize={"12px"} color={"#626262"} maxW={"351px"} textAlign={"center"} mb={"4"} >Congratulation the money has been transfer into your account.</Text>
            <CustomButton onClick={close} color={"#12299C"} text='Close' w={"full"} backgroundColor={"white"} border={"1px solid #12299C75"} />
        </Flex>
    )
}

export default SuccessMessage
