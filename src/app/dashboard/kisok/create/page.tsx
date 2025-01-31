"use client"
import CustomButton from '@/components/general/Button'
import { GallaryIcon, PhotoIcon } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Input, Switch, Text } from '@chakra-ui/react'
import { useSearchParams, useRouter } from 'next/navigation'
import React from 'react'

export default function KisokCreate() {

    const { primaryColor, borderColor } = useCustomTheme()
    const { push } = useRouter()
    const query = useSearchParams();
    const type = query?.get('type');

    return (
        <Flex w={"full"} px={"6"} pos={"relative"} pb={"12"} alignItems={"center"} flexDir={"column"} overflowY={"auto"} >
            <Flex w={"full"} h={"6px"} pos={"absolute"} top={"0px"} zIndex={"10"} insetX={"0px"} rounded={"6px"} bgColor={"#F6F6F6"} >
                <Flex w={"50%"} bgColor={primaryColor} rounded={"6px"} />
            </Flex>
            <Flex maxW={"550px"} pt={["6", "6", "6", "6"]} w={"full"} gap={"4"} alignItems={"center"} display={type ? "none" : "flex"} flexDir={"column"}  >
                <Text fontSize={"24px"} fontWeight={"600"} >Give your product a name</Text>
                <Input h={"60px"} />
                <Text fontSize={"24px"} fontWeight={"500"} >Describe your place to make it stand out</Text>
                <Input h={"60px"} />
                <Text fontSize={"24px"} fontWeight={"500"} >Set your pricing </Text>
                <Flex w={"full"} p={"4"} flexDirection={"column"} rounded={"16px"} borderWidth={"1px"} gap={"2"} borderColor={"#EAEBEDCC"} >
                    <Flex w={"full"} justifyContent={"space-between"} pb={"2"} borderBottomWidth={"1px"} gap={"2"} alignItems={"center"} >
                        <Flex flexDir={"column"} >
                            <Text fontWeight={"500"} >Free</Text>
                            <Text fontWeight={"500"} fontSize={"12px"} >Make your product a souvenir for your event </Text>
                        </Flex>
                        <Switch />
                    </Flex>
                    <Flex w={"full"} justifyContent={"space-between"} pb={"2"} gap={"2"} alignItems={"center"} >
                        <Flex flexDir={"column"} >
                            <Text fontWeight={"500"} >Paid</Text>
                            <Text fontWeight={"500"} fontSize={"12px"} >Set a single rate or multiple rates.</Text>
                        </Flex>
                        <Switch />
                    </Flex>
                </Flex>
                <Flex gap={"2"} w={"full"} flexDir={"column"} >
                    <Text fontWeight={"500"} >Quantity</Text>
                    <Input h={"60px"} />
                </Flex>
                <Flex gap={"2"} w={"full"} flexDir={"column"} >
                    <Text fontWeight={"500"} >Location</Text>
                    <Input h={"60px"} />
                </Flex>
                <Flex gap={"2"} w={"full"} flexDir={"column"} >
                    <Text fontWeight={"500"} >Price per unit</Text>
                    <Input h={"60px"} />
                </Flex>
                <Text color={primaryColor} ml={"auto"} >Add More Product</Text>
                <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                    <Text fontWeight={"500"} >Allowed Customers Review</Text>
                    <Switch />
                </Flex>
                <CustomButton onClick={() => push("/dashboard/kisok/create?type=true")} height={"60px"} borderRadius={"999px"} mt={"4"} text={"Continue"} />
            </Flex> 

            <Flex maxW={"550px"} pt={["6", "6", "6", "6"]} w={"full"} gap={"4"} alignItems={"center"} display={!type ? "none" : "flex"} flexDir={"column"}  >
                <Text fontSize={"24px"} fontWeight={"600"} >Share pictures of your place</Text>
                <Flex w={"full"} h={"340px"} borderColor={"#D9D9D9"} justifyContent={"center"} alignItems={"center"} flexDir={"column"} rounded={"16px"} borderWidth={"1px"} border={"dashed"} >
                    <GallaryIcon />
                    <Text fontWeight={"500"} mt={"3"} >Drag pictures here to upload</Text>
                    <Text fontSize={"14px"} color={"#ACACB0"} >You need at least 5 pictures</Text>
                </Flex>
                <Text fontSize={"24px"} fontWeight={"600"} >Delivery Plans</Text>
                <Flex w={"full"} flexDir={"column"} gap={"3"} >
                    <Flex p={"6"} w={"full"} rounded={"16px"} justifyContent={"space-between"} bgColor={"#FCFCFC"} borderWidth={"1px"} borderColor={"#EAEBEDCC"} >
                        <Flex flexDir={"column"} gap={"2"} >
                            <Text  fontWeight={"500"} >Short-term</Text>
                            <Text fontSize={"14px"} >Within 3-5 Days outside lagos</Text>
                        </Flex>
                        <Flex w={"10"} h={"10"} bgColor={"red"} />
                    </Flex> 
                    <Flex p={"6"} w={"full"} rounded={"16px"} justifyContent={"space-between"} bgColor={"#FCFCFC"} borderWidth={"1px"} borderColor={"#EAEBEDCC"} >
                        <Flex flexDir={"column"} gap={"2"} >
                            <Text  fontWeight={"500"} >Long-term</Text>
                            <Text fontSize={"14px"} >Within 3-7 Days outside Lagos</Text>
                        </Flex>
                        <Flex w={"10"} h={"10"} bgColor={"red"} />
                    </Flex> 
                </Flex>
                <CustomButton onClick={() => push("/dashboard/kisok/create?type=true")} height={"60px"} borderRadius={"999px"} mt={"4"} text={"Submit"} />
            </Flex>
        </Flex>
    )
}
