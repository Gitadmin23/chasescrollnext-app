"use client"
import Businesses from "@/Views/dashboard/booking/Businesses";
import { Flex } from "@chakra-ui/react";

export default function ExternalService () {
    return(
        <Flex w={"full"} justifyContent={"start"} alignItems={"start"} p={"6"} > 
            <Businesses />
        </Flex>
    )
}