import useCustomTheme from '@/hooks/useTheme'
import { Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import ModalLayout from '../sharedComponent/modal_layout'
import { truncate } from 'lodash'
import CustomButton from '../general/Button'

export default function EventMesh() {

    const { primaryColor } = useCustomTheme()
    const [ open, setOpen ] = useState(false)

    return (
        <Flex position={"relative"} flexDir={"column"} w={"full"} gap={"3"} >
            <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                <Text fontSize={["14px", "14px", "20px"]} fontWeight={"bold"} >Shop the Summer shoot version 2 store</Text>
                <Text fontSize={"12px"} color={primaryColor} as={"button"} >See all</Text>
            </Flex>
            <Flex w={"full"} height={"180px"} /> 
            <Flex position={"absolute"} top={["9", "9", "12"]} maxW={"full"} overflowX={"auto"} sx={
                {
                    '::-webkit-scrollbar': {
                        display: "none"
                    }
                }
            } >
                <Flex w={"fit-content"} gap={"2"} >
                    <Flex onClick={()=> setOpen(true)} w={["170px", "170px", "230px"]} borderWidth={"1px"} borderColor={"#EBEDF0"} flexDir={"column"} gap={"2"} p={"4"} rounded={"16px"} >
                        <Flex w={"full"} h={["101px", "101px", "176px"]} bgColor={"red"} rounded={"8px"} />
                        <Text fontSize={"14px"} fontWeight={"700"} >₦33,029</Text>
                        <Text fontSize={["12px", "12px", "14px"]} >Hoodie for camp...</Text>
                    </Flex>
                    <Flex onClick={()=> setOpen(true)} w={["170px", "170px", "230px"]} borderWidth={"1px"} borderColor={"#EBEDF0"} flexDir={"column"} gap={"2"} p={"4"} rounded={"16px"} >
                        <Flex w={"full"} h={["101px", "101px", "176px"]} bgColor={"red"} rounded={"8px"} />
                        <Text fontSize={"14px"} fontWeight={"700"} >₦33,029</Text>
                        <Text fontSize={["12px", "12px", "14px"]} >Hoodie for camp...</Text>
                    </Flex>
                    <Flex onClick={()=> setOpen(true)} w={["170px", "170px", "230px"]} borderWidth={"1px"} borderColor={"#EBEDF0"} flexDir={"column"} gap={"2"} p={"4"} rounded={"16px"} >
                        <Flex w={"full"} h={["101px", "101px", "176px"]} bgColor={"red"} rounded={"8px"} />
                        <Text fontSize={"14px"} fontWeight={"700"} >₦33,029</Text>
                        <Text fontSize={["12px", "12px", "14px"]} >Hoodie for camp...</Text>
                    </Flex>
                    <Flex onClick={()=> setOpen(true)} w={["170px", "170px", "230px"]} borderWidth={"1px"} borderColor={"#EBEDF0"} flexDir={"column"} gap={"2"} p={"4"} rounded={"16px"} >
                        <Flex w={"full"} h={["101px", "101px", "176px"]} bgColor={"red"} rounded={"8px"} />
                        <Text fontSize={"14px"} fontWeight={"700"} >₦33,029</Text>
                        <Text fontSize={["12px", "12px", "14px"]} >Hoodie for camp...</Text>
                    </Flex>
                    <Flex onClick={()=> setOpen(true)} w={["170px", "170px", "230px"]} borderWidth={"1px"} borderColor={"#EBEDF0"} flexDir={"column"} gap={"2"} p={"4"} rounded={"16px"} >
                        <Flex w={"full"} h={["101px", "101px", "176px"]} bgColor={"red"} rounded={"8px"} />
                        <Text fontSize={"14px"} fontWeight={"700"} >₦33,029</Text>
                        <Text fontSize={["12px", "12px", "14px"]} >Hoodie for camp...</Text>
                    </Flex>
                </Flex>
            </Flex> 
            <ModalLayout rounded='16px' size={"sm"} open={open} close={setOpen} closeIcon={true} >
                <Flex flexDir={"column"} gap={"2"} p={"4"} >
                    <Text fontWeight={"600"} >Product Details </Text>
                    <Flex w={"full"} h={"193px"} rounded={"8px"} bgColor={"red"} />
                    <Text fontSize={"24px"} fontWeight={"600"} >Hoodie for camp x 201</Text>
                    <Text fontSize={"14px"} fontWeight={"700"} >₦33,029</Text>
                    <Text fontSize={"14px"} fontWeight={"700"} >About this Product</Text> 
                    <Text fontSize={"12px"} >Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputatelibero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosquad litora </Text>
                    <Flex w={"full"} mt={"2"} >
                        <CustomButton text={"Order Now"} />
                    </Flex>
                </Flex>
            </ModalLayout>
        </Flex>
    )
}
