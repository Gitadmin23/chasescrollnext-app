"use client"
import GetProduct from "@/components/kisok/getProduce";
import { Flex } from "@chakra-ui/react";

export default function ExternalProduct () {
    return(
        <Flex w={"full"} justifyContent={"start"} alignItems={"start"} p={"6"} > 
            <GetProduct />
        </Flex>
    )
}