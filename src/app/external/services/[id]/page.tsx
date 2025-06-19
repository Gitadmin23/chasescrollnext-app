"use client"
import Businesses from "@/Views/dashboard/booking/Businesses";
import MyBusiness from "@/Views/dashboard/booking/MyBusiness";
import { Flex } from "@chakra-ui/react";

export default function ExternalService () {
    return(
        <Flex w={"full"} flexDir={"column"} justifyContent={"start"} alignItems={"start"} p={"6"} > 
            <MyBusiness />
        </Flex>
    )
}