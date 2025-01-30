"use client"
import CustomButton from '@/components/general/Button'
import { GallaryIcon, PhotoIcon } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Input, Select, Switch, Text, Textarea } from '@chakra-ui/react'
import { useSearchParams, useRouter } from 'next/navigation'
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { IoArrowBack } from 'react-icons/io5'

export default function RentalCreate() {

    const { primaryColor, borderColor } = useCustomTheme()
    const { push, back } = useRouter()
    const query = useSearchParams();
    const type = query?.get('type');

    return (
        <Flex w={"full"} px={"6"} pos={"relative"} pb={"12"} alignItems={"center"} flexDir={"column"} overflowY={"auto"} >
            <Flex w={"full"} h={"6px"} pos={"absolute"} top={"0px"} zIndex={"10"} insetX={"0px"} rounded={"6px"} bgColor={"#F6F6F6"} >
                <Flex w={"50%"} bgColor={primaryColor} rounded={"6px"} />
            </Flex>
            <Flex onClick={()=> back()} bgColor={"#FAFAFA"} w={"44px"} h={"44px"} justifyContent={"center"} alignItems={"center"} rounded={"full"} borderWidth={"1px"} borderColor={"#E7E7E7"} position={"absolute"} top={"4"} zIndex={"30"} left={"4"}  >
                <IoArrowBack size={"20px"} />
            </Flex>
            <Flex maxW={"550px"} pt={["6", "6", "6", "6"]} w={"full"} gap={"4"} alignItems={"center"} display={type ? "none" : "flex"} flexDir={"column"}  >
                <Text fontSize={"24px"} fontWeight={"600"} >List your Property</Text>
                <Flex w={"full"} h={"340px"} borderColor={"#D9D9D9"} justifyContent={"center"} alignItems={"center"} flexDir={"column"} rounded={"16px"} borderWidth={"1px"} border={"dashed"} >
                    <GallaryIcon />
                    <Text fontWeight={"500"} mt={"3"} >Drag pictures here to upload</Text>
                    <Text fontSize={"14px"} color={"#ACACB0"} >You need at least 5 pictures</Text>
                </Flex>
                <Text fontSize={"24px"} fontWeight={"600"} >Delivery Plans</Text>
                <Flex w={"full"} flexDir={"column"} gap={"3"} >
                    <Flex gap={"2"} w={"full"} flexDir={"column"} >
                        <Text fontWeight={"500"} >Name of the item</Text>
                        <Input h={"60px"} />
                    </Flex>
                    <Flex gap={"2"} w={"full"} flexDir={"column"} >
                        <Text fontWeight={"500"} >Description (optional)</Text>
                        <Textarea />
                    </Flex>
                    <Flex gap={"2"} w={"full"} flexDir={"column"} >
                        <Text fontWeight={"500"} >Category (optional)</Text>
                        <Select h={"60px"} placeholder='Building | Accommodation' >
                            <option>test</option>
                        </Select>
                    </Flex>
                </Flex>
                <CustomButton onClick={() => push("/dashboard/kisok/create-rental?type=true")} height={"60px"} borderRadius={"999px"} mt={"4"} text={"Next"} />
            </Flex>

            <Flex maxW={"550px"} pt={["6", "6", "6", "6"]} w={"full"} gap={"4"} alignItems={"center"} display={!type ? "none" : "flex"} flexDir={"column"}  >
                <Text fontSize={"24px"} fontWeight={"600"} >List your Property</Text>
                <Flex w={"full"} flexDir={"column"} gap={"3"} >
                    <Flex gap={"2"} w={"full"} flexDir={"column"} >
                        <Text fontWeight={"500"} >Item Type</Text>
                        <Textarea />
                    </Flex>
                    <Flex gap={"2"} w={"full"} flexDir={"column"} >
                        <Text fontWeight={"500"} >Location</Text>
                        <Select h={"60px"} placeholder='Building | Accommodation' >
                            <option>test</option>
                        </Select>
                    </Flex>
                    <Flex gap={"2"} w={"full"} flexDir={"column"} >
                        <Text fontWeight={"500"} >Number of Days available for Rent</Text>
                        <Select h={"60px"} placeholder='Building | Accommodation' >
                            <option>test</option>
                        </Select>
                    </Flex>
                    <Flex gap={"2"} w={"full"} flexDir={"column"} >
                        <Text fontWeight={"500"} >Price</Text>
                        <Input h={"60px"} />
                    </Flex>
                </Flex>
                <CustomButton onClick={() => push("/dashboard/kisok/create?type=true")} height={"60px"} borderRadius={"999px"} mt={"4"} text={"Submit"} />
            </Flex>
        </Flex>
    )
}
