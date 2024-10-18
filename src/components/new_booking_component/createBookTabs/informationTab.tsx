import { GallaryIcon } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import { Button, Flex, Input, Radio, RadioGroup, Text, Textarea } from '@chakra-ui/react'
import React from 'react' 

export default function InformationTab({setTab}: {setTab: (by: number) => void}) {

    const {
        borderColor,
        mainBackgroundColor,
        primaryColor
    } = useCustomTheme()

    return (
        <Flex w={"full"} h={"full"} >
            <Flex w={"full"} h={"full"} flexDir={"column"} justifyContent={"center"} alignItems={"center"} borderRightWidth={"1.03px"} borderColor={borderColor} >
                <Flex maxW={"402px"} w={"full"} flexDir={"column"} gap={"3"} >
                    <Text fontWeight={"bold"} fontSize={"18px"} >Hello,  <span style={{ color: primaryColor }} >Miracle</span></Text>
                    <Text fontSize={"32px"} lineHeight={"37.58px"} >Welcome to Chasescroll Business</Text>
                    <Text fontSize={"14px"} fontWeight={"500"} >Your gateway to seamless service bookings,</Text>
                </Flex>
            </Flex>
            <Flex w={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} overflowY={"auto"} >
                <Flex maxW={"438px"} w={"full"} height={"auto"} gap={"5"} flexDir={"column"} py={"8"} > 
                    <Flex w={"full"} py={"8"} flexDirection={"column"} mt={"20"} rounded={"16px"} borderStyle={"dotted"} borderWidth={"0.38px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"}  >
                        <GallaryIcon />
                        <Text mt={"4"} fontSize={"14px"} fontWeight={"medium"} >Drag pictures here to upload</Text>
                        <Text fontSize={"8px"} >You need at least 6 pictures</Text>
                        <Text fontSize={"10px"} w={"225px"} textAlign={"center"} >File Format: JPG, JPEG, PNG and picture shouldn’t be more than 10 MB</Text>
                        <Text fontSize={"12px"} textDecoration={"underline"} mt={"2"} >Upload from your device</Text>
                    </Flex>
                    <Flex flexDirection={"column"} w={"full"} gap={"3px"} >
                        <Text>Business Name*</Text>
                        <Input h={"44px"} />
                    </Flex>
                    <Flex flexDirection={"column"} w={"full"} gap={"3px"} >
                        <Text>Add business description</Text>
                        <Text fontSize={"12px"} >Let customers learn more about your business by adding a description to your booking profile</Text>
                        <Textarea />
                    </Flex>

                    <Flex flexDirection={"column"} w={"full"} gap={"3px"} >
                        <Text>Location For your Business/Booking*</Text>
                        <Text fontSize={"12px"} >{`This location will show up on your Chasescroll ‘My Booking’ profile for customers to see when looking for your business`}</Text>
                        <RadioGroup >
                            <Flex direction='row'>
                                <Radio value='1'>Physical Venue</Radio>
                                <Radio value='2'>Online</Radio>
                            </Flex>
                        </RadioGroup>
                    </Flex>
                    <Flex flexDirection={"column"} w={"full"} gap={"3px"} >
                        <Text>Business Name*</Text>
                        <Input h={"44px"} />
                    </Flex>
                    <Button onClick={()=> setTab(1)} w={"full"} bg={primaryColor} color={"white"} rounded={"full"} h={"49px"} _hover={{backgroundColor: primaryColor}} >
                        Next
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
} 
