"use client"
import GetProduct from "@/components/kisok/getProduce";
import { Flex, Text } from "@chakra-ui/react";

export default function ExternalProduct () {
    return(
        <Flex w={"full"} justifyContent={"start"} flexDir={"column"} gap={"6"} alignItems={"center"} p={"6"} >
            <Text fontSize={["20px", "20px", "56px"]} textAlign={"center"} fontWeight={"600"} >Products</Text>
            <GetProduct myproduct={true} />
        </Flex>
    )
}