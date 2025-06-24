"use client"
import GetRental from "@/components/kisok/getRental";
import { Flex, Text } from "@chakra-ui/react";

export default function ExternalRental() {
    return(
        <Flex w={"full"} justifyContent={"start"} flexDir={"column"} gap={"6"} alignItems={"center"} p={"6"} >
            <Text fontSize={["20px", "20px", "56px"]} textAlign={"center"} fontWeight={"600"} >Rentals</Text>
            <GetRental myrental={true} />
        </Flex>
    )
}