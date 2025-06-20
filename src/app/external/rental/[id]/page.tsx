"use client"
import GetRental from "@/components/kisok/getRental";
import { Flex } from "@chakra-ui/react";

export default function ExternalRental() {
    return(
        <Flex w={"full"} flexDirection={"column"} justifyContent={"start"} alignItems={"start"} p={"6"} > 
            <GetRental myrental={true} />
        </Flex>
    )
}