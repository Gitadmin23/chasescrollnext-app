import CustomButton from '@/components/general/Button'
import { SuccessIcon, ThumbsUpIcon } from '@/components/svg'
import { Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props {
    close?: any,
    update?: boolean
}

function SuccessMessageCreateEvent(props: Props) {
    const {
        // close,
        update
    } = props

    const router = useRouter()

    return (
        <Flex flexDir={"column"} alignItems={"center"} py={"8"} px={"14"} >
            <ThumbsUpIcon />
            <Text fontSize={"22px"} color={"#121212"} lineHeight={"26.4px"} fontWeight={"500"} mt={"4"} >Event {update ? "Updated" : "Created"} Successfully</Text>
            <Text fontSize={"14px"} color={"#626262"} maxW={"258px"} textAlign={"center"} mt={"2"} mb={"6"} lineHeight={"16.8px"} >Your event is now live. You may proceed to My Events to view it.</Text>
            <CustomButton borderWidth={"0px"} onClick={()=> router.push("/dashboard/event/my_event")} color={"white"} text='Proceed to My Event' w={"full"} />
        </Flex>
    )
}

export default SuccessMessageCreateEvent