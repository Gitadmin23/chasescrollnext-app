"use client"
import Businesses from "@/Views/dashboard/booking/Businesses";
import MyBusiness from "@/Views/dashboard/booking/MyBusiness";
import { Flex, Text } from "@chakra-ui/react";

export default function ExternalService () {
    return(
        <Flex w={"full"} justifyContent={"start"} flexDir={"column"} gap={"6"} alignItems={"start"} p={"6"} >
            <Text fontSize={["20px", "20px", "56px"]} textAlign={"center"} fontWeight={"600"} >Services</Text>
            <MyBusiness />
        </Flex>
    )
}