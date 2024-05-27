"use client"
import { Box, Flex, Image, Text } from "@chakra-ui/react"; 
import SocialMedia from "../socialMedia";


function FirstSetion() {
    return (
        <Flex w={"full"} pos={"relative"} h={"547px"} bgColor={"red"} color={"white"} flexDir={"column"} justifyContent={"center"} alignItems={"center"} >
            <Flex zIndex={"30"} alignItems={"center"} flexDir={"column"} >
                <Text fontSize={"60px"} lineHeight={"84px"} fontWeight={"700"} textAlign={"center"} >{`We'd love to hear from you`}</Text>
                <Text maxW={"700px"} fontStyle={"lg"} mb={"10"} textAlign={"center"} lineHeight={"21.78px"} fontWeight={"500"} >Email, call, or complete the form to learn how  can solve your event  management.</Text> 
                <Flex w={"300px"} py={"4"} flexDir={"column"} gap={"1"} rounded={"64px"} bgColor={"white"} alignItems={"center"}  >
                    <Text fontSize={"14px"} color={"#2B2D31"} lineHeight={"31px"} >Connect with us via our socials</Text>
                    <SocialMedia top="0px" color="#5465E0" />
                </Flex>
            </Flex>
            <Box pos={"absolute"} inset={"0px"} zIndex={"10"} bgColor={"black"} opacity={"50%"} />
            <Box pos={"absolute"} inset={"0px"}  >
                <Image w={"full"} h={"full"} objectFit={"cover"} objectPosition={"top"} alt="heroo" src="/images/contactlanding.png" />
            </Box>
        </Flex>
    )
}

export default FirstSetion