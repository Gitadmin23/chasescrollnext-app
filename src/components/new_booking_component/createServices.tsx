"use client"
import useCustomTheme from '@/hooks/useTheme'
import { Button, Checkbox, Flex, Input, Select, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { GallaryIcon } from '../svg'
import { MdEdit } from 'react-icons/md'
import ModalLayout from '../sharedComponent/modal_layout'
import { IoIosCheckmarkCircle } from 'react-icons/io'

export default function CreateServices() {

    const {
        primaryColor,
        borderColor
    } = useCustomTheme()

    const [open, setOpen] = useState(false)

    return (
        <Flex w={"full"} h={"full"} >
            <Flex w={"full"} h={"full"} flexDir={"column"} alignItems={"center"} py={"8"} borderRightWidth={"1.03px"} borderColor={borderColor} overflowY={"auto"} >
                <Flex px={"14"} w={"full"} flexDir={"column"} gap={"3"} >
                    <Flex alignItems={"center"} gap={"3"} >
                        <IoArrowBack size={"30px"} />
                        <Text fontSize={"20px"} fontWeight={"500"} >Back</Text>
                    </Flex>
                    <Text fontSize={"24px"} fontWeight={"600"} >Upload clear photos of your Services </Text>
                    <Text fontWeight={"500"} >please upload clear images that describe your service</Text>
                    <Flex mt={"8"} gap={"4"} w={"full"} flexDirection={"column"} p={"8"} borderWidth={"1.03px"} borderColor={borderColor} rounded={"16px"} >
                        <Flex w={"full"} py={"8"} flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"}  >
                            <GallaryIcon />
                            <Text mt={"4"} fontSize={"14px"} fontWeight={"medium"} >Drag pictures here to upload</Text>
                            <Text fontSize={"8px"} >You need at least 6 pictures</Text>
                            <Text fontSize={"10px"} w={"225px"} textAlign={"center"} >File Format: JPG, JPEG, PNG and picture shouldn’t be more than 10 MB</Text>
                            <Text fontSize={"12px"} textDecoration={"underline"} mt={"2"} >Upload from your device</Text>
                        </Flex>
                        <Flex w={"full"} gap={"4"} >
                            <Flex w={"full"} py={"8"} px={"2"} flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"}  >
                                <GallaryIcon />
                                <Text mt={"4"} fontSize={"14px"} fontWeight={"medium"} >Drag pictures here to upload</Text>
                                <Text fontSize={"8px"} >You need at least 6 pictures</Text>
                                <Text fontSize={"10px"} textAlign={"center"} >File Format: JPG, JPEG, PNG and picture shouldn’t be more than 10 MB</Text>
                                <Text fontSize={"12px"} textDecoration={"underline"} mt={"2"} >Upload from your device</Text>
                            </Flex>
                            <Flex w={"full"} py={"8"} px={"2"} flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"}  >
                                <GallaryIcon />
                                <Text mt={"4"} fontSize={"14px"} fontWeight={"medium"} >Drag pictures here to upload</Text>
                                <Text fontSize={"8px"} >You need at least 6 pictures</Text>
                                <Text fontSize={"10px"} textAlign={"center"} >File Format: JPG, JPEG, PNG and picture shouldn’t be more than 10 MB</Text>
                                <Text fontSize={"12px"} textDecoration={"underline"} mt={"2"} >Upload from your device</Text>
                            </Flex>
                        </Flex>
                        <Flex w={"full"} gap={"4"} >
                            <Flex w={"full"} py={"8"} px={"2"} flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"}  >
                                <GallaryIcon />
                                <Text mt={"4"} fontSize={"14px"} fontWeight={"medium"} >Drag pictures here to upload</Text>
                                <Text fontSize={"8px"} >You need at least 6 pictures</Text>
                                <Text fontSize={"10px"} textAlign={"center"} >File Format: JPG, JPEG, PNG and picture shouldn’t be more than 10 MB</Text>
                                <Text fontSize={"12px"} textDecoration={"underline"} mt={"2"} >Upload from your device</Text>
                            </Flex>
                            <Flex w={"full"} py={"8"} px={"2"} flexDirection={"column"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"}  >
                                <GallaryIcon />
                                <Text mt={"4"} fontSize={"14px"} fontWeight={"medium"} >Drag pictures here to upload</Text>
                                <Text fontSize={"8px"} >You need at least 6 pictures</Text>
                                <Text fontSize={"10px"} textAlign={"center"} >File Format: JPG, JPEG, PNG and picture shouldn’t be more than 10 MB</Text>
                                <Text fontSize={"12px"} textDecoration={"underline"} mt={"2"} >Upload from your device</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex w={"full"} h={"full"} justifyContent={"center"} py={"8"} overflowY={"auto"} >
                <Flex px={"14"} w={"full"} flexDir={"column"} gap={"5"} >
                    <Flex flexDir={"column"} w={"full"} gap={"2"} >
                        <Text fontWeight={"600"} >Select from the list of services</Text>
                        <Text fontWeight={"400"} fontSize={"14px"} >You are free to make adjustment anytime</Text>
                        <Select h={"44px"} borderWidth={"1px"} borderColor={primaryColor} rounded={"16px"} placeholder='Event Planner' color={primaryColor} >

                        </Select>
                    </Flex>
                    <Flex flexDir={"column"} w={"full"} gap={"2"} >
                        <Text fontWeight={"600"} >{`Let’s set your Price`}</Text>
                        <Text fontWeight={"400"} fontSize={"14px"} >You are free to make adjustment anytime</Text>
                        <Input h={"44px"} borderWidth={"1px"} borderColor={borderColor} rounded={"16px"} placeholder='₦ 232,435' />
                    </Flex>
                    <Flex gap={"2"} alignItems={"center"} >
                        <MdEdit size={"25px"} color={primaryColor} />
                        <Text textDecoration={"underline"} color={primaryColor} >Edit</Text>
                    </Flex>
                    <Flex flexDirection={"column"} gap={"2"} >
                        <Text fontWeight={"600"} >Offer a discount</Text>
                        <Text fontWeight={"400"} fontSize={"14px"} >This will make your place to stand out and get booked faster</Text>
                        <Flex gap={"3"} mt={"3"} alignItems={"center"} >
                            <Checkbox />
                            <Text >25%  I  For frequent customers</Text>
                        </Flex>
                        <Flex gap={"3"} mt={"3"} alignItems={"center"} >
                            <Checkbox />
                            <Text >10%  I  Weekly discount</Text>
                        </Flex>
                        <Flex gap={"3"} mt={"3"} alignItems={"center"} >
                            <Checkbox />
                            <Text >15%  I  Monthly discount</Text>
                        </Flex>
                        <Flex gap={"3"} mt={"3"} alignItems={"center"} >
                            <Checkbox />
                            <Text color={primaryColor} >{`I don’t have fix price let client contact me`}</Text>
                        </Flex>
                    </Flex>
                    <Button onClick={() => setOpen(true)} w={"full"} bg={primaryColor} color={"white"} rounded={"full"} h={"49px"} mt={"6"} _hover={{ backgroundColor: primaryColor }} >
                        Submit
                    </Button>
                </Flex>
            </Flex> 

            <ModalLayout open={open} close={setOpen} closeIcon={true}>
                <Flex w={"full"} flexDir={"column"} alignItems={"center"} pb={"14"} py={"5"} >
                    <IoIosCheckmarkCircle size={"100px"} color={"#46CC6B"} />
                    <Text fontWeight={"600"} fontSize={"24px"} >Congratulations Miracle!</Text>
                    <Text textAlign={"center"} maxW={"350px"} fontWeight={"400"} >{`Services created Successfully`}</Text>
                    <Button height={"50px"} mt={"4"} borderWidth={"1px"} w={"200px"} rounded={"full"} borderColor={primaryColor} bgColor={primaryColor} color={"white"} _hover={{ backgroundColor: primaryColor }} >View Services</Button>
                </Flex>
            </ModalLayout>
        </Flex>
    )
}
