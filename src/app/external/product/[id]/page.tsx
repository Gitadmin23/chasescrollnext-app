"use client"
import GetProduct from "@/components/kisok/getProduce";
import { Flex, Text } from "@chakra-ui/react";

export default function ExternalProduct () {
    return(
        <Flex w={"full"} justifyContent={"start"} flexDir={"column"} gap={"6"} alignItems={"start"} p={"6"} >
            <Text fontSize={"20px"} fontWeight={"600"} >Product</Text>
            <GetProduct myproduct={true} />
        </Flex>
    )
}