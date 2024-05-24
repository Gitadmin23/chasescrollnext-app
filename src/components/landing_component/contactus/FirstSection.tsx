"use client"
import { Flex, Text } from "@chakra-ui/react";
import MobileAppLink from "../mobileapplink";
import { Icon } from "@iconify/react/dist/iconify.js";
import SocialMedia from "../socialMedia";


function FirstSetion() {
    return (
        <Flex w={"full"} h={"547px"} bgColor={"red"} color={"white"} flexDir={"column"} justifyContent={"center"} alignItems={"center"} >
            <Flex alignItems={"center"} flexDir={"column"} >
                <Text fontSize={"60px"} lineHeight={"84px"} fontWeight={"700"} textAlign={"center"} >We'd love to hear from you</Text>
                <Text maxW={"700px"} fontStyle={"lg"} mb={"10"} textAlign={"center"} lineHeight={"21.78px"} fontWeight={"500"} >Email, call, or complete the form to learn how  can solve your event  management.</Text>
                {/* <MobileAppLink /> */}
                <Flex w={"300px"} py={"4"} flexDir={"column"} gap={"1"} rounded={"64px"} bgColor={"white"} alignItems={"center"}  >
                    <Text fontSize={"14px"} color={"#2B2D31"} lineHeight={"31px"} >Connect with us via our socials</Text>
                    <SocialMedia top="0px" color="#5465E0" />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default FirstSetion