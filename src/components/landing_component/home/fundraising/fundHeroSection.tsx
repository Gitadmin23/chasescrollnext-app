"use client"
import CustomButton from '@/components/general/Button'
import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

export default function FundHeroSection() {
    return (
        <Flex w={"full"} h={"100vh"} color={"white"} pos={"relative"} >
            <Flex pos={"absolute"} inset={"0px"} zIndex={"10"} style={{background: "#00000033"}} />
            <Image src='/images/hero/fundraising.jpg' alt='fundraising' w={"full"} objectFit={"cover"} />
            <Flex pos={"absolute"} insetX={"0px"} bottom={"0px"} top={["64px", "64px", "101.03px"]} gap={"8"} px={["6", "6", "16"]} flexDirection={["column", "column", "row"]} justifyContent={["center", "center", "start"]} zIndex={"20"} >
                <Flex w={"fit-content"} h={["fit-content", "fit-content", "80%"]} justifyContent={"center"} flexDir={"column"} gap={"4"} > 
                    <Text maxW={"481px"} fontSize={["42px", "42px", "60px"]} lineHeight={["120%", "120%", "75px"]} fontWeight={"700"} >Make your event dream a reality.</Text>
                    <Text maxW={"481px"} fontWeight={"500"} >Plan your dream event, bridge financial gaps, and scale effortlessly with our intuitive fundraising platform.</Text>
                    <CustomButton text={"Sign Up now for free"} px={"5"} width={"fit-content"} fontSize={"14px"} mt={"3"} borderRadius={"999px"} />
                </Flex>
                <Flex maxW={"751px"} >
                    <Image src='/images/hero/fundtwo.png' alt='hero2' objectFit={"contain"} w={"full"} />
                </Flex>
            </Flex>
        </Flex>
    )
}
