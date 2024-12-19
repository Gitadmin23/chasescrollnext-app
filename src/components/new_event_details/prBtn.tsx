import useCustomTheme from '@/hooks/useTheme'
import { IEventType } from '@/models/Event'
import { Flex, Text } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import CustomButton from '../general/Button'
import ModalLayout from '../sharedComponent/modal_layout'

export default function PrBtn({ data }: { data: IEventType }) {

    const {
        mainBackgroundColor,
        primaryColor,
        borderColor, 
        bodyTextColor
    } = useCustomTheme()

    const pathname = usePathname()

    const [ open, setOpen ] = useState(false)

    return (
        <>
            <Flex display={["none", "none", "none", "flex", "flex"]} bg={mainBackgroundColor} zIndex={"50"} pos={["relative"]} bottom={"0px"} w={"full"} flexDir={"column"} rounded={"16px"} gap={"3"} p={"3"} borderWidth={"1px"} borderColor={"#DEDEDE"} style={{ boxShadow: "0px 20px 70px 0px #C2C2C21A" }} >
                <Text fontWeight={"500"} >Apply to provide a service or become a PR to this  event</Text>
                <CustomButton onClick={()=> setOpen(true)} text={"Apply Now"} borderRadius={"999px"} fontSize={"sm"} backgroundColor={mainBackgroundColor} borderWidth={"1px"} borderColor={primaryColor} color={primaryColor} />
                <ModalLayout open={open} size={"xs"} close={setOpen} closeIcon={true} >
                    <Flex flexDirection={"column"} gap={"4"} p={"4"} >
                        <Flex as={"button"} justifyContent={"center"} alignItems={"center"} pb={"4"} borderBottomWidth={"1px"} borderColor={borderColor} >
                            <Text color={bodyTextColor} fontSize={"sm"} >Apply as a  PR Manager</Text>
                        </Flex>
                        <Flex as={"button"} justifyContent={"center"} alignItems={"center"} pb={"4"} >
                            <Text color={bodyTextColor} fontSize={"sm"} >Apply as a Business</Text>
                        </Flex>
                    </Flex>
                </ModalLayout>
            </Flex>
        </>
    )
}
